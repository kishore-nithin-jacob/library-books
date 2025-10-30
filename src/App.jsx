import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BookFormPage from './pages/BookFormPage';
import ViewBook from './pages/ViewBook';
import './styles.css';

export default function App() {
  return (
    <>
      <nav className="card" style={{borderRadius:0}}>
        <div className="container row" style={{justifyContent:'space-between'}}>
          <Link to="/"><strong>Library Manager</strong></Link>
          <div className="row">
            <Link className="btn" to="/">Home</Link>
            <Link className="btn" to="/add">Add</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<BookFormPage />} />
        <Route path="/edit/:id" element={<BookFormPage />} />
        <Route path="/book/:id" element={<ViewBook />} />
      </Routes>
    </>
  );
}
