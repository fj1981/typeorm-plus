import "reflect-metadata";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../../utils/test-utils";
import {Connection} from "../../../../src/connection/Connection";
import {Post} from "./entity/Post";

describe("query-builder > pagination", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("pagination should work perfectly", () => Promise.all(connections.map(async connection => {
        let i = 1;
        const totalNum = 30;
        const posts: Post[] = [];
        while ( i < totalNum + 1 ) {
            const post = new Post();
            post.title = `title#${i}`;
            posts.push(post);
            i++;
        }
        await connection.manager.save(posts);

        const current = 2;
        const size = 10;
        const loadedPosts = await connection
            .getRepository(Post)
            .createQueryBuilder()
            .paginate(current, size)
            .getMany();
        loadedPosts!.length.should.be.equal(size);
        loadedPosts![0].title.should.be.equals(`title#${size * (current - 1) + 1}`);

    })));

    it("pagination should support raw mode:", () => Promise.all(connections.map(async connection => {
        let i = 1;
        const totalNum = 30;
        const posts: Post[] = [];
        while ( i < totalNum + 1 ) {
            const post = new Post();
            post.title = `title#${i}`;
            posts.push(post);
            i++;
        }
        await connection.manager.save(posts);

        const current = 2;
        const size = 10;
        const loadedPosts = await connection
            .getRepository(Post)
            .createQueryBuilder()
            .paginateRaw(current, size)
            .getRawMany();
        loadedPosts!.length.should.be.equal(size);
        loadedPosts![0].Post_title.should.be.equals(`title#${size * (current - 1) + 1}`);

    })));

});