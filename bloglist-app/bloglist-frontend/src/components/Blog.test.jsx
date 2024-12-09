import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti L',
    url: 'http://example.com',
    likes: 0,
    user: {
      name: 'Matti L'
    }
  }

  render(<Blog blog={blog} />)

  const div = screen.getByTestId('blog-summary')

  expect(div).toHaveTextContent('Component testing is done with react-testing-library')

})

test('renders url, likes and user when button pressed', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti L',
    url: 'http://example.com',
    likes: 0,
    user: {
      name: 'Uolevi H'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()

  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeInTheDocument()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
  expect(screen.queryByText(blog.user.name)).toBeNull()

  const button = screen.getByText('view')
  await user.click(button)

  const div = screen.getByTestId('blog-details')

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(`likes ${blog.likes}`)
  expect(div).toHaveTextContent(blog.user.name)
})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti L',
    url: 'http://example.com',
    likes: 0,
    user: {
      name: 'Uolevi H'
    }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} onLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})