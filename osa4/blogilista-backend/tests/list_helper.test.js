const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('total likes', () => {

    test('should return 0 if list is empty', () => {
        const empty = []
        assert.strictEqual(listHelper.totalLikes(empty), 0)
    })

    test('should return likes of blog if list only has one blog', () => {
        const oneBlog = blogs.slice(-1)
        const result = listHelper.totalLikes(oneBlog)
        assert.strictEqual(result, 2)

    })

    test('should return total number of likes', () => {
        assert.strictEqual(listHelper.totalLikes(blogs), 36)
    })
})

describe('favorite blog', () => {

    test('should return null with empty list', () => {
        const empty = []
        assert.strictEqual(listHelper.favoriteBlog(empty), null)
    })

    test('should return the only blog if list contains only one blog', () => {
        const oneBlog = blogs.slice(-1)
        assert.deepStrictEqual(listHelper.favoriteBlog(oneBlog), oneBlog[0])
    })

    test('should return the most liked blog for bigger lists', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
    })

    test('should return one of the most liked blogs in a tie', () => {
        const tieList = [
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17ud',
                title: 'Star Wars',
                author: 'George Lucas',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fa',
                title: 'Bungus wars',
                author: 'Da Schumngler',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 0,
                __v: 0
            }
        ]
        assert.deepStrictEqual(listHelper.favoriteBlog(tieList), tieList[1])
    })
})

describe('most blogs', () => {

    test('should return null for empty lists', () => {
        const empty = []
        assert.strictEqual(listHelper.mostBlogs(empty), null)
    })

    test('should return the only blog for one blog lists', () => {
        const oneBlog = blogs.slice(-1)
        assert.deepStrictEqual(listHelper.mostBlogs(oneBlog), { author: 'Robert C. Martin', blogs: 1 })
    })

    test('should return the author with most blogs', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Robert C. Martin', blogs: 3 })
    })

    test('should return one of the top authors in a tie', () => {
        const tieList = blogs.filter(b => b.title !== 'Type wars')
        assert.deepStrictEqual(listHelper.mostBlogs(tieList), { author: 'Robert C. Martin', blogs: 2 })
    })
})

describe('most likes', () => {
    test('should return null for empty lists', () => {
        const empty = []
        assert.strictEqual(listHelper.mostLikes(empty), null)
    })

    test('should return the only blog for one blog lists', () => {
        const oneBlog = blogs.slice(-1)
        assert.deepStrictEqual(listHelper.mostLikes(oneBlog), { author: 'Robert C. Martin', likes: 2 })
    })

    test('should return the most liked author', () => {
        assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: 'Edsger W. Dijkstra', likes: 17 })
    })

    test('should return one of the most liked authors in a tie', () => {
        const tieList = [
            {
                _id: '5a422bc61b54a676234d17fc',
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17ud',
                title: 'Star Wars',
                author: 'George Lucas',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                __v: 0
            },
            {
                _id: '5a422bc61b54a676234d17fa',
                title: 'Bungus wars',
                author: 'Da Schumngler',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 0,
                __v: 0
            }
        ]

        assert.deepStrictEqual(listHelper.mostLikes(tieList), { author: 'Robert C. Martin', likes: 2 })
    })
})