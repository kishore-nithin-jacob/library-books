import { db } from '../db/booksDB';

export async function getAllBooks() {
  return db.books.orderBy('createdAt').reverse().toArray();
}

export async function getBook(id) {
  return db.books.get(Number(id));
}

export async function addBook(data) {
  const now = new Date();
  return db.books.add({ ...data, createdAt: now, updatedAt: now });
}

export async function updateBook(id, updates) {
  const now = new Date();
  return db.books.update(Number(id), { ...updates, updatedAt: now });
}

export async function deleteBook(id) {
  return db.books.delete(Number(id));
}

// Optional: load some sample data for demos
export async function seedIfEmpty() {
  const count = await db.books.count();
  if (count > 0) return;
  const sample = [
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', year: 2008, status: 'Available' },
    { title: 'You Don’t Know JS Yet', author: 'Kyle Simpson', isbn: '9781091210093', year: 2020, status: 'Borrowed' },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '9781449373320', year: 2017, status: 'Available' }
  ];
  for (const s of sample) await addBook(s);
}
