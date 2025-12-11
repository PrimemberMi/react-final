import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { HomeOutlined, UnorderedListOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

const SiteHeader = () => {
  // 主菜单项数据
  const mainMenuItems = [
    {
      key: 'home',
      label: (
        <a href="/home">
          <Space>
            <HomeOutlined />
            home
          </Space>
        </a>
      ),
    },
    {
      key: 'anime-list',
      label: (
        <Dropdown
          menu={{
            items: [
              {
                key: '2025',
                label: <span>2025</span>,
              },
              {
                key: '2025',
                label: <span>最新连载</span>,
              },
              {
                key: 'classic',
                label: <span>经典老番</span>,
              }
            ]
          }}
          trigger={['hover']}
        >
          <Space>
            <UnorderedListOutlined />
            年度
            <DownOutlined style={{ fontSize: 12 }} />
          </Space>
        </Dropdown>
      ),
    },
    {
      key: 'settings',
      label: (
        <a href="/settings">
          <Space>
            <SettingOutlined />
            設定
          </Space>
        </a>
      ),
    },
  ];

  return (
    <Header style={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white', 
      fontSize: '24px',
      background: '#001529',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      height: '64px',
      lineHeight: '64px',
    }}>
      {/* 网站标题 */}
      <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        アニメガイドサイト
      </span>
      
      {/* 导航区域 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* 主导航菜单 */}
        <Menu
          theme="dark"
          mode="horizontal"
          items={mainMenuItems}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'transparent',
            borderBottom: 'none',
            fontSize: '16px',
          }}
        />
      </div>
    </Header>
  );
};

export default SiteHeader;
