import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('Form should call createBlog callback with the correct params', async () => {
    const user = userEvent.setup()
    const mockCreate = vi.fn()

    const { container } = render(<BlogForm createBlog={mockCreate}/>)

    const titleInput  = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput    = container.querySelector('.urlInput')

    const sendBtn = screen.getByText('create')

    await user.type(titleInput, 'Bingus')
    await user.type(authorInput, 'Schmungus')
    await user.type(urlInput, 'www.test.com')
    await user.click(sendBtn)

    expect(mockCreate.mock.calls).toHaveLength(1)
    expect(mockCreate.mock.calls[0][0].title).toBe('Bingus')
    expect(mockCreate.mock.calls[0][0].author).toBe('Schmungus')
    expect(mockCreate.mock.calls[0][0].url).toBe('www.test.com')
})