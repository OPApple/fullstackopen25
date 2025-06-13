const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0
        }
    )

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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