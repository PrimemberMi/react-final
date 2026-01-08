import React, { useState, useEffect } from 'react';
import { Input, Spin, Modal, Tag, Typography, Select, Space, Pagination, Avatar, Divider, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const ANILIST_API_URL = 'https://graphql.anilist.co';

function AniList() {
    // --- 核心狀態 ---
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // --- 篩選、排序與分頁狀態 ---
    const [year, setYear] = useState(undefined);
    const [season, setSeason] = useState(undefined);
    const [sortOrder, setSortOrder] = useState("POPULARITY_DESC"); // 默認人氣排序
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // --- Modal 狀態 ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);

    // 當篩選條件改變，重置頁碼
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, year, season, sortOrder]);

    // 監聽變化抓取數據
    useEffect(() => {
        const delayTimer = setTimeout(() => {
            fetchAniList(searchTerm, year, season, sortOrder, currentPage);
        }, 500);
        return () => clearTimeout(delayTimer);
    }, [searchTerm, year, season, sortOrder, currentPage]);

    const fetchAniList = (search, selYear, selSeason, selSort, page) => {
        setLoading(true);
        fetch(ANILIST_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query ($search: String, $year: Int, $season: MediaSeason, $sort: [MediaSort], $page: Int) {
                    Page(page: $page, perPage: 24) { 
                        pageInfo { total }
                        media(search: $search, seasonYear: $year, season: $season, type: ANIME, isAdult: false, sort: $sort) {
                            id
                            bannerImage
                            title { native, english, romaji }
                            coverImage { extraLarge, large }
                            averageScore
                            episodes
                            status
                            format
                            source
                            duration
                            genres
                            startDate { year month day }
                            endDate { year month day }
                            studios(isMain: true) { nodes { name } }
                            externalLinks { url, site }
                            characters(perPage: 6, sort: [ROLE, RELEVANCE]) {
                                edges {
                                    role
                                    voiceActors(language: JAPANESE) {
                                        name { native, full }
                                    }
                                    node { 
                                        name { native, full }
                                        image { medium } 
                                    }
                                }
                            }
                            staff(perPage: 50) {
                                edges {
                                    role
                                    node { name { native, full } }
                                }
                            }
                        }
                    }
                }`,
                variables: {
                    search: search || undefined,
                    year: selYear,
                    season: selSeason,
                    sort: [selSort, "SEARCH_MATCH"],
                    page: page
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            const pageData = data.data?.Page;
            let results = pageData?.media || [];
            if (search) {
                const s = search.toLowerCase().replace(/\s+/g, '');
                results = results.filter(anime => {
                    const native = (anime.title.native || "").toLowerCase().replace(/\s+/g, '');
                    const english = (anime.title.english || "").toLowerCase().replace(/\s+/g, '');
                    return native.includes(s) || english.includes(s);
                });
            }
            setAnimeList(results);
            setTotalItems(pageData?.pageInfo?.total || 0);
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(() => setLoading(false));
    };

    const renderStaffRows = (edges, keywords, label) => {
        const names = [...new Set(edges
            .filter(e => keywords.some(k => e.role.includes(k)))
            .map(e => e.node.name.native || e.node.name.full)
        )];
        return names.map(name => (
            <div key={name} style={{ color: '#444' }}>・{label}／{name}</div>
        ));
    };

    const years = [];
    for (let i = 2026; i >= 1970; i--) years.push(i);

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f4f7f9' }}>
            
            {/* --- 篩選控制欄 --- */}
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

            {/* --- 列表區 --- */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '30px' }}>
                        {animeList.map(anime => (
                            <div key={anime.id} onClick={() => {setSelectedAnime(anime); setIsModalOpen(true);}} style={{ cursor: 'pointer' }}>
                                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '14px', aspectRatio: '2/3', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                                    <img src={anime.coverImage.large} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    <div style={{ position: 'absolute', top: 12, right: 12 }}><Tag color="gold" style={{ fontWeight: 'bold', border: 'none', borderRadius: '6px' }}>{anime.averageScore}%</Tag></div>
                                </div>
                                <div style={{ marginTop: '14px', fontSize: '15px', fontWeight: 'bold', height: '42px', overflow: 'hidden' }}>{anime.title.native}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', paddingBottom: '40px' }}>
                        <Pagination current={currentPage} total={totalItems} pageSize={24} showSizeChanger={false} onChange={(page) => setCurrentPage(page)} />
                    </div>
                </>
            )}

            {/* --- 詳細資料 Modal --- */}
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} width={1200} centered getContainer={false} Style={{ padding: 0,borderRadius: '20px', overflow: 'hidden', backgroundColor: 'transparent' }}>
                {selectedAnime && (
                    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
                    {/* ...其餘代碼保持不變... */}
        
                        {/* 背景 Banner */}
                        <div style={{ height: '320px', width: '100%', background: `url(${selectedAnime.bannerImage || selectedAnime.coverImage.extraLarge}) center/cover no-repeat`, position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(255,255,255,1) 100%)' }} />
                        </div>

                        {/* 標題區 */}
                        <div style={{ position: 'absolute', top: '140px', left: '50px', right: '40px', zIndex: 2 }}>
                            <Title level={1} style={{ margin: 0, color: '#fff', fontSize: '32px', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{selectedAnime.title.native}</Title>
                            <div style={{ marginTop: '8px' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: '500' }}>{selectedAnime.title.english || selectedAnime.title.romaji}</Text>
                            </div>
                        </div>

                        {/* 內容對齊區 (齊平設計) */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '-100px', padding: '0 40px 40px', position: 'relative', zIndex: 3 }}>
                            
                            {/* 左側封面 (360px) */}
                            <div style={{ flex: '0 0 360px' }}>
                                <img src={selectedAnime.coverImage.extraLarge} style={{ width: '100%', borderRadius: '14px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '4px solid #fff' }} alt="" />
                                <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {selectedAnime.genres.map(g => <Tag key={g} color="blue" style={{ borderRadius: '4px', border: 'none', backgroundColor: '#e6f7ff', color: '#1890ff', margin: 0 }}>{g}</Tag>)}
                                </div>
                            </div>

                            {/* 右側資訊捲動框 */}
                            <div style={{ flex: '1 1 auto', marginLeft: '40px', height: '540px', backgroundColor: '#fdfdfd', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ overflowY: 'auto', padding: '35px', height: '100%' }}>
                                    
                                    {/* 基本 Meta 資訊 */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                                        <div><Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', letterSpacing: '1px' }}>FORMAT</Text><Text style={{ fontSize: '15px', fontWeight: '600' }}>{{ TV: 'TVアニメ', MOVIE: '劇場版', ONA: 'Web配信' }[selectedAnime.format] || selectedAnime.format}</Text></div>
                                        <div><Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', letterSpacing: '1px' }}>EPISODES</Text><Text style={{ fontSize: '15px', fontWeight: '600' }}>{selectedAnime.episodes || '-'} 話</Text></div>
                                        <div><Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', letterSpacing: '1px' }}>SEASON</Text><Text style={{ fontSize: '15px', fontWeight: '600' }}>{selectedAnime.startDate.year}年 {selectedAnime.season}</Text></div>
                                    </div>

                                    <Divider />

                                    {/* 角色 & 聲優 */}
                                    <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', marginBottom: '18px', letterSpacing: '1px' }}>CHARACTERS & CV</Text>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '30px' }}>
                                        {selectedAnime.characters.edges.map(char => (
                                            <div key={char.node.name.full} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #f0f0f0' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                                                    <Avatar src={char.node.image.medium} shape="square" size={48} />
                                                    <div style={{ overflow: 'hidden' }}><div style={{ fontSize: '13px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{char.node.name.native || char.node.name.full}</div><div style={{ fontSize: '11px', color: '#1890ff' }}>{char.role === 'MAIN' ? '主要人物' : '脇役'}</div></div>
                                                </div>
                                                <div style={{ textAlign: 'right', flex: 1, borderLeft: '1px dashed #eee', marginLeft: '12px', paddingLeft: '12px' }}>
                                                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>{char.voiceActors?.[0]?.name.native || '-'}</div><div style={{ fontSize: '10px', color: '#999' }}>CV</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Divider />

                                    {/* 製作團隊 & 公司 & 官網鏈接 */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                        <div>
                                            <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', letterSpacing: '1px', marginBottom: '10px' }}>PRODUCTION</Text>
                                            <div style={{ fontSize: '13px', lineHeight: '2' }}>
                                                {renderStaffRows(selectedAnime.staff.edges, ['Original', 'Author'], '原作')}
                                                {renderStaffRows(selectedAnime.staff.edges, ['Director'], '監督')}
                                            </div>
                                        </div>
                                        <div>
                                            <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', letterSpacing: '1px', marginBottom: '10px' }}>STUDIO</Text>
                                            <div style={{ fontSize: '13px', lineHeight: '2', marginBottom: '20px' }}>
                                                {selectedAnime.studios.nodes.map(s => <div key={s.name}>・{s.name}</div>)}
                                            </div>

                                            {/* 官網 URL 文字鏈接 */}
                                            {selectedAnime.externalLinks.find(l => l.site === 'Official Site') && (
                                                <>
                                                    <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', letterSpacing: '1px', marginBottom: '10px' }}>OFFICIAL SITE</Text>
                                                    <div style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                                        <a href={selectedAnime.externalLinks.find(l => l.site === 'Official Site').url} target="_blank" rel="noreferrer" style={{ color: '#1890ff', textDecoration: 'underline' }}>
                                                            {selectedAnime.externalLinks.find(l => l.site === 'Official Site').url}
                                                        </a>
                                                    </div>
                                                </>
                                            )}
                                            <div style={{ marginTop: '20px', textAlign: 'center', opacity: 0.4, fontSize: '10px' }}>
                                        © {selectedAnime.title.native} | Images & Data via AniList API
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AniList;