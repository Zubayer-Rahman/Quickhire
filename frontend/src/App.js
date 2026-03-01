import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/NavBar.jsx';
import AdminPage from './pages/AdminPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          {/*<Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/companies" element={<Companies />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;