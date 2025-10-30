import { useEffect, useState } from 'react';

const empty = { title: '', author: '', isbn: '', year: '', status: 'Available' };

export default function BookForm({ initial = null, onSubmit, submitting }) {
  const [form, setForm] = useState(empty);
  useEffect(() => { setForm(initial ? {
    title: initial.title ?? '',
    author: initial.author ?? '',
    isbn: initial.isbn ?? '',
    year: initial.year ?? '',
    status: initial.status ?? 'Available'
  } : empty); }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'year' ? value.replace(/\D/g,'').slice(0,4) : value }));
  }

  function submit(e) {
    e.preventDefault();
    // simple validation
    if (!form.title.trim() || !form.author.trim()) {
      alert('Title and Author are required');
      return;
    }
    const yearNum = form.year ? Number(form.year) : undefined;
    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: form.isbn.trim(),
      year: yearNum || undefined,
      status: form.status
    });
  }

  return (
    <form onSubmit={submit} className="card" style={{marginTop: 12}}>
      <div className="row">
        <div style={{flex:1, minWidth:220}}>
          <label>Title</label>
          <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="e.g., Clean Code" />
        </div>
        <div style={{flex:1, minWidth:220}}>
          <label>Author</label>
          <input className="input" name="author" value={form.author} onChange={handleChange} placeholder="e.g., Robert C. Martin" />
        </div>
      </div>

      <div className="row" style={{marginTop:12}}>
        <div style={{flex:1, minWidth:160}}>
          <label>ISBN</label>
          <input className="input" name="isbn" value={form.isbn} onChange={handleChange} placeholder="e.g., 9780132350884" />
        </div>
        <div style={{width:120}}>
          <label>Year</label>
          <input className="input" name="year" value={form.year} onChange={handleChange} placeholder="YYYY" />
        </div>
        <div style={{width:160}}>
          <label>Status</label>
          <select className="select" name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>Borrowed</option>
            <option>Reserved</option>
          </select>
        </div>
      </div>

      <div className="row" style={{marginTop:12, justifyContent:'flex-end'}}>
        <button className="btn" type="submit" disabled={!!submitting}>
          {submitting ? 'Saving…' : (initial ? 'Update Book' : 'Add Book')}
        </button>
      </div>
    </form>
  );
}
