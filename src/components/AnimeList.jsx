import React, { useState, useEffect } from 'react';
import { Input, Space } from 'antd'; // 使用 Ant Design 的搜索框（可选）

const ANILIST_API_URL = 'https://graphql.anilist.co';

function LatestSeasonList() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // 新增：搜索关键词状态

    useEffect(() => {
        fetch(ANILIST_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                {
                    Page(page: 1, perPage: 20) {
                        media(
                            ${searchTerm ? `search: "${searchTerm}"` : ''}
                            type: ANIME
                        ) {
                            id
                            title {
                                native
                            }
                            description
                            season
                            coverImage { large }
                        }
                    }
                }`
            })
        })
        .then(res => res.json())
        .then(data => {
            setAnimeList(data.data?.Page?.media || []);
            setLoading(false);
        })
        .catch(err => {
            console.error('加載失敗:', err);
            setLoading(false);
        });
    }, [searchTerm]); // 依赖 searchTerm，变化时重新请求

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>加載中...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                {/* 搜索框 */}
                <Input.Search
                    placeholder="輸入動漫名稱（如：ラブライブ）"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSearch={(value) => setSearchTerm(value)}
                    style={{ maxWidth: '500px' }}
                />
            </div>

            <h2>{searchTerm ? `搜索結果：${searchTerm}` : '熱門動漫'}</h2>
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '16px'
            }}>
                {animeList.map(anime => (
                    <div key={anime.id} style={{ textAlign: 'center' }}>
                        <img 
                            src={anime.coverImage.large} 
                            alt={anime.title.native || anime.title.romaji}
                            style={{ 
                                width: '100%', 
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                        <div style={{ 
                            marginTop: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            height: '60px',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}>
                            {anime.title.native || anime.title.romaji}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LatestSeasonList;
