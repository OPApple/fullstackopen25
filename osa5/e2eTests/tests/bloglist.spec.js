const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Emu Otori',
        username: 'Wonderhoy~!',
        password: 'wxsIsCool'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible
    await expect(page.getByTestId('password')).toBeVisible
    await expect(page.getByRole('button')).toBeVisible
  })

  describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('Wonderhoy~!')
        await page.getByTestId('password').fill('wxsIsCool')
        await page.getByRole('button').click()
    
        await expect(page.getByText('Emu Otori logged in')).toBeVisible()
      })

      test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('not wonderhoy...')
        await page.getByTestId('password').fill('oughgho')
        await page.getByRole('button').click()

        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('Emu Otori logged in')).not.toBeVisible()
      })

  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('Wonderhoy~!')
        await page.getByTestId('password').fill('wxsIsCool')
        await page.getByRole('button').click()
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByText('Add New Blog').click()

        await page.getByTestId('title').fill('Be not afraid')
        await page.getByTestId('author').fill('testing...')
        await page.getByTestId('url').fill('www.test.ing')

        await page.getByTestId('create').click()

        await expect(page.getByText('Be not afraid | testing...')).toBeVisible()
    })

    test('blogs can be liked', async ({ page }) => {
        await page.getByText('Add New Blog').click()

        await page.getByTestId('title').fill('Be not afraid')
        await page.getByTestId('author').fill('testing...')
        await page.getByTestId('url').fill('www.test.ing')

        await page.getByTestId('create').click()

        await page.getByText('view').click()

        await page.getByText('like').click()

        

        await expect((await page.getByTestId('likes').innerText()).toString()).toBe('1')
    })
  })
})