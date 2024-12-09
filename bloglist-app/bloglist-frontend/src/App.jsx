import loginService from './services/login'
import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from  './components/BlogForm'
import Togglable from  './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [info, setInfo] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setInfo('wrong username or password')
      setTimeout(() => {
        setInfo(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    returnedBlog.user = user
    setBlogs(blogs.concat(returnedBlog))
    setInfo(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  const handleDeleteBlog = (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
    }
  }

  const handleLikeBlog = async (id, blog) => {
    const userBlog = blog.user
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.likeBlog(id, likedBlog)
    returnedBlog.user = userBlog
    setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
  }

  const sortedBlogs = [...blogs].sort((a,b) => {
    return b.likes - a.likes
  })

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={info} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type="password"
              value={password}
              name="Password"
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
      <div>
        <h2>blogs</h2>
        <Notification message={info} />
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user.name} onDelete={handleDeleteBlog} onLike={handleLikeBlog} />
        )}
      </div>
    </div>
  )
}

export default App