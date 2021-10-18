import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts';
// import { v4 } from "https://deno.land/std@0.111.0/uuid/mod.ts";

// Generate a v4 UUID. For this we use the browser standard `crypto.randomUUID`
// function.
// const myUUID = crypto.randomUUID();



class Post extends Model {
  static table = 'posts';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    uuid:{type:DataTypes.UUID},
    username:{type:DataTypes.STRING},
    body:{type: DataTypes.STRING},
  };

  // static defaults = {
    // uuid:crypto.randomUUID()
    // uuid:v4.generate()
  // };
}

export default Post