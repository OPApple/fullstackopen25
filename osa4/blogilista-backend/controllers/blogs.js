const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0,
            user: user._id
        }
    )

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if(!(blog.user.toString() === user._id.toString())){
        return response.status(401).json({ error: 'cannot delete blogs without ownership' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const blogToBeUpdated = await Blog.findById(request.params.id)

    blogToBeUpdated.title = title
    blogToBeUpdated.author = author
    blogToBeUpdated.url = url
    blogToBeUpdated.likes = likes ? likes : 0

    const savedBlog = await blogToBeUpdated.save()
    response.status(200).json(savedBlog)
})

module.exports = blogsRouter