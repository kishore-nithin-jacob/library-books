import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { addBook, getBook, updateBook } from '../services/bookService';

export default function BookFormPage() {
  const { id } = useParams(); // if present -> edit mode
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (isEdit) {
        const b = await getBook(id);
        if (mounted) setInitial(b || null);
      }
    })();
    return () => { mounted = false; }
  }, [id, isEdit]);

  async function handleSubmit(data) {
    setSaving(true);
    try {
      if (isEdit) {
        await updateBook(id, data);
      } else {
        await addBook(data);
      }
      navigate('/');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <h2>{isEdit ? '✏️ Edit Book' : '➕ Add Book'}</h2>
      <BookForm initial={initial} onSubmit={handleSubmit} submitting={saving} />
    </div>
  );
}
