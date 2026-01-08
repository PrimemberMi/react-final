import React, { useState, useEffect } from 'react';
import { Spin, Empty, Card, Typography, Row, Col, Tag, Divider } from 'antd';
import AnimeDetailModal from './anilist/AnimeDetailModal'; // 引入你现有的弹窗组件

const { Title } = Typography;

const MyLibrary = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 控制弹窗的状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    // 这里需要同步状态，以便在弹窗内修改
    const [animeStatus, setAnimeStatus] = useState({});

    // 辅助函数：状态对应颜色和日文
    const getStatusConfig = (status) => {
        switch (status) {
            case 'WANT': return { color: '#ff4d4f', text: '見たい' };      // 想看
            case 'WATCHING': return { color: '#1890ff', text: '視聴中' };  // 在看
            case 'DONE': return { color: '#52c41a', text: '完了' };        // 已看
            default: return { color: '#bfbfbf', text: '不明' };
        }
    };

    // 获取数据的函数
    const fetchSavedAnime = async () => {
        try {
            setLoading(true);
            const res = await fetch("/.netlify/functions/anime-library");
            const savedData = await res.json();
            setAnimeStatus(savedData); // 保存原始状态映射表
            
            const ids = Object.keys(savedData).map(id => parseInt(id));

            if (ids.length === 0) {
                setList([]);
                setLoading(false);
                return;
            }

            // 调用 AniList API 获取详情 (增加更多字段以支持弹窗展示)
            const aniRes = await fetch("https://graphql.anilist.co", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        query ($ids: [Int]) {
                            Page {
                                media(id_in: $ids) {
                                    id bannerImage title { native english romaji }
                                    coverImage { extraLarge large }
                                    averageScore episodes status format source duration genres
                                    description
                                    studios(isMain: true) { nodes { name } }
                                }
                            }
                        }
                    `,
                    variables: { ids }
                })
            });

            const aniData = await aniRes.json();
            
            if (aniData.data?.Page?.media) {
                const finalData = aniData.data.Page.media.map(anime => ({
                    ...anime,
                    userStatus: savedData[anime.id]
                }));
                setList(finalData);
            }
        } catch (err) {
            console.error("データ取得失敗:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedAnime();
    }, []);

    // 处理弹窗内按钮点击 (保持和首页逻辑一致)
    const handleStatusClick = async (animeId, status) => {
        const finalStatus = animeStatus[animeId] === status ? null : status;
        
        // 更新本地 UI 状态
        setAnimeStatus(prev => ({ ...prev, [animeId]: finalStatus }));
        
        // 实时更新列表中的标识
        setList(prev => prev.map(item => 
            item.id === animeId ? { ...item, userStatus: finalStatus } : item
        ));

        // 同步到后台
        await fetch("/.netlify/functions/anime-library", {
            method: 'POST',
            body: JSON.stringify({ id: animeId, status: finalStatus })
        });
    };

    // 渲染区域函数
    const renderStatusSection = (statusType, titleText, titleColor) => {
        const filteredList = list.filter(item => item.userStatus === statusType);
        if (filteredList.length === 0) return null;

        return (
            <div style={{ marginBottom: '50px' }}>
                <Divider orientation="left" style={{ borderColor: titleColor, borderWidth: '2px' }}>
                    <Title level={3} style={{ margin: 0, color: titleColor }}>{titleText} ({filteredList.length})</Title>
                </Divider>
                <Row gutter={[24, 32]}>
                    {filteredList.map(anime => {
                        const statusConfig = getStatusConfig(anime.userStatus);
                        return (
                            <Col xs={12} sm={8} md={6} lg={4} key={anime.id}>
                                <Card
                                    hoverable
                                    onClick={() => { setSelectedAnime(anime); setIsModalOpen(true); }}
                                    cover={
                                        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
                                            <img 
                                                alt={anime.title.native} 
                                                src={anime.coverImage.large} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{ 
                                                position: 'absolute', bottom: 0, width: '100%', padding: '4px 0', 
                                                backgroundColor: statusConfig.color, color: '#fff',
                                                textAlign: 'center', fontSize: '12px', fontWeight: 'bold'
                                            }}>
                                                {statusConfig.text}
                                            </div>
                                        </div>
                                    }
                                    bodyStyle={{ padding: '12px' }}
                                >
                                    <Card.Meta 
                                        title={<div style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{anime.title.native}</div>}
                                        description={<Tag color="gold">{anime.averageScore}% Score</Tag>}
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" tip="読み込み中..." /></div>;

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <Title level={2} style={{ marginBottom: '40px', textAlign: 'center' }}>マイライブラリ</Title>

            {list.length === 0 ? (
                <Empty description="リストは空です。ホームから追加してください。" />
            ) : (
                <>
                    {renderStatusSection('WATCHING', '視聴中', '#1890ff')}
                    {renderStatusSection('WANT', '見たいアニメ', '#ff4d4f')}
                    {renderStatusSection('DONE', '完了したアニメ', '#52c41a')}
                </>
            )}

            {/* 调用详情弹窗组件 */}
            <AnimeDetailModal 
                open={isModalOpen} 
                onCancel={() => {
                    setIsModalOpen(false);
                    fetchSavedAnime(); // 弹窗关闭时刷新列表，防止用户在弹窗里修改了状态导致分类不准
                }} 
                selectedAnime={selectedAnime} 
                animeStatus={animeStatus} 
                handleStatusClick={handleStatusClick}
            />
        </div>
    );
};

export default MyLibrary;