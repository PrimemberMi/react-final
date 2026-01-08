import React, { useState, useEffect } from 'react';

const VisitorCounter = () => {
  const [num, setNum] = useState("...");

  useEffect(() => {
    fetch("/.netlify/functions/visitor")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count !== 'undefined') {
          setNum(data.count);
        }
      })
      .catch((err) => {
        setNum("N/A");
      });
  }, []);

  return (
    <div style={{ 
      width: '100%',
      padding: '20px 0', 
      background: '#fffbe6', 
      borderTop: '1px solid #ffe58f',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 'auto'
    }}>
       訪問数：<span style={{ color: '#faad14', fontSize: '20px' }}>{num}</span> 人
    </div>
  );
};

export default VisitorCounter;