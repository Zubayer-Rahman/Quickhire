import React from 'react'
import './Carasoule.css'
import img1 from '../assets/amd.png'
import img2 from '../assets/intel.png'
import img3 from '../assets/vodaphone.png'
import img4 from '../assets/tesla.png'
import img5 from '../assets/talkit.png'

const images = [
    { src: img1, alt: 'AMD' },
    { src: img2, alt: 'Intel' },
    { src: img3, alt: 'Vodafone' },
    { src: img4, alt: 'Tesla' },
    { src: img5, alt: 'Talkit' },
]

const Carasoule = () => {
    return (
        <div className='carasoule-container'>
            <p className='carasoule-title'>Companies we helped grow</p>

            <div className='carasoule-track-wrapper'>
                {/* Left fade */}
                <div className='carasoule-fade carasoule-fade-left' />

                <div className='carasoule-track'>
                    {/* Original set */}
                    {images.map((img, i) => (
                        <div className='carasoule-item' key={`orig-${i}`}>
                            <img src={img.src} alt={img.alt} />
                        </div>
                    ))}
                    {/* Duplicated set for seamless loop */}
                    {images.map((img, i) => (
                        <div className='carasoule-item' key={`clone-${i}`}>
                            <img src={img.src} alt={img.alt} />
                        </div>
                    ))}
                </div>

                {/* Right fade */}
                <div className='carasoule-fade carasoule-fade-right' />
            </div>
        </div>
    )
}

export default Carasoule