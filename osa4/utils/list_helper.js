const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  blogs.forEach(blog => {
    if(blog.likes > favorite.likes) favorite = blog
  });
  return favorite
}

const authors = (blogs) => {
    const withDuplicates = blogs.map(blog => blog.author)
    const withoutDuplicates = [...new Set(withDuplicates)]
    return withoutDuplicates
}

const mostBlogs = (blogs) => { 
    const dictionary = authors(blogs)
      .reduce((authorList, author) => {
        authorList[author] = 0
        return authorList
    }, {})
    
    let returnValue = {
        author: '',
        blogs: 0
    }

    blogs.forEach(blog => {
      dictionary[blog.author] += 1
      if (dictionary[blog.author] > returnValue.blogs) {
          returnValue.author = blog.author
          returnValue.blogs = dictionary[blog.author]
      }
    });

    return returnValue
}

const mostLikes = (blogs) => { 
    const dictionary = authors(blogs)
      .reduce((authorList, author) => {
        authorList[author] = 0
        return authorList
    }, {})
    
    let returnValue = {
        author: '',
        likes: 0
    }

    blogs.forEach(blog => {
      dictionary[blog.author] += blog.likes
      if (dictionary[blog.author] > returnValue.likes) {
          returnValue.author = blog.author
          returnValue.likes = dictionary[blog.author]
      }
    });

    return returnValue
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}