import React, { useState, useEffect } from 'react';
import { Spin, Empty, Card, Typography, Row, Col, Tag, Divider } from 'antd';

const { Title } = Typography;

const MyLibrary = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'WANT': return { color: '#ff4d4f', text: '見たい' };
            case 'WATCHING': return { color: '#1890ff', text: '視聴中' };
            case 'DONE': return { color: '#52c41a', text: '完了' };
            default: return { color: '#bfbfbf', text: '不明' };
        }
    };

    const fetchSavedAnime = async () => {
        try {
            setLoading(true);
            const res = await fetch("/.netlify/functions/anime-library");
            const savedData = await res.json();
            
            const ids = Object.keys(savedData).map(id => parseInt(id));

            if (ids.length === 0) {
                setList([]);
                return;
            }

            const aniRes = await fetch("https://graphql.anilist.co", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        query ($ids: [Int]) {
                            Page {
                                media(id_in: $ids) {
                                    id title { native }
                                    coverImage { large }
                                    averageScore
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

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>;

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <Title level={2} style={{ marginBottom: '40px', textAlign: 'center' }}>マイライブラリ</Title>

            {list.length === 0 ? (
                <Empty description="リストは空です。" />
            ) : (
                <>
                    {renderStatusSection('WATCHING', '視聴中', '#1890ff')}
                    {renderStatusSection('WANT', '見たいアニメ', '#ff4d4f')}
                    {renderStatusSection('DONE', '完了したアニメ', '#52c41a')}
                </>
            )}
        </div>
    );
};

export default MyLibrary;