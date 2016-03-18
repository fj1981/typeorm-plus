# TypeORM

ORM that works in Typescript.

## Usage

ORM development is in progress. Readme and documentations expected to be soon.

## Samples

Take a look on samples in [./sample](https://github.com/pleerock/typeorm/tree/master/sample) for more examples of
usages.

## Todos

* add partial selection support
* in query builder should we use property names or table names? (right now its mixed)
* should all entities have a primary column?
* check if inheritance and abstract table works fine
* think about indices
* make subscribers and listeners to work correctly
* think more about cascades
* add cascadePersist to cascades?
* naming strategy need to be done correctly
* fix all propertyName/tableName problems and make sure everything work correctly
* check column types, make validation there
* foreign keys for relations
* what happens if owner one-to-one on both sides
* check self referencing
* class lifecycle callbacks?
* query builder limit offset
* query with count? (Paginator)
* wrap persistment in transaction
* array / json / date column types
* exceptions everywhere!