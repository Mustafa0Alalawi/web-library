import { json } from '@sveltejs/kit';
import { books } from '../book-data.js';

export const DELETE = async ({ params }) => {
  const { id } = params;


  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex === -1) {
    return json({ error: "Book not found" }, { status: 404 });
  }


  books.splice(bookIndex, 1);

  return json({ success: true }, { status: 200 });
};
