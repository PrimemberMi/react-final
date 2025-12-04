import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const WebHeader = () => {
  return (
    <Header style={{ 
      color: 'white', 
      textAlign: 'center', 
      fontSize: '24px',
      background: '#001529'
    }}>
      网站标题
    </Header>
  );
};

export default WebHeader;