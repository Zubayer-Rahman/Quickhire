import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById, submitApplication } from '../services/api';
import Loader from '../components/Loader';
import '../css/JobDetailPage.css';

const initialForm = { name: '', email: '', resume_link: '', cover_note: '' };

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchJobById(id);
        setJob(res.data.data);
      } catch (err) {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);
    try {
      await submitApplication({ ...form, job_id: id });
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      setErrors(apiErrors || [{ msg: 'Something went wrong. Please try again.' }]);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!job) return <div className="detail-not-found">Job not found.</div>;

  return (
    <div className="detail-container">
      <Link to="/" className="detail-back-link">
        ← Back to Jobs
      </Link>

      {/* Job Details */}
      <div className="detail-card detail-card--job">
        <div className="detail-header">
          <div>
            <h1 className="detail-title">{job.title}</h1>
            <p className="detail-company">
              {job.company} · {job.location}
            </p>
          </div>
          <span className="detail-badge">{job.category}</span>
        </div>
        <div className="detail-description">{job.description}</div>
        <p className="detail-date">
          Posted on {new Date(job.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Apply Form */}
      <div className="detail-card detail-card--apply">
        <h2 className="detail-apply-title">Apply Now</h2>

        {success && (
          <div className="detail-alert detail-alert--success">
            🎉 Your application was submitted successfully!
          </div>
        )}
        {errors.length > 0 && (
          <div className="detail-alert detail-alert--error">
            {errors.map((e, i) => (
              <p key={i}>{e.msg}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="detail-form">
          <div>
            <label className="detail-form-label">Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="detail-form-input"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="detail-form-label">Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="detail-form-input"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="detail-form-label">Resume Link (URL) *</label>
            <input
              name="resume_link"
              type="url"
              value={form.resume_link}
              onChange={handleChange}
              required
              className="detail-form-input"
              placeholder="https://drive.google.com/your-resume"
            />
          </div>
          <div>
            <label className="detail-form-label">Cover Note</label>
            <textarea
              name="cover_note"
              value={form.cover_note}
              onChange={handleChange}
              rows={4}
              className="detail-form-textarea"
              placeholder="Tell us why you're a great fit..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="detail-submit-btn"
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetailPage;