import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

const blog = {
    title: 'Bingus',
    author: 'Schmungus',
    url: 'www.test.com',
    likes: 123,
    user: {
        username: 'Real User'
    }
}

test('renders title and author', () => {
    render(<Blog blog={blog} />)

    const elem = screen.getByText('Bingus | Schmungus')

    expect(elem).toBeDefined()
})

test('renders url, likes and user when blog is expanded', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const title    = container.querySelector('.title')
    const url      = container.querySelector('.url')
    const likes    = container.querySelector('.likes')
    const username = container.querySelector('.username')

    expect(title).toHaveTextContent('Bingus | Schmungus')
    expect(url).toHaveTextContent('www.test.com')
    expect(likes).toHaveTextContent('123')
    expect(username).toHaveTextContent('Real User')
})

test('should call like function when blog is liked', async () => {
    const mockLike = vi.fn()

    render(
        <Blog blog={blog} handleLike={mockLike}/>
    )

    const user = userEvent.setup()
    const expandBtn = screen.getByText('view')
    await user.click(expandBtn)

    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(mockLike.mock.calls).toHaveLength(2)
})