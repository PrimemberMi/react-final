import React, { useState, useEffect } from 'react';
import { Spin, Tag, Pagination } from 'antd';
import FilterSection from './FilterSection';
import AnimeDetailModal from './AnimeDetailModal';

const ANILIST_API_URL = 'https://graphql.anilist.co';

function AniList() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [year, setYear] = useState(undefined);
    const [season, setSeason] = useState(undefined);
    const [sortOrder, setSortOrder] = useState("POPULARITY_DESC");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [animeStatus, setAnimeStatus] = useState({});

    
    useEffect(() => { setCurrentPage(1); }, [searchTerm, year, season, sortOrder]);

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
                            id bannerImage title { native, english, romaji } coverImage { extraLarge, large }
                            averageScore episodes status format source duration genres
                            startDate { year month day } endDate { year month day }
                            studios(isMain: true) { nodes { name } }
                            externalLinks { url, site }
                            characters(perPage: 6, sort: [ROLE, RELEVANCE]) {
                                edges { role voiceActors(language: JAPANESE) { name { native, full } }
                                node { name { native, full } image { medium } } }
                            }
                            staff(perPage: 50) { edges { role node { name { native, full } } } }
                        }
                    }
                }`,
                variables: { search: search || undefined, year: selYear, season: selSeason, sort: [selSort, "SEARCH_MATCH"], page: page }
            })
        })
        .then(res => res.json())
        .then(data => {
            const pageData = data.data?.Page;
            setAnimeList(pageData?.media || []);
            setTotalItems(pageData?.pageInfo?.total || 0);
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(() => setLoading(false));
    };

    // src/components/anilist/index.jsx 里的函数

const handleStatusClick = async (animeId, status) => {
    alert("点击成功！正在发送 ID: " + animeId);
    // 1. 立即更新前端 UI (让按钮变色，给用户反馈)
    setAnimeStatus(prev => ({
        ...prev,
        [animeId]: prev[animeId] === status ? null : status
    }));

    // 2. 【核心步骤】同步到后台记录 ID
    try {
        const response = await fetch("/.netlify/functions/anime-library", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: animeId, 
                status: status 
            })
        });
        
        const result = await response.json();
        console.log("后台记忆确认:", result);
    } catch (err) {
        console.error("后台没记下这个 ID:", err);
    }
};


    const years = [];
    for (let i = 2026; i >= 1970; i--) years.push(i);

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f4f7f9' }}>
            <FilterSection 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
                setYear={setYear} setSeason={setSeason} setSortOrder={setSortOrder} years={years} 
            />

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

            <AnimeDetailModal 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                selectedAnime={selectedAnime} 
                animeStatus={animeStatus} 
                handleStatusClick={handleStatusClick}
            />
        </div>
    );
}

export default AniList;