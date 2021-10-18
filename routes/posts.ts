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
// Update
router.put('/:uuid',async({params,request,response}:RouterContext)=>{
  const {username,body} = await request.body().value
  try {
    const post = await Post.where('uuid',<string>params.uuid).first()
    if(!post){
      response.body = {post:'post not found'}
      response.status = 400
      return
    }
    post.username = username
    post.body = body

    await post.update()

    response.body = post
  } catch (err) {
    console.log(err)
    response.body={error:'Something went wrong'}
    response.status=500
  }
})
// delete
router.delete('/:uuid',async({params,response}:RouterContext)=>{
  try {
    const post = await Post.where('uuid',<string>params.uuid).first()
    if(!post){
      response.body = {post:'post not found'}
      response.status = 400
      return
    }

    await post.delete()

    response.body = {message:'Post deleted successfully'}
  } catch (err) {
    console.log(err)
    response.body={error:'Something went wrong'}
    response.status=500
  }
})

// Find
router.get('/:uuid',async({params,response}:RouterContext)=>{
  try {
    const post = await Post.where('uuid',<string>params.uuid).first()
    if(!post){
      response.body = {post:'post not found'}
      response.status = 400
      return
    }
    response.body = post
  } catch (err) {
    console.log(err)
    response.body={error:'Something went wrong'}
    response.status=500
  }
})

export default router