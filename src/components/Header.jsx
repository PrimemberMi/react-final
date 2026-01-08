import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;

const SiteHeader = () => {
  // 定义菜单项
  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <a href="/home">home</a>,
    },
    {
      key: 'year-list',
      icon: <UnorderedListOutlined />,
      label: '年度',
  
      children: [
        { key: '2025-new', label: '2025' },
        { key: 'latest', label: '最新连载' },
        { key: 'classic', label: '经典老番' },
      ],
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <a href="/settings">設定</a>,
    },
  ];

  return (
    <Header style={{ 
      display: 'flex',
      alignItems: 'center', // 垂直居中
      background: '#001529',
      padding: '20px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      {/* 网站标题 */}
      <div style={{ 
        color: 'white', 
        fontSize: '40px', 
        fontWeight: 'bold', 
        marginRight: '0px', // 标题与菜单的间距
        whiteSpace: 'nowrap' 
      }}>
        アニメガイドサイト
      </div>
      
      {/* 导航菜单 */}
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          borderBottom: 'none', // 去掉底部白线
        }}
      />
    </Header>
  );
};

export default SiteHeader;