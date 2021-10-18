import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';
import Post from "./model/Post.ts";

const connection = new PostgresConnector({
  host: 'localhost',
  username: 'Ruby',
  password: 'lhc415322',
  database: 'deno_api',
});

const db = new Database(connection);

db.link([Post]);

export default db