import React from 'react'
import './Banner.css'
import SearchBar from './SearchBar'
import Group from '../assets/Group.png'
import pattern from '../assets/Pattern.png'
import BannerImg from '../assets/banner-pic.png'

const Banner = () => {
  return (
    <div className='banner-container'>
      <div className='left-content'>
        <h1>Discover more than <span>5000+ Jobs</span></h1>
        <img src={Group} alt="underline" />
        <p className='description'>Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
        <SearchBar />
        <p className='contentline'>Popular : UI Designer, UX Researcher, Android, Admin</p>
      </div>
      <img src={pattern} alt="pattern" className='pattern'/>
      <img src={BannerImg} alt="banner-img" className='banner-img'/>
    </div>
  )
}

export default Banner