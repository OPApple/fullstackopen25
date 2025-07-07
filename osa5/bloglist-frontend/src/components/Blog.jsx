import { useState, useEffect } from 'react'

const Blog = ({ blog, handleDelete, handleLike }) => {
    const [expanded, setExpanded] = useState(false)

    if(expanded){
        return (
            <div className="blog">
                <div className='title'>
                    {blog.title} | {blog.author} <button onClick={() => setExpanded(false)}>hide</button>
                </div>
                <div className='url'>
                    {blog.url}
                </div>
                <div className='likes'>
                    {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
                </div>
                <div className='username'>
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