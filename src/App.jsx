import React, { useState } from 'react';
import { Layout } from 'antd';
import WebHeader from './components/Header';
import AniList from './components/AnimeList';

const { Content } = Layout;

function App() {
  const onClick = e => {
    console.log('click ', e);
  };

  return (
    <div>
      <WebHeader />
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <AniList /> {/* 這裡就是調用 AniList API 的元件 */}
      </div>
    </div>
  );
}

export default App;
