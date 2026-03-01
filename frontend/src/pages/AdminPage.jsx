import React, { useEffect, useState } from 'react';
import { fetchJobs, createJob, deleteJob } from '../services/api';
import Loader from '../components/Loader';
import '../css/AdminPage.css';

const CATEGORIES = ['Engineering', 'Design', 'Management', 'Marketing'];

const initialForm = {
    title: '',
    company: '',
    location: '',
    category: 'Engineering',
    description: '',
};

const AdminPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');

    const loadJobs = async () => {
        setLoading(true);
        try {
            const res = await fetchJobs();
            setJobs(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleCreate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors([]);
        setSuccessMsg('');
        try {
            await createJob(form);
            setSuccessMsg('Job created successfully!');
            setForm(initialForm);
            loadJobs();
        } catch (err) {
            const apiErrors = err.response?.data?.errors;
            setErrors(apiErrors || [{ msg: 'Failed to create job.' }]);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await deleteJob(id);
            setJobs(jobs.filter((j) => j.id !== id));
        } catch {
            alert('Failed to delete job.');
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Panel</h1>

            {/* Create Job Form */}
            <div className="admin-card admin-card--form">
                <h2 className="admin-card__title">Post a New Job</h2>

                {successMsg && (
                    <div className="alert alert--success">{successMsg}</div>
                )}
                {errors.length > 0 && (
                    <div className="alert alert--error">
                        {errors.map((e, i) => (
                            <p key={i}>{e.msg}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleCreate} className="form-grid">
                    <div>
                        <label className="form-label">Job Title *</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="e.g. Frontend Developer"
                        />
                    </div>
                    <div>
                        <label className="form-label">Company *</label>
                        <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="e.g. TechCorp BD"
                        />
                    </div>
                    <div>
                        <label className="form-label">Location *</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="e.g. Dhaka / Remote"
                        />
                    </div>
                    <div>
                        <label className="form-label">Category *</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="form-select"
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-grid__full">
                        <label className="form-label">Description *</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="form-textarea"
                            placeholder="Job description, requirements, responsibilities..."
                        />
                    </div>
                    <div className="form-grid__full">
                        <button type="submit" disabled={submitting} className="btn-primary">
                            {submitting ? 'Creating...' : '+ Post Job'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Existing Jobs */}
            <div className="admin-card">
                <h2 className="admin-card__title">Manage Jobs</h2>
                {loading ? (
                    <Loader />
                ) : jobs.length === 0 ? (
                    <p className="empty-message">No jobs yet.</p>
                ) : (
                    <div className="job-list">
                        {jobs.map((job) => (
                            <div key={job.id} className="job-item">
                                <div>
                                    <p className="job-item__title">{job.title}</p>
                                    <p className="job-item__meta">
                                        {job.company} · {job.location} · {job.category}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;