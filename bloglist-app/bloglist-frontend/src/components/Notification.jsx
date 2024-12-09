const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message === 'wrong username or password') {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="info">
        {message}
      </div>
    )
  }
}

export default Notification