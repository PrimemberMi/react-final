import React, { useState, useEffect } from 'react';
import { Input, Spin, Modal, Tag, Typography } from 'antd';

const { Paragraph, Title } = Typography;

function LatestSeasonList() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // 詳情彈窗狀態
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [chineseSummary, setChineseSummary] = useState("");
    const [isBgmLoading, setIsBgmLoading] = useState(false);

    // --- 1. 從 AniList 獲取基礎數據 ---
    useEffect(() => {
        const delayTimer = setTimeout(() => fetchAniList(searchTerm), 500);
        return () => clearTimeout(delayTimer);
    }, [searchTerm]);

    const fetchAniList = (search) => {
        setLoading(true);
        fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query ($search: String) {
                    Page(page: 1, perPage: 24) {
                        media(search: $search, type: ANIME, sort: [POPULARITY_DESC]) {
                            id
                            title { native, english }
                            coverImage { large, extraLarge }
                            description
                            averageScore
                        }
                    }
                }`,
                variables: { search: search || undefined }
            })
        })
        .then(res => res.json())
        .then(data => {
            setAnimeList(data.data?.Page?.media || []);
            setLoading(false);
        });
    };

    // --- 2. 點擊詳情並抓取中文 ---
    const showDetail = async (anime) => {
        setSelectedAnime(anime);
        setIsModalOpen(true);
        setChineseSummary(""); 
        setIsBgmLoading(true);
        try {
            const res = await fetch('https://api.bgm.tv/v0/search/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    keyword: anime.title.native, 
                    filter: { type: [2] }, 
                    pagination: { limit: 1 } 
                })
            });
            const data = await res.json();
            setChineseSummary(data.data?.[0]?.summary || anime.description);
        } catch {
            setChineseSummary(anime.description);
        } finally {
            setIsBgmLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* 搜尋欄 */}
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <Input.Search
                    placeholder="搜尋動漫..."
                    size="large"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '500px' }}
                />
            </div>

            {/* 列表內容 */}
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
                    {animeList.map(anime => (
                        <div key={anime.id} onClick={() => showDetail(anime)} style={{ cursor: 'pointer' }}>
                            <div style={{ 
                                position: 'relative', overflow: 'hidden', borderRadius: '10px', aspectRatio: '2/3',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
                            >
                                <img 
                                    src={anime.coverImage.large} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} 
                                    alt="" 
                                />
                                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                                    <Tag color="gold">{anime.averageScore}%</Tag>
                                </div>
                            </div>
                            <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '14px', height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {anime.title.native}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 詳情彈窗 */}
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={850}
                centered
                getContainer={false} // 核心：移除對 body 滾動條的干擾
                bodyStyle={{ padding: 0, borderRadius: '12px', overflow: 'hidden' }}
            >
                {selectedAnime && (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ flex: '0 0 350px' }}>
                            <img src={selectedAnime.coverImage.extraLarge} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        </div>
                        <div style={{ flex: '1', padding: '30px', minWidth: '300px' }}>
                            <Title level={3}>{selectedAnime.title.native}</Title>
                            <Paragraph style={{ color: '#888' }}>{selectedAnime.title.english}</Paragraph>
                            
                            <Title level={5} style={{ marginTop: '20px' }}>劇情簡介 (中文來源: Bangumi)</Title>
                            <Paragraph style={{ 
                                height: '350px', 
                                overflowY: 'auto', 
                                background: '#f9f9f9', 
                                padding: '15px', 
                                borderRadius: '8px',
                                fontSize: '15px',
                                lineHeight: '1.8'
                            }}>
                                {isBgmLoading ? (
                                    <div style={{ textAlign: 'center', marginTop: '100px' }}><Spin tip="獲取中文中..." /></div>
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: chineseSummary || "暫無資料" }} />
                                )}
                            </Paragraph>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default LatestSeasonList;