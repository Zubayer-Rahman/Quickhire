// In your parent page (e.g. Home.jsx)
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Category from '../components/Category'
import business from '../assets/icons/business.png'
import hr from '../assets/icons/hr.png'
import tech from '../assets/icons/tech.png'
import sales from '../assets/icons/sales.png'
import marketing from '../assets/icons/marketing.png'
import finance from '../assets/icons/finance.png'
import engineering from '../assets/icons/engineering.png'


const CATEGORIESTYPE = [
    { category: 'Engineering', icon: <img src={engineering} alt="Engineering Icon" /> },
    { category: 'Design', icon: <img src={business} alt="Business Icon" /> },
    { category: 'Management', icon: <img src={business} alt="Business Icon" /> },
    { category: 'Marketing', icon: <img src={marketing} alt="Marketing Icon" /> },
    { category: 'Sales', icon: <img src={sales} alt="Sales Icon" /> },
    { category: 'Finance', icon: <img src={finance} alt="Finance Icon" /> },
    { category: 'Technology', icon: <img src={tech} alt="Technology Icon" /> },
    { category: 'HR', icon: <img src={hr} alt="HR Icon" /> },
]

const Home = () => {
    const [categoryCounts, setCategoryCounts] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs')
            .then(res => {
                // Count jobs per category from the full list
                const counts = {}
                res.data.data.forEach(job => {
                    counts[job.category] = (counts[job.category] || 0) + 1
                })
                setCategoryCounts(counts)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="categories-grid">
            {CATEGORIESTYPE.map(({ category, icon }) => (
                <Category
                    key={category}
                    icon={icon}
                    category={category}
                    jobsAvailable={loading ? '...' : (categoryCounts[category] || 0)}
                />
            ))}
        </div>
    )
}

export default Home