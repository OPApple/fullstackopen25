import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle]   = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl]       = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <form className='createNew' onSubmit={addBlog}>
            <div>
                title:
                <input
                    data-testid='title'
                    className='titleInput'
                    type="text"
                    value = {newTitle}
                    name='Title'
                    onChange={event => setNewTitle(event.target.value)}
                />
            </div>
            <div>
                author:
                <input
                    data-testid='author'
                    className='authorInput'
                    type="text"
                    value={newAuthor}
                    name='Author'
                    onChange={event => setNewAuthor(event.target.value)}
                />
            </div>
            <div>
                url:
                <input
                    data-testid='url'
                    className='urlInput'
                    type="text"
                    value={newUrl}
                    name='Url'
                    onChange={event => setNewUrl(event.target.value)}
                />
            </div>
            <button data-testid='create' type='submit'>create</button>
        </form>
    )

}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm
