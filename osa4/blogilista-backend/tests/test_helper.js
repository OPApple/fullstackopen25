const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Bungus blog',
        author: 'Da Schmungler',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Chungus blog',
        author: 'Da Schumngler',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Reasons I deserve to pull 4* tsukasa',
        author: 'opa',
        url: 'opapple.github.io',
        likes: 1000000
    },
    {
        title: 'Reasons I deserve to pull 4* rui',
        author: 'opa',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 1000000
    },
    {
        title: 'They should remove tank role from overwatch 2',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        title: 'Why bungus blog is overrated and should be burned',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 5
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}