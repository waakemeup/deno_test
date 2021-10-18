import { Application,Router,RouterContext } from "https://deno.land/x/oak/mod.ts";
import postsRouter from './routes/posts.ts'


import { DataTypes, Database, Model, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';

const connection = new PostgresConnector({
  host: 'localhost',
  username: 'Ruby',
  password: 'lhc415322',
  database: 'deno_api',
});

const db = new Database(connection);

class Post extends Model {
  static table = 'posts';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    body: DataTypes.STRING,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}

db.link([Post]);

await db.sync({ drop: true });

const app = new Application();

const router = new Router()

const port = 5000

router.get('/api',(context:RouterContext)=>{
  context.response.body = {
    msg:"hello world"
  }
})

// app.use('/',posts)

app.use(router.routes())
app.use(postsRouter.prefix('/api/posts').routes())
app.use(router.allowedMethods())

console.log(`SERVER RUNNING AT http://localhost:${port}`);

await app.listen({ port });