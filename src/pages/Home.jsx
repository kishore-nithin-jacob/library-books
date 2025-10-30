import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/booksDB';
import { deleteBook, seedIfEmpty } from '../services/bookService';
import { useMemo, useState } from 'react';

export default function Home() {
  const books = useLiveQuery(() => db.books.orderBy('createdAt').reverse().toArray(), [], []);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('createdAt'); // title | author | year | status | createdAt
  const [sortDir, setSortDir] = useState('desc');      // asc | desc

  const filtered = useMemo(() => {
    if (!books) return [];
    const q = query.trim().toLowerCase();
    const base = q
      ? books.filter(b =>
          (b.title || '').toLowerCase().includes(q) ||
          (b.author || '').toLowerCase().includes(q) ||
          (b.isbn || '').toLowerCase().includes(q) ||
          String(b.year || '').includes(q) ||
          (b.status || '').toLowerCase().includes(q)
        )
      : books;

    const dir = sortDir === 'asc' ? 1 : -1;
    return [...base].sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      // Normalize undefined and case for strings
      const aV = typeof A === 'string' ? A.toLowerCase() : (A ?? '');
      const bV = typeof B === 'string' ? B.toLowerCase() : (B ?? '');
      if (aV < bV) return -1 * dir;
      if (aV > bV) return  1 * dir;
      return 0;
    });
  }, [books, query, sortKey, sortDir]);

  return (
    <div className="container">
      <div className="header">
        <h2>📚 Library Books</h2>
        <div className="row">
          <Link className="btn" to="/add">+ Add Book</Link>
          <button className="btn" onClick={() => seedIfEmpty()}>Quick Seed</button>
        </div>
      </div>

      {/* Controls */}
      <div className="card" style={{marginBottom:12}}>
        <div className="row" style={{alignItems:'center'}}>
          <input
            className="input"
            style={{flex:1, minWidth:240}}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, ISBN, year, status…"
          />
          <div className="row" style={{gap:8}}>
            <select className="select" value={sortKey} onChange={e=>setSortKey(e.target.value)}>
              <option value="createdAt">Sort: Created</option>
              <option value="title">Sort: Title</option>
              <option value="author">Sort: Author</option>
              <option value="year">Sort: Year</option>
              <option value="status">Sort: Status</option>
            </select>
            <select className="select" value={sortDir} onChange={e=>setSortDir(e.target.value)}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
            {query && (
              <button className="btn" onClick={()=>setQuery('')}>Clear</button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        {(!filtered || filtered.length === 0) ? (
          <p>No books {query ? 'match your search.' : 'yet. Click “Quick Seed” or “Add Book”.'}</p>
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
              {filtered.map((b, i) => (
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
