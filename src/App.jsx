import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/Header';
import VisitorCounter from './components/VisitorCounter';
import AniList from './components/anilist';
import MyLibrary from './components/MyLibrary';

const HomePage = () => <AniList />;
const MyPage = () => <MyLibrary />;

function App() {
  return (
    <Router>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        fontFamily: 'sans-serif' 
      }}>
        <SiteHeader />
        
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my" element={<MyPage />} />
          </Routes>
        </div>

        <VisitorCounter />
      </div>
    </Router>
  );
}

export default App;