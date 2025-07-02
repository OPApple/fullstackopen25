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
    } catch (exception) {
      showNotification(`error something went wrong while creating the blog.`, 3000)
    }
  }


  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <form className='login' onSubmit={handleLogin}>
          <div>
            username <br/>
              <input 
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <br/>
              <input 
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              /> 
          </div>
          <button type="submit">login</button>
        </form>     
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {!user && loginForm()}
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
        <Blog key={blog.id} blog={blog} />
      )}

      
    </div>
  )
}

export default App