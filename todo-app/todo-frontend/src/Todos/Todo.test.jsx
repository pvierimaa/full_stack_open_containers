import { render, screen, fireEvent } from '@testing-library/react'
import Todo from './Todo'
import { vi } from 'vitest'

describe('Todo Component', () => {
  const mockDeleteTodo = vi.fn()
  const mockCompleteTodo = vi.fn()

  const todo = {
    _id: '1',
    text: 'Test Todo',
    done: false,
  }

  it('should render todo text', () => {
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument()
  })

  it('should call completeTodo when Complete button is clicked', () => {
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    const completeButton = screen.getByText(/Complete/i)
    fireEvent.click(completeButton)

    expect(mockCompleteTodo).toHaveBeenCalledWith(todo)
  })

  it('should call deleteTodo when Delete button is clicked', () => {
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    const deleteButton = screen.getByText(/Delete/i)
    fireEvent.click(deleteButton)

    expect(mockDeleteTodo).toHaveBeenCalledWith(todo)
  })
})
