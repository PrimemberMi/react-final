import React from 'react';
import { Input, Select, Space } from 'antd';

const { Option } = Select;

const FilterSection = ({ searchTerm, setSearchTerm, setYear, setSeason, setSortOrder, years }) => (
    <div style={{ marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Input.Search placeholder="キーワードで検索..." allowClear size="large" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ maxWidth: '350px' }} />
        <Space size="middle">
            <Select placeholder="年度" allowClear style={{ width: 110 }} onChange={setYear} size="large">
                {years.map(y => <Option key={y} value={y}>{y}</Option>)}
            </Select>
            <Select placeholder="季節" allowClear style={{ width: 110 }} onChange={setSeason} size="large">
                <Option value="WINTER">冬</Option><Option value="SPRING">春</Option><Option value="SUMMER">夏</Option><Option value="FALL">秋</Option>
            </Select>
            <Select defaultValue="POPULARITY_DESC" style={{ width: 150 }} onChange={setSortOrder} size="large">
                <Option value="POPULARITY_DESC">人気順</Option>
                <Option value="SCORE_DESC">評価順</Option>
                <Option value="START_DATE_DESC">最新順</Option>
            </Select>
        </Space>
    </div>
);

export default FilterSection;