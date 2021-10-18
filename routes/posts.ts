import { Router,RouterContext } from "https://deno.land/x/oak/mod.ts";
import { v4 as uuid } from "https://deno.land/std@0.111.0/uuid/mod.ts";

import Post from '../model/Post.ts'

const router = new Router()

router.get('/',async({response}:RouterContext)=>{
  try {
    const posts = await Post.all() 
    response.body=posts
  } catch (err) {
    console.log(err)
    response.body={error:'Something went wrong'}
    response.status=500
  }

})

router.post('/',async({request,response}:RouterContext)=>{
  try {
    // const posts = await Post.all()
    const {username,body} = await request.body().value
    const post = await Post.create({username,body,uuid:uuid.generate()})
    // posts.push(post)
    response.body = post
  } catch (err) {
    console.log(err)
    response.body={error:'Something went wrong'}
    response.status=500
  }
})

export default router