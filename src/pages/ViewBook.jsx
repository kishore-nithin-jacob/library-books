import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBook } from '../services/bookService';

export default function ViewBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const b = await getBook(id);
      if (mounted) setBook(b || null);
    })();
    return () => { mounted = false; }
  }, [id]);

  if (!book) {
    return (
      <div className="container">
        <p>Book not found.</p>
        <Link className="btn" to="/">← Back</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>🔎 View Book</h2>
        <Link className="btn" to="/">← Back</Link>
      </div>
      <div className="card">
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>ISBN:</strong> {book.isbn || '—'}</p>
        <p><strong>Year:</strong> {book.year || '—'}</p>
        <p><strong>Status:</strong> {book.status}</p>
        <p><strong>Created:</strong> {new Date(book.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(book.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
