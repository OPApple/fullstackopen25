import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const blogFormRef = useRef()

    const [blogs, setBlogs]       = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser]         = useState(null)

    const [message, setMessage]   = useState(null)


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const showNotification = (message, duration) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, duration)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try{
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

            showNotification(`logged in as ${user.username}`, 3000)
        } catch (exeption) {
            showNotification('error wrong credentials', 5000)
        }

    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        location.reload()
    }

    const handleCreate = async (newBlog) => {
        blogFormRef.current.toggleVisibility()

        try{
            await blogService.create(newBlog)
            showNotification(`${newBlog.title} by ${newBlog.author} created!`, 3000)
            blogService.getAll().then(blogs => {
                setBlogs(blogs)
            })
        } catch (exception) {
            showNotification('error something went wrong while creating the blog.', 3000)
        }
    }

    const handleDelete = async (blog) => {
        const confimation = window.confirm(`Remove blog: '${blog.title}' by ${blog.author}?`)
        if(confimation){
            try{
                await blogService.deleteBlog(blog)
                blogService.getAll().then(blogs => {
                    setBlogs(blogs)
                })
                showNotification(`error ${blog.title} by ${blog.author} removed`, 3000)
            } catch (exception) {
                console.error(exception)
            }
        }
    }

    const handleLike = async (blog) => {
        const likedBlog = {
            ...blog,
            likes: blog.likes + 1,
        }

        await blogService.like(likedBlog)

        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )

    }

    if (user === null){
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={message} />
                <form className='login' onSubmit={handleLogin}>
                    <div>
                        username <br/>
                        <input
                            data-testid='username'
                            type='text'
                            value={username}
                            name='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password <br/>
                        <input
                            data-testid='password'
                            type='password'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button name='log in' type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message} />
            {user &&
                <div>
                    <p className='welcomeText'>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
                </div>
            }
            <Togglable buttonLabel='Add New Blog' ref={blogFormRef}>
                <BlogForm
                    createBlog={handleCreate}
                />
            </Togglable>

            {user && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                />
            )}


        </div>
    )
}

export default App