import React from 'react';
import { Modal, Tag, Typography, Space, Avatar, Divider, Button } from 'antd';
import { HeartOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AnimeDetailModal = ({ open, onCancel, selectedAnime, animeStatus, handleStatusClick }) => {
  if (!selectedAnime) return null;

  const renderStaffRows = (edges, keywords, label) => {
    const names = [
      ...new Set(
        edges
          .filter((e) => keywords.some((k) => e.role.includes(k)))
          .map((e) => e.node.name.native || e.node.name.full)
      ),
    ];
    return names.map((name) => (
      <div key={name} style={{ color: '#444' }}>
        ・{label}／{name}
      </div>
    ));
  };

  const officialSite = selectedAnime.externalLinks?.find((l) => l.site === 'Official Site');

  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={1200} centered getContainer={false}>
      <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
        <div
          style={{
            height: '320px',
            width: '100%',
            background: `url(${selectedAnime.bannerImage || selectedAnime.coverImage.extraLarge}) center/cover no-repeat`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(255,255,255,1) 100%)',
            }}
          />
        </div>

        <div style={{ position: 'absolute', top: '140px', left: '50px', right: '40px', zIndex: 2 }}>
          <Title
            level={1}
            style={{ margin: 0, color: '#fff', fontSize: '32px', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            {selectedAnime.title.native}
          </Title>
          <div style={{ marginTop: '8px' }}>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: '500' }}>
              {selectedAnime.title.english || selectedAnime.title.romaji}
            </Text>
          </div>
        </div>

       <div style={{ position: 'absolute', top: '150px', right: '30px', zIndex: 10 }}>
          <Space>
            <Button 
              size="large" icon={<HeartOutlined />} 
              type={animeStatus[selectedAnime.id] === 'WANT' ? 'primary' : 'default'}
              danger={animeStatus[selectedAnime.id] === 'WANT'}
              onClick={() => handleStatusClick(selectedAnime.id, 'WANT')}
            >視聴予定</Button>
            <Button 
              size="large" icon={<PlayCircleOutlined />} 
              type={animeStatus[selectedAnime.id] === 'WATCHING' ? 'primary' : 'default'}
              onClick={() => handleStatusClick(selectedAnime.id, 'WATCHING')}
            >視聴中</Button>
            <Button 
              size="large" icon={<CheckCircleOutlined />} 
              type={animeStatus[selectedAnime.id] === 'DONE' ? 'primary' : 'default'}
              onClick={() => handleStatusClick(selectedAnime.id, 'DONE')}
            >視聴済み</Button>
          </Space>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '-100px', padding: '0 40px 40px', position: 'relative', zIndex: 3 }}>
          <div style={{ flex: '0 0 360px' }}>
            <img
              src={selectedAnime.coverImage.extraLarge}
              style={{
                width: '100%',
                borderRadius: '14px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '4px solid #fff',
              }}
              alt="cover"
            />
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedAnime.genres.map((g) => (
                <Tag key={g} color="blue" style={{ borderRadius: '4px', border: 'none', backgroundColor: '#e6f7ff', color: '#1890ff', margin: 0 }}>
                  {g}
                </Tag>
              ))}
            </div>
          </div>

          <div
            style={{
              flex: '1 1 auto',
              marginLeft: '40px',
              height: '540px',
              backgroundColor: '#fdfdfd',
              borderRadius: '16px',
              border: '1px solid #eee',
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ overflowY: 'auto', padding: '35px', height: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block' }}>FORMAT</Text>
                  <Text style={{ fontSize: '15px', fontWeight: '600' }}>
                    {{ TV: 'TVアニメ', MOVIE: '劇場版', ONA: 'Web配信' }[selectedAnime.format] || selectedAnime.format}
                  </Text>
                </div>
                <div>
                  <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block' }}>EPISODES</Text>
                  <Text style={{ fontSize: '15px', fontWeight: '600' }}>{selectedAnime.episodes || '-'} 話</Text>
                </div>
                <div>
                  <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block' }}>SEASON</Text>
                  <Text style={{ fontSize: '15px', fontWeight: '600' }}>
                    {selectedAnime.startDate.year}年 {selectedAnime.season}
                  </Text>
                </div>
              </div>

              <Divider />

              <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', marginBottom: '18px' }}>
                CHARACTERS & CV
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '30px' }}>
                {selectedAnime.characters.edges.map((char) => (
                  <div
                    key={char.node.name.full}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: '#fff',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #f0f0f0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <Avatar src={char.node.image.medium} shape="square" size={48} />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
                          {char.node.name.native || char.node.name.full}
                        </div>
                        <div style={{ fontSize: '11px', color: '#1890ff' }}>
                          {char.role === 'MAIN' ? '主要人物' : '脇役'}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flex: 1, borderLeft: '1px dashed #eee', marginLeft: '12px', paddingLeft: '12px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '600' }}>
                        {char.voiceActors?.[0]?.name.native || '-'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#999' }}>CV</div>
                    </div>
                  </div>
                ))}
              </div>

              <Divider />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', marginBottom: '10px' }}>
                    PRODUCTION
                  </Text>
                  <div style={{ fontSize: '13px', lineHeight: '2' }}>
                    {renderStaffRows(selectedAnime.staff.edges, ['Original', 'Author'], '原作')}
                    {renderStaffRows(selectedAnime.staff.edges, ['Director'], '監督')}
                  </div>
                </div>
                <div>
                  <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', marginBottom: '10px' }}>
                    STUDIO
                  </Text>
                  <div style={{ fontSize: '13px', lineHeight: '2' }}>
                    {selectedAnime.studios.nodes.map((s) => (
                      <div key={s.name}>・{s.name}</div>
                    ))}
                  </div>

                  {officialSite && (
                    <div style={{ marginTop: '15px' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '11px', display: 'block', marginBottom: '5px' }}>
                        OFFICIAL SITE
                      </Text>
                      <div style={{ fontSize: '13px', lineHeight: '2' }}>
                        ・<a 
                            href={officialSite.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ color: '#1890ff', textDecoration: 'underline' }}
                          >
                            {officialSite.url}
                          </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center', opacity: 0.4, fontSize: '10px' }}>
                © {selectedAnime.title.native} | Images via AniList API
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AnimeDetailModal;