import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/booksDB';
import { deleteBook, seedIfEmpty } from '../services/bookService';

export default function Home() {
  const books = useLiveQuery(() => db.books.orderBy('createdAt').reverse().toArray(), [], []);

  return (
    <div className="container">
      <div className="header">
        <h2>📚 Library Books</h2>
        <div className="row">
          <Link className="btn" to="/add">+ Add Book</Link>
          <button className="btn" onClick={() => seedIfEmpty()}>Quick Seed</button>
        </div>
      </div>

      <div className="card">
        {(!books || books.length === 0) ? (
          <p>No books yet. Click “Quick Seed” or “Add Book”.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{width:40}}>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Year</th>
                <th>Status</th>
                <th style={{width:240}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={b.id}>
                  <td>{i + 1}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.isbn || '—'}</td>
                  <td>{b.year || '—'}</td>
                  <td><span className="badge">{b.status}</span></td>
                  <td className="row">
                    <Link className="btn" to={`/book/${b.id}`}>View</Link>
                    <Link className="btn" to={`/edit/${b.id}`}>Edit</Link>
                    <button className="btn btn-destroy" onClick={() => deleteBook(b.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
