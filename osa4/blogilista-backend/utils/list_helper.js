const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((prev, blog) => prev + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = null
    blogs.forEach(blog => {
        if(!favorite){
            favorite = blog
        } else if (blog.likes >= favorite.likes){
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let authors = []
    let seen = []
    blogs.forEach(blog => {
        if (!seen.includes(blog.author)){
            const newAuthor = { author: blog.author, blogs: 1 }
            seen = seen.concat(blog.author)
            authors = authors.concat(newAuthor)
        } else {
            const updateIndex = authors.findIndex(a => a.author === blog.author)
            authors[updateIndex].blogs += 1
        }

    })
    console.log(blogs)
    return authors.sort((a, b) => a.blogs - b.blogs)[authors.length - 1]
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    let authors = []
    let seen = []

    blogs.forEach(blog => {
        if(!seen.includes(blog.author)){
            const newAuthor = { author: blog.author, likes: blog.likes }
            seen = seen.concat(blog.author)
            authors = authors.concat(newAuthor)
        }else{
            const updateIndex = authors.findIndex(a => a.author === blog.author)
            authors[updateIndex].likes += blog.likes
        }
    })
    return authors.sort((a, b) => b.likes - a.likes)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}