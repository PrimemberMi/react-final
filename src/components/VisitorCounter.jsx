import React, { useState, useEffect } from 'react';

const VisitorCounter = () => {
  const [num, setNum] = useState("加载中...");

  useEffect(() => {
    fetch("/.netlify/functions/visitor")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count !== 'undefined') {
          setNum(data.count);
        }
      })
      .catch((err) => {
        console.error("err:", err);
        setNum("N/A");
      });
  }, []);

  return (
    <div style={{ 
      padding: '10px 20px', 
      background: '#fffbe6', 
      borderBottom: '1px solid #ffe58f',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
       訪問数：<span style={{ color: '#faad14', fontSize: '20px' }}>{num}</span> 人
    </div>
  );
};

export default VisitorCounter;