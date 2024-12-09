import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  createBlog

}) =>  {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')


  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            data-testid='title'
            type="title"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            id='blog-input-title'
          />
        </div>
        <div>
          author
          <input
            data-testid='author'
            type="author"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            id='blog-input-author'
          />
        </div>
        <div>
          url
          <input
            data-testid='url'
            type="url"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            id='blog-input-url'
          />
        </div>
        <button type="submit">create</button>
      </form>

    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm