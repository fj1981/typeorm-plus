import {createMysqlConnection} from "../../src/typeorm";
import {Post} from "./entity/Post";
import {ConnectionOptions} from "../../src/connection/ConnectionOptions";

// first create a connection
let options: ConnectionOptions = {
    host: "192.168.99.100",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    autoSchemaCreate: true
};

createMysqlConnection(options, [Post]).then(connection => {

    let post = new Post();
    post.text = "Hello how are you?";
    post.title = "hello";

    let postRepository = connection.getRepository<Post>(Post);

    postRepository
        .persist(post)
        .then(post => console.log("Post has been saved"))
        .catch(error => console.log("Cannot save. Error: ", error));

}, error => console.log("Cannot connect: ", error));