import { useState, useEffect } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async (blog) => {
    const likedBlog = {
      ...blog,
      likes: likes + 1,
    }
    
    setLikes(likes + 1)

    await blogService.like(likedBlog)
  }

  const handleDelete = async (blog) => {
    const confimation = window.confirm(`Remove blog: '${blog.title}' by ${blog.author}?`)
    if(confimation){
      try{
        await blogService.deleteBlog(blog)
        location.reload()
      } catch (exception) {
        console.error(exception)
      }
    }
  }

  if(expanded){
    return (
      <div className="blog">
        <div>
          {blog.title} | {blog.author} <button onClick={() => setExpanded(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {likes} <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          {blog.user.username}
        </div>
        <div>
          <button onClick={() => handleDelete(blog)}>remove</button>
        </div>
      </div>
    )
  }

  return(
  <div className="blog">
    {blog.title} | {blog.author} <button onClick={() => setExpanded(true)}>view</button>
  </div>  

  )
}

export default Blog