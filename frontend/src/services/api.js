import axios from 'axios';

const API = axios.create({
  baseURL: process.env.QUICKHIRE_API_URL || 'http://localhost:5000/api',
});

// Jobs
export const fetchJobs = (params) => API.get('/jobs', { params });
export const fetchJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

// Applications
export const submitApplication = (data) => API.post('/applications', data);