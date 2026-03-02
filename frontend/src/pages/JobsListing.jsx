import React, { useEffect, useState, useCallback } from 'react';
import { fetchJobs } from '../services/api';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import '../css/JobListings.css';

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchJobs({ search, category, location });
      setJobs(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, location]);

  useEffect(() => {
    const debounce = setTimeout(() => loadJobs(), 400);
    return () => clearTimeout(debounce);
  }, [loadJobs]);

  return (
    <div className='joblist-container'>
      <div className="listings-header">
        <h1 className="listings-title">Find Your Next Job</h1>
        <p className="listings-subtitle">
          Browse hundreds of opportunities and find your perfect match.
        </p>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
      />

      <div className="listings-results">
        {loading ? (
          <Loader />
        ) : jobs.length === 0 ? (
          <div className="listings-empty">
            No jobs found. Try a different search.
          </div>
        ) : (
          <>
            <p className="listings-count">{jobs.length} job(s) found</p>
            <div className="listings-grid">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;