import Dexie from 'dexie';

export const db = new Dexie('LibraryDB');
db.version(1).stores({
  // ++id = auto-increment primary key; add indexes for common queries
  books: '++id,title,author,isbn,year,status,createdAt,updatedAt'
});
