import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/Header';
import VisitorCounter from './components/VisitorCounter';
import AniList from './components/anilist';
import MyLibrary from './components/MyLibrary';

const HomePage = () => <AniList />;
const SettingsPage = () => <div style={{ padding: '20px' }}>这是设置页面</div>;
const MyPage = () => <MyLibrary />; 

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif' }}>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my" element={<MyPage />} /> 
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <VisitorCounter />
      </div>
    </Router>
  );
}

export default App;