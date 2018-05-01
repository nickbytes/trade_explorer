# trade_explorer

An app for viewing your crypto currency trades.

## Server

The trade_explorer server is an express app. It uses tools like Objection and Knex.

The server assumes that you have a local development postgres database, called `trade_explorer`.

To run the server:

```
cd server
yarn
yarn start
```

Starting the server will run all appropriate migrations. The server is running through port 6666. Plz start the server before starting the client, there is a proxy in place.

### Migrations

To create a new migration, run `yarn migration ${name-of-migration}`. This will generate a timestamped migration file in the `migrations` folder. You can see an example there now.

## Client

The trade_explorer client is built using create-react-app. It uses styled-components for (basic) styling.

To view the client:

```
cd client
yarn
yarn start
```
