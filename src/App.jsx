import React from 'react';
import WebHeader from './components/Header';
import AniList from './components/AnimeList';
import VisitorCounter from './components/VisitorCounter'; // 1. 引入新组件

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <WebHeader />
      <div style={{ padding: '20px' }}>
        <AniList />
        <VisitorCounter />
      </div>
    </div>
  );
}

export default App;