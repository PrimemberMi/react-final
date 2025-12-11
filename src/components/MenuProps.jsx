import React from 'react';
import { Button, Dropdown, Space } from 'antd';

const WebMenu = () => {
  const dropdownItems = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          首頁
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          動畫列表
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          設定
        </a>
      ),
    },
  ];

  return (
    <Space wrap>
      <Dropdown menu={{ dropdownItems }} placement="bottomLeft">
        <Button>左下</Button>
      </Dropdown>
      <Dropdown menu={{ dropdownItems }} placement="bottom">
        <Button>正下方</Button>
      </Dropdown>
      <Dropdown menu={{ dropdownItems }} placement="bottomRight">
        <Button>右下</Button>
      </Dropdown>
    </Space>
  );
};

export default WebMenu;
