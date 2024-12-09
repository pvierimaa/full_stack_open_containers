import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit with the right details when a new blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()


  const { container } = render(<BlogForm createBlog={createBlog} />)

  const input1 = container.querySelector('#blog-input-title')
  const input2 = container.querySelector('#blog-input-author')
  const input3 = container.querySelector('#blog-input-url')

  const sendButton = screen.getByText('create')

  await user.type(input1, 'Testing Title')
  await user.type(input2, 'Testing Author')
  await user.type(input3, 'http://testing-url.com')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'http://testing-url.com'
  })

})