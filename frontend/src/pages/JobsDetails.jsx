import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById, submitApplication } from '../services/api';
import Loader from '../components/Loader';

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
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
  if (!job) return <div className="text-center py-20 text-gray-400">Job not found.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-primary hover:underline">← Back to Jobs</Link>

      {/* Job Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-500 mt-1">{job.company} · {job.location}</p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
            {job.category}
          </span>
        </div>
        <div className="mt-6 prose text-gray-700 whitespace-pre-line text-sm leading-relaxed">
          {job.description}
        </div>
        <p className="mt-6 text-xs text-gray-400">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
      </div>

      {/* Apply Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Apply Now</h2>

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            🎉 Your application was submitted successfully!
          </div>
        )}
        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {errors.map((e, i) => <p key={i}>{e.msg}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (URL) *</label>
            <input
              name="resume_link"
              type="url"
              value={form.resume_link}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="https://drive.google.com/your-resume"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Note</label>
            <textarea
              name="cover_note"
              value={form.cover_note}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="Tell us why you're a great fit..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetailPage;