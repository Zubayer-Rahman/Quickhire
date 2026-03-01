import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const LOCATIONS = [
  'Florence, Italy',
  'Remote',
  'Dhaka, Bangladesh',
  'Chittagong, Bangladesh',
  'New York, USA',
  'London, UK',
  'Berlin, Germany',
];

const SearchBar = ({ jobs = [], onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('Florence, Italy');
  const [showLocations, setShowLocations] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const locationRef = useRef(null);
  const keywordRef = useRef(null);

  // Build suggestions from jobs list as user types
  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const lower = keyword.toLowerCase();
    const matched = jobs
      .filter(
        (j) =>
          j.title.toLowerCase().includes(lower) ||
          j.company.toLowerCase().includes(lower) ||
          j.category.toLowerCase().includes(lower)
      )
      .slice(0, 5)
      .map((j) => j.title);
    setSuggestions([...new Set(matched)]);
    setShowSuggestions(matched.length > 0);
  }, [keyword, jobs]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocations(false);
      }
      if (keywordRef.current && !keywordRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = () => {
    setShowSuggestions(false);
    setShowLocations(false);
    if (onSearch) onSearch({ keyword, location });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSuggestionClick = (title) => {
    setKeyword(title);
    setShowSuggestions(false);
    if (onSearch) onSearch({ keyword: title, location });
  };

  return (
    <>
      <div className="search-wrapper">
        {/* Keyword input */}
        <div className="keyword-section-wrapper" ref={keywordRef}>
          <div className="search-section">
            {/* Search Icon */}
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="suggestions-dropdown">
              {suggestions.map((s, i) => (
                <div key={i} className="suggestion-item" onMouseDown={() => handleSuggestionClick(s)}>
                  <span className="suggestion-dot" />
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="search-divider" />

        {/* Location dropdown */}
        <div className="location-section" ref={locationRef} onClick={() => setShowLocations((v) => !v)}>
          {/* Pin Icon */}
          <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="location-select-display">{location}</span>
          {/* Chevron */}
          <svg className={`chevron-icon ${showLocations ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>

          {showLocations && (
            <div className="location-dropdown">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc}
                  className={`location-option ${loc === location ? 'selected' : ''}`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setLocation(loc);
                    setShowLocations(false);
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="search-button" onClick={handleSearch}>
          Search my job
        </button>
      </div>
    </>
  );
};

export default SearchBar;