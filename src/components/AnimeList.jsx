import React, { useState, useEffect } from 'react';
import { Input, Empty, Spin, Modal, Tag, Typography } from 'antd';

const { Paragraph, Title } = Typography;
const ANILIST_API_URL = 'https://graphql.anilist.co';
const BGM_SEARCH_API = 'https://api.bgm.tv/v0/search/subjects';

function LatestSeasonList() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // 彈窗與詳情狀態
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [chineseSummary, setChineseSummary] = useState("");
    const [isBgmLoading, setIsBgmLoading] = useState(false);

    // --- 1. 從 AniList 獲取列表 ---
    useEffect(() => {
        const delayTimer = setTimeout(() => {
            fetchAniList(searchTerm);
        }, 500);
        return () => clearTimeout(delayTimer);
    }, [searchTerm]);

    const fetchAniList = (search) => {
        setLoading(true);
        fetch(ANILIST_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query ($search: String, $sort: [MediaSort]) {
                    Page(page: 1, perPage: 24) {
                        media(search: $search, type: ANIME, sort: $sort,) {
                            id
                            title { native }
                            coverImage { extraLarge, large }
                            averageScore
                            description
                            genres
                            episodes
                            status
                        }
                    }
                }`,
                variables: {
                    search: search || undefined,
                    sort: search ? ["SEARCH_MATCH"] : ["POPULARITY_DESC"]
                }
            })
        })
        .then(res => res.json())
        .then(data => {
            setAnimeList(data.data?.Page?.media || []);
            setLoading(false);
        })
        .catch(err => {
            console.error('AniList 加載失敗:', err);
            setLoading(false);
        });
    };

    // --- 2. 點擊詳情：聯動 Bangumi 獲取中文簡介 ---
    const showDetail = async (anime) => {
        setSelectedAnime(anime);
        setIsModalOpen(true);
        setChineseSummary(""); 
        setIsBgmLoading(true);

        try {
            // 使用日文原名去 Bangumi 搜索，匹配度最高
            const response = await fetch(BGM_SEARCH_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    keyword: anime.title.native,
                    filter: { type: [2] },
                    pagination: { limit: 1 }
                })
            });
            const data = await response.json();
            
            if (data.data && data.data.length > 0) {
                setChineseSummary(data.data[0].summary);
            } else {
                setChineseSummary("未找到 Bangumi 中文簡介。以下為原文簡介：\n" + anime.description);
            }
        } catch (err) {
            setChineseSummary("簡介加載失敗，請參考原文：\n" + anime.description);
        } finally {
            setIsBgmLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* 搜尋欄 */}
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <Input.Search
                    placeholder="搜尋動漫（支援英文/日文/羅馬音）..."
                    allowClear
                    size="large"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '600px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                />
            </div>

            <h2 style={{ marginBottom: '20px', borderLeft: '4px solid #1890ff', paddingLeft: '10px' }}>
                {searchTerm ? `搜尋結果：${searchTerm}` : '熱門動漫'}
            </h2>

            {/* 列表渲染 */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
                    {animeList.map(anime => (
                        <div key={anime.id} onClick={() => showDetail(anime)} style={{ cursor: 'pointer' }}>
                            <div style={{ 
                                position: 'relative', overflow: 'hidden', borderRadius: '10px', aspectRatio: '2/3',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#f0f0f0'
                            }}
                            onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
                            >
                                <img src={anime.coverImage.large} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                                    <Tag color="gold">{anime.averageScore}%</Tag>
                                </div>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '14px', fontWeight: '600', height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {anime.title.english || anime.title.native}
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
                width={1000}
                getContainer={false}
                centered
                bodyStyle={{ padding: 0, borderRadius: '12px', overflow: 'hidden' }}
            >
                {selectedAnime && (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/* 左側：高清大圖 */}
                        <div style={{ flex: '0 0 40%', backgroundColor: '#000' }}>
                            <img src={selectedAnime.coverImage.extraLarge} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        </div>
                        
                        {/* 右側：文字資訊 */}
                        <div style={{ flex: '1 1 50%', padding: '40px', backgroundColor: '#fff' }}>
                            <Title level={3}>{selectedAnime.title.native}</Title>
                            <Paragraph style={{ color: '#999' }}>{selectedAnime.title.english || selectedAnime.title.romaji}</Paragraph>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <Tag color="blue">{selectedAnime.status}</Tag>
                                <Tag color="green">{selectedAnime.episodes} 集</Tag>
                                <Tag color="gold">評分: {selectedAnime.averageScore}%</Tag>
                            </div>

                            <Title level={5}>劇情簡介 (中文數據源: Bangumi)</Title>
                            <Paragraph style={{ 
                                color: '#444', 
                                height: '380px', // 較大的文本框
                                overflowY: 'auto', 
                                fontSize: '15px', 
                                lineHeight: '1.8',
                                backgroundColor: '#f9f9f9',
                                padding: '15px',
                                borderRadius: '8px',
                                whiteSpace: 'pre-wrap' // 保留換行
                            }}>
                                {isBgmLoading ? (
                                    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
                                        <Spin tip="正在獲取中文簡介..." />
                                    </div>
                                ) : (
                                    // 過濾掉簡介中的 HTML 標籤（AniList 原文可能有標籤，Bangumi 通常是純文本）
                                    <div dangerouslySetInnerHTML={{ __html: chineseSummary }} />
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