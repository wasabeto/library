import Book from './model'

let book

beforeEach(async () => {
  book = await Book.create({ title: 'Book 1', genre: 'Genre 1', author: { name: 'Authr1', age: 50, books: 5 }, published: 2015 })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = book.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(book.id)
    expect(view.title).toBe(book.title)
    expect(view.genre).toBe(book.genre)
    expect(view.author).toBe(book.author)
    expect(view.published).toBe(book.published)
  })

  it('returns full view', () => {
    const view = book.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(book.id)
    expect(view.title).toBe(book.title)
    expect(view.genre).toBe(book.genre)
    expect(view.author).toBe(book.author)
    expect(view.published).toBe(book.published)
  })
})
