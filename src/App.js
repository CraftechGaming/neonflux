import React, { useState } from 'react';
import './App.css';

const SHOWS_DATA = [
  { id: 1, title: 'Interstellar', type: 'Movie', language: 'English', category: 'Sci-Fi', rating: '8.7', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80', duration: '2h 49m' },
  { id: 2, title: 'Stranger Things', type: 'TV Show', language: 'English', category: 'Sci-Fi', rating: '8.7', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80', duration: '4 Seasons' },
  { id: 3, title: 'The Dark Knight', type: 'Movie', language: 'English', category: 'Action', rating: '9.0', image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=500&q=80', duration: '2h 32m' },
  { id: 4, title: 'Mirzapur', type: 'TV Show', language: 'Hindi', category: 'Action', rating: '8.8', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80', duration: '3 Seasons' },
  { id: 5, title: 'Anupamaa', type: 'TV Show', language: 'Hindi', category: 'Drama', rating: '7.5', image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=500&q=80', duration: 'Daily Episodes' },
  { id: 6, title: 'Jawan', type: 'Movie', language: 'Hindi', category: 'Action', rating: '8.2', image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=500&q=80', duration: '2h 49m' },
  { id: 7, title: 'Deool Band', type: 'Movie', language: 'Marathi', category: 'Drama', rating: '8.2', image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=500&q=80', duration: '2h 41m' },
  { id: 8, title: 'Premachi Goshta', type: 'TV Show', language: 'Marathi', category: 'Romance', rating: '8.0', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80', duration: 'Mon-Sat' },
  { id: 9, title: 'Duniyadari', type: 'Movie', language: 'Marathi', category: 'Drama', rating: '8.6', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80', duration: '2h 20m' }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const languages = ['All', 'English', 'Hindi', 'Marathi'];

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setIsLoggedIn(true);
      setShowAuthModal(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentProfile(null);
  };

  const filteredContent = SHOWS_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesLang = selectedLang === 'All' || item.language === selectedLang;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesLang && matchesType;
  });

  if (isLoggedIn && !currentProfile) {
    return (
      <div className="profile-selection-screen">
        <div className="profile-container">
          <h1>Who's watching?</h1>
          <div className="profile-grid">
            <div className="profile-card-user" onClick={() => setCurrentProfile('Hridhan')}>
              <div className="profile-avatar avatar-blue">H</div>
              <span>Hridhan</span>
            </div>
            <div className="profile-card-user" onClick={() => setCurrentProfile('Dad')}>
              <div className="profile-avatar avatar-green">D</div>
              <span>Dad</span>
            </div>
            <div className="profile-card-user" onClick={() => setCurrentProfile('Family')}>
              <div className="profile-avatar avatar-purple">F</div>
              <span>Family</span>
            </div>
          </div>
          <button className="manage-profile-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">NEONFLUX<span>CINEMA</span></div>
        <nav className="nav-links">
          <span className={selectedType === 'All' ? 'active-link' : ''} onClick={() => { setSelectedType('All'); setSelectedLang('All'); }}>Home</span>
          <span className={selectedType === 'TV Show' ? 'active-link' : ''} onClick={() => setSelectedType('TV Show')}>TV Shows</span>
          <span className={selectedType === 'Movie' ? 'active-link' : ''} onClick={() => setSelectedType('Movie')}>Movies</span>
        </nav>
        <input 
          type="text" 
          placeholder="Search movies, serials..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <div className="auth-nav-section">
          {isLoggedIn ? (
            <div className="user-profile-menu">
              <span className="profile-name-tag" onClick={() => setCurrentProfile(null)}>🔄 Switch ({currentProfile})</span>
              <button className="btn-auth-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="btn-auth-login" onClick={() => setShowAuthModal(true)}>Sign In</button>
          )}
        </div>
      </header>

      <section className="hero-banner">
        <div className="hero-content">
          <span className="trending-tag">🔥 TOP-RATED DRAMA</span>
          <h1>DEOOL BAND</h1>
          <p>An arrogant, atheist scientist returns to India from the US, only to find himself locked in a fascinating clash of science, spirituality, and belief.</p>
          <div className="hero-buttons">
            <button className="btn-play">▶ Watch Now</button>
            <button className="btn-info">ℹ More Info</button>
          </div>
        </div>
      </section>

      <main className="main-content">
        <div className="category-container">
          {languages.map(lang => (
            <button 
              key={lang} 
              className={`category-pill ${selectedLang === lang ? 'active' : ''}`}
              onClick={() => setSelectedLang(lang)}
            >
              {lang === 'All' ? '🌐 All Languages' : lang}
            </button>
          ))}
        </div>

        <h2 className="section-title">
          {selectedLang === 'All' ? 'Trending Content' : `${selectedLang} Content`}
          {selectedType !== 'All' ? ` (${selectedType}s)` : ''}
        </h2>
        
        <div className="movie-grid">
          {filteredContent.map(item => (
            <div key={item.id} className="movie-card">
              <div className="card-image-wrap">
                <img src={item.image} alt={item.title} />
                <span className="duration-tag">{item.duration}</span>
              </div>
              <div className="card-info">
                <h3>{item.title}</h3>
                <div className="card-meta">
                  <span className="badge-lang">{item.language}</span>
                  <span className="badge-type">{item.type}</span>
                  <span className="category">{item.category}</span>
                  <span className="rating">★ {item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showAuthModal && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <button className="close-modal" onClick={() => setShowAuthModal(false)}>✕</button>
            <h2>Sign In to NeonFlux</h2>
            <p>Access your personalized dashboard, watchlists, and profiles.</p>
            
            <button className="google-auth-btn" onClick={handleGoogleLogin}>
              Continue with Google
            </button>

            <div className="auth-divider"><span>OR</span></div>

            <form onSubmit={handlePhoneLogin} className="phone-auth-form">
              <input 
                type="tel" 
                placeholder="Enter Mobile Number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required 
              />
              <button type="submit" className="phone-submit-btn">Get OTP</button>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2026 NeonFlux Cinema. All rights reserved.</p>
      </footer>
    </div>
  );
}