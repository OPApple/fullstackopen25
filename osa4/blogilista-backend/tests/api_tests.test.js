const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)


describe('with initial blogs saved', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArr = blogObjects.map(blog => blog.save())

        await Promise.all(promiseArr)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a specific blog should be returned with all blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(e => e.title)
        assert(titles.includes('Reasons I deserve to pull 4* tsukasa'))
    })

    test('identifier for blogs should be id', async () => {
        const response = await api.get('/api/blogs')

        assert(
            response.body.every(blog => {
                return Object.keys(blog).includes('id')
            })
        )
    })

    describe('Adding new blogs', () => {
        beforeEach(async () => {
            await User.deleteMany({})

            const passwordHash = await bcrypt.hash('wonderhoy', 10)
            const user = new User({ username: 'otori', passwordHash })

            await user.save()
        })

        test('new blogs can be added ', async () => {
            const newBlog = {
                title: 'Lucio x Miku collab is coming next season',
                author: 'A-Aron',
                url: 'www.overwatch.blizzard.com',
                likes: 999999999
            }

            const login = await api
                .post('/api/login')
                .send({ username: 'otori', password: 'wonderhoy' })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', `Bearer ${login.body.token}`)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')

            const titles = response.body.map(b => b.title)

            const newBlogLikes = response.body
                .find(b => b.title === 'Lucio x Miku collab is coming next season').likes

            assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
            assert(titles.includes('Lucio x Miku collab is coming next season'))
            assert.strictEqual(newBlogLikes, 999999999)
        })

        test('likes should be set to 0 if left undefined', async () => {
            const newBlog = {
                title: 'Lucio x Miku collab is coming next season',
                author: 'A-Aron',
                url: 'www.overwatch.blizzard.com'
            }

            const login = await api
                .post('/api/login')
                .send({ username: 'otori', password: 'wonderhoy' })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', `Bearer ${login.body.token}`)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')

            const newBlogLikes = response.body
                .find(b => b.title === 'Lucio x Miku collab is coming next season').likes

            assert.strictEqual(newBlogLikes, 0)
        })

        test('blogs with no title should not be added', async () => {
            const newBlog = {
                author: 'Oskari Olematon',
                url: 'nollkatu.nolla.com',
                likes: 29
            }

            const login = await api
                .post('/api/login')
                .send({ username: 'otori', password: 'wonderhoy' })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', `Bearer ${login.body.token}`)
                .expect(400)
        })

        test('blogs with no url should not be added ', async () => {
            const newBlog = {
                title: 'Is anything real?',
                author: 'Oskari Olematon',
                likes: 29
            }

            const login = await api
                .post('/api/login')
                .send({ username: 'otori', password: 'wonderhoy' })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', `Bearer ${login.body.token}`)
                .expect(400)
        })

        test('blog with invalid token should not be added', async () => {
            const newBlog = {
                title: 'Lucio x Miku collab is coming next season',
                author: 'A-Aron',
                url: 'www.overwatch.blizzard.com',
                likes: 999999999
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', 'not.a.fake.token')
                .expect(401)
        })

        test('blog with no token should not be added', async () => {
            const newBlog = {
                title: 'Lucio x Miku collab is coming next season',
                author: 'A-Aron',
                url: 'www.overwatch.blizzard.com',
                likes: 999999999
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
        })
    })

    describe('Deleting blogs', () => {
        test('Should delete blog with valid id', async () => {
            const blogs = await helper.blogsInDb()
            const blogToBeDeleted = blogs[0]

            await api
                .delete(`/api/blogs/${blogToBeDeleted.id}`)
                .expect(204)

            const newBlogs = await helper.blogsInDb()
            const titles = newBlogs.map(b => b.title)

            assert(!titles.includes(blogToBeDeleted.title))
            assert.strictEqual(newBlogs.length, helper.initialBlogs.length - 1)
        })
    })

    describe('Editing blogs', () => {
        test('Should edit blog with a valid id and return 200', async () => {
            const blogs = await helper.blogsInDb()
            const blogToBeUpdated = blogs[0]

            const updatedBlog = {
                ...blogToBeUpdated,
                likes: 3141
            }

            await api
                .put(`/api/blogs/${blogToBeUpdated.id}`)
                .send(updatedBlog)
                .expect(200)

            const newBlogs = await helper.blogsInDb()
            const editedBlog = newBlogs.find(b => b.id === blogToBeUpdated.id)

            assert.strictEqual(editedBlog.title, blogToBeUpdated.title)
            assert.strictEqual(editedBlog.likes, 3141)
        })
    })

})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('wonderhoy', 10)
        const user = new User({ username: 'otori', passwordHash })

        await user.save()
    })

    test('can create user with new username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ttenma',
            name: 'Tsukasa Tenma',
            password: 'COME ON!!',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('cant create users with the same username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'otori',
            name: 'Emu Otori',
            password: 'wonderhoy!',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('username must be defined', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Shizuku Hinomori',
            password: 'shihoIsCool'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('User validation failed: username: Path `username` is required.'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    })

    test('username must be atleast 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'k',
            name: 'Kanade Yoisaki',
            password: '25ji'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.startsWith('User validation failed: username:'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('password must be defined', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ichika',
            name: 'ichika hoshino',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('no password provided'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('password must be atleast 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'shiho',
            name: 'Shiho Hinomori',
            password: '12',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('password must be longer than 3 characters'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

describe('login and authorization tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('wonderhoy', 10)
        const user = new User({ username: 'otori', passwordHash })

        await user.save()
    })

    test('should be able to login with correct password and username', async () => {
        await api
            .post('/api/login')
            .send({ username: 'otori', password: 'wonderhoy' })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should not be able to login with non existent username', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'kusanagi', password: 'wonderhoy' })
            .expect(401)
            .expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('invalid username or password'))
    })

    test('should not be able to login with incorrect password', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'otori', password: 'not wonderhoy' })
            .expect(401)
            .expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('invalid username or password'))
    })
})

after(async () => {
    await mongoose.connection.close()
})
