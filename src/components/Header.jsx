import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const SiteHeader = () => {
  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">home</Link>, 
    },
    {
      key: 'my-list',
      icon: <UnorderedListOutlined />,
      label:  <Link to="/my">Mylibrary</Link>
    },
  ];

  return (
    <Header style={{ 
      display: 'flex',
      alignItems: 'center',
      background: '#001529',
      padding: '0 20px', 
      height: '64px',    
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{ 
        color: 'white', 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginRight: '40px', 
        whiteSpace: 'nowrap' 
      }}>
        アニメガイド
      </div>
      
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{
          flex: 1,           
          minWidth: 0,
          background: 'transparent',
          borderBottom: 'none',
          display: 'flex',     
          justifyContent: 'flex-end', 
        }}
      />
    </Header>
  );
}
export default SiteHeader;