import { useState } from 'react'
import RemoveButton from './RemoveButton'

const Blog = ({ blog, onDelete, user, onLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  return (
    <div style={blogStyle} >
      <div style={hideWhenVisible} data-testid="blog-summary">
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} data-testid="blog-details">
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(false)}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={() => onLike(blog.id, blog)}>like</button> <br />
        {blog.user.name} <br />
        <RemoveButton user={user} blogUser={blog.user.name} onDelete={onDelete} blog={blog} />
      </div>
    </div>
  )}

export default Blog