import React from 'react';
import { Link } from 'react-router-dom';

const categoryColors = {
    Engineering: 'bg-blue-100 text-blue-700',
    Design: 'bg-pink-100 text-pink-700',
    Management: 'bg-yellow-100 text-yellow-700',
    Marketing: 'bg-green-100 text-green-700',
    Default: 'bg-gray-100 text-gray-700',
};

const JobCard = ({ job }) => {
    const colorClass = categoryColors[job.category] || categoryColors.Default;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{job.company}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}>
                    {job.category}
                </span>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>🗓 {new Date(job.created_at).toLocaleDateString()}</span>
            </div>
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">{job.description}</p>
            <Link
                to={`/jobs/${job.id}`}
                className="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
                View Details →
            </Link>
        </div>
    );
};

export default JobCard;