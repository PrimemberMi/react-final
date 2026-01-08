import React, { useState, useEffect } from 'react';
import WebHeader from './components/Header';
import AniList from './components/AnimeList';

function App() {
  const [num, setNum] = useState("加载中...");

  // 课件核心：组件挂载后立即请求后端
  useEffect(() => {
    fetch("/.netlify/functions/visitor")
      .then((res) => res.json())
      .then((data) => {
        // 检查 data 里面有没有 count 这个属性
        if (data && typeof data.count !== 'undefined') {
          setNum(data.count);
        }
      })
      .catch((err) => {
        console.error("前端获取失败:", err);
        setNum("N/A");
      });
  }, []);
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <WebHeader />
      
      {/* 访问统计展示区 */}
      <div style={{ 
        padding: '10px 20px', 
        background: '#fffbe6', 
        borderBottom: '1px solid #ffe58f',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        📊 累计访问量：<span style={{ color: '#faad14', fontSize: '20px' }}>{num}</span> 次
      </div>

      <div style={{ padding: '20px' }}>
        <AniList />
      </div>
    </div>
  );
}

export default App;