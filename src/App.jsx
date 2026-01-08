import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/Header';
import VisitorCounter from './components/VisitorCounter';
import AniList from './components/anilist';

// 准备两个简单的页面组件
const HomePage = () => <AniList />;
const SettingsPage = () => <div style={{ padding: '20px' }}>这是设置页面</div>;

function App() {
  return (
    <Router> {/* 必须包裹在 Router 里面 */}
      <div style={{ fontFamily: 'sans-serif' }}>
        <SiteHeader />
     

        <Routes>
          {/* 当路径是 / 时，显示首页 */}
          <Route path="/" element={<HomePage />} />
          
          {/* 当路径是 /settings 时，显示设置页 */}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        
        <VisitorCounter />
      </div>
    </Router>
  );
}

export default App;