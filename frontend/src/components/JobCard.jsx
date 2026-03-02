import { Link } from 'react-router-dom';
import './JobCard.css';
import JobDetailPage from '../pages/JobsDetails.jsx';


const badgeModifiers = {
    Engineering: 'job-card__badge--engineering',
    Design: 'job-card__badge--design',
    Management: 'job-card__badge--management',
    Marketing: 'job-card__badge--marketing',
    Default: 'job-card__badge--default',
};

const JobCard = ({ job }) => {
    const badgeClass = badgeModifiers[job.category] || badgeModifiers.Default;

    return (
        <div className="job-card">
            <div className="job-card__header">
                <div>
                    <h3 className="job-card__title">{job.title}</h3>
                    <p className="job-card__company">{job.company}</p>
                </div>
                <span className={`job-card__badge ${badgeClass}`}>
                    {job.category}
                </span>
            </div>

            <div className="job-card__meta">
                <span>📍 {job.location}</span>
                <span>🗓 {new Date(job.created_at).toLocaleDateString()}</span>
            </div>

            <p className="job-card__description">{job.description}</p>

            <Link to={`/jobs/${job.id}`} element={JobDetailPage} className="job-card__link">
                View Details →
            </Link>
        </div>
    );
};

export default JobCard;