import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Navbar from './components/NavBar.jsx';
import AdminPage from './pages/AdminPage.jsx';
import JobListingsPage from './pages/JobsListing.jsx';
import JobDetailsPage from './pages/JobsDetails.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/jobs" element={<JobListingsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;