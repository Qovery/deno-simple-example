interface Book {
  id: string;
  author: string;
  title: string;
}

const getBooks = ({ response }: { response: any }) => {
  response.body = books;
};

const getBook = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const book: Book | undefined = getBy(params.id);
  if (book) {
    response.status = 200;
    response.body = book;
  } else {
    response.status = 404;
    response.body = { message: `Book not found.` };
  }
};

const addBook = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const book: Book = body.value;
  books.push(book);
  response.body = { message: "OK" };
  response.status = 200;
};

const updateBook = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let book: Book | undefined = getBy(params.id);
  if (book) {
    const body = await request.body();
    const update: { author?: string; title?: string } = body.value;
    book = { ...book, ...update };
    books = [...books.filter((book) => book.id !== params.id), book];
    response.status = 200;
    response.body = { message: "OK" };
  } else {
    response.status = 404;
    response.body = { message: `Book not found` };
  }
};

const deleteBook = (
  { params, response }: { params: { id: string }; response: any },
) => {
  books = books.filter((book) => book.id !== params.id);
  response.body = { message: "OK" };
  response.status = 200;
};

const getBy = (id: string): (Book | undefined) =>
  books.filter((book) => book.id === id)[0];

let books: Book[] = [{
  id: "0",
  author: "George R. R. Martin",
  title: "A Game of Thrones",
}, {
  id: "1",
  author: "George R. R. Martin",
  title: "A Clash of Kings",
}, {
  id: "2",
  author: "George R. R. Martin",
  title: "A Storm of Swords",
}, {
  id: "3",
  author: "George R. R. Martin",
  title: "A Feast for Crows",
}, {
  id: "4",
  author: "George R. R. Martin",
  title: "A Dance with Dragons",
}];

export { getBooks, getBook, addBook, updateBook, deleteBook };
