import React from 'react'
import Banner from '../components/Banner'
import Carasoule from '../components/Carasoule'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import dashboardImage from '../assets/dashboard.png'
import Category from '../components/Category'
import jobs from './JobsListing.jsx'


const home = () => {
  return (
    <>
      <Banner />
      <Carasoule />

      <div className='job-category'>
        <div className='category-header'>
          <h2>Explore by <span>category</span></h2>
          <div className='show-jobs'>
            <Link to="/jobs" element={jobs} className='see-all'>Show all Jobs</Link>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        <div className='category-items'>
          <Category />

        </div>
      </div>

      <div className='cta-section'>
        <div>
          <h2>Start posting jobs today</h2>
          <p>Start posting jobs for only $10.</p>
          <button className='cta-button'>Sign Up for Free</button>
        </div>
        <img src={dashboardImage} alt="dashboard" className='dashboard-image' />
      </div>
      
      <div className='featured-job'>
        <div className='featured-header'>
          <h2>Featured <span>Jobs</span></h2>
          <div className='show-jobs'>
            <Link to="/jobs" className='see-all'>Show all Jobs</Link>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        <div className='featured-items'>

        </div>
      </div>


      <div className='latest-job'>
        <div className='latest-header'>
          <h2>Latest <span>Jobs Open</span></h2>
          <div className='show-jobs'>
            <Link to="/jobs" className='see-all'>Show all Jobs</Link>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        <div className='latest-items'>
          
        </div>
      </div>
    </>
  )
}

export default home