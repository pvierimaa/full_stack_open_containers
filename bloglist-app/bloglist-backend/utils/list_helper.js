const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }  

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i]
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
   const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const maxBlogsAuthor = Object.keys(authorCounts).reduce((maxAuthor, author) => 
    authorCounts[author] > authorCounts[maxAuthor] ? author : maxAuthor
  )

  return {
    author: maxBlogsAuthor,
    blogs: authorCounts[maxBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  const maxLikesAuthor = Object.keys(authorLikes).reduce((maxAuthor, author) => 
    authorLikes[author] > authorLikes[maxAuthor] ? author : maxAuthor
  )

  return {
    author: maxLikesAuthor,
    likes: authorLikes[maxLikesAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}  