const RemoveButton = ({ user, blogUser, onDelete, blog }) => {
  if (user === blogUser) {
    return (
      <div>
        <button onClick={() => onDelete(blog.id, blog.title, blog.author)}>remove</button>
      </div>
    )}
}

export default RemoveButton