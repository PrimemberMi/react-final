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
      label: <Link to="/">首页</Link>, 
    },
    {
      key: 'my-list',
      icon: <UnorderedListOutlined />,
      label:  <Link to="/my">我的</Link>
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
          flex: 1,            // 占据剩余所有空间
          minWidth: 0,
          background: 'transparent',
          borderBottom: 'none',
          display: 'flex',     // 确保 Menu 内部也是 flex
          justifyContent: 'flex-end', // 核心代码：让菜单项全部靠右
        }}
      />
    </Header>
  );
}
export default SiteHeader;