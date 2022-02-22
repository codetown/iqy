import styles from './play.less';
import Module from '@/components/module';
import HotRank from '@/components/hotRank';
import { useState, useEffect } from 'react';
import { getVideoDetail } from '@/services/common';
import { Row, Col, message } from 'antd';
import { history } from 'umi';
import DPlayer from 'dplayer';
import Hls from 'hls.js';
export default function IndexPage() {
  const [videoInfo, setVideoInfo] = useState(null);
  const [player, setPlayer] = useState(null);
  const [episodeNo, setEposodeNo] = useState(1);
  const {
    location: { state },
  } = history;
  const getVideoParams = (url) => {
    const vd = {
      url,
      type: 'auto',
    };
    const rule = /.m3u8/i;
    if (rule.test(url)) {
      vd.type = 'customHls';
      vd.customType = {
        customHls: function (video, player) {
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
          player.events.on('destroy', () => {
            hls.destroy();
          });
        },
      };
    }
    return vd;
  };

  const toPlay = (e) => {
    e.preventDefault();
    const newNo = e.target?.text?.trim() || 1;
    setEposodeNo(newNo);
    if (videoInfo && player) {
      player.switchVideo(
        getVideoParams(videoInfo?.vfiles?.[newNo - 1]?.fileURL),
      );
      player.seek(0);
      player.play();
      const episodeKey = `videoId-${videoInfo?.id}-episodeNo`;
      sessionStorage.setItem(episodeKey, newNo);
    }
  };

  const init = async (video) => {
    const detialRes = await getVideoDetail({ id: video?.id || 1 });
    if (detialRes?.code && detialRes.code === 200) {
      document.title = `播放 - ${detialRes?.data?.title}`;
      setVideoInfo(detialRes?.data);
      const episodeKey = `videoId-${detialRes?.data?.id}-episodeNo`;
      let cacheNo = Number(sessionStorage.getItem(episodeKey) || '1');
      if (cacheNo <= 1) {
        cacheNo = 1;
      }
      setEposodeNo(cacheNo);
      const videoUrl = detialRes?.data?.vfiles?.[cacheNo - 1]?.fileURL;
      if (videoUrl) {
        if (player) {
          player.switchVideo(getVideoParams(videoUrl));
          player.seek(0);
          player.play();
          const episodeKey = `videoId-${detialRes?.data?.id}-episodeNo`;
          sessionStorage.setItem(episodeKey, cacheNo);
        } else {
          const dp = new DPlayer({
            container: document.getElementById('myDplayer'),
            autoplay: true,
            theme: '#ff5c38',
            video: getVideoParams(videoUrl),
          });
          setPlayer(dp);
        }
      } else {
        message.error('播放地址错误！');
      }
    } else {
      message.error(detialRes?.message);
    }
  };

  // 单个视频区域点击
  const boxClick = (video) => {
    init(video);
  };
  // 初始化页面
  useEffect(() => {
    // 请求后台接口，获取要播放的视频
    init(state);
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);
  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }, [videoInfo, episodeNo]);
  return (
    <>
      <div className={styles.headerBack}>
        <Row className={styles.videoInfo}>
          <Col
            xs={24}
            sm={18}
            md={18}
            lg={18}
            xl={18}
            xxl={18}
            className={styles.recomends}
          >
            <div id="myDplayer" className={styles.myDplayer}></div>
          </Col>
          <Col xs={24} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <div className={styles.episodes}>
              <img src={videoInfo?.poster} alt={videoInfo?.title} />
              <div>
                <h3>{videoInfo?.title}</h3>
                <p>
                  {videoInfo?.vfiles?.map((epi, i) => (
                    <span key={`vdo-${videoInfo?.id}-epi-${epi?.id}-${i + 1}`}>
                      {i + 1 == episodeNo ? (
                        <strong>{i + 1}</strong>
                      ) : (
                        <a onClick={toPlay}>{i + 1}</a>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">
        <Row className={styles.recommands} gutter={[32, 32]}>
          <Col
            xs={24}
            sm={18}
            md={18}
            lg={18}
            xl={18}
            xxl={18}
            className={styles.leftPart}
          >
            <h3>
              {videoInfo?.title}
              {videoInfo?.vfiles?.length > 1 && <span>第{episodeNo}集</span>}
            </h3>
            <p>
              <strong>内容简介</strong>
              <span>
                杨洋 / 迪丽热巴 / 潘粤明 / 胡可 / 王彦霖 / 郑合惠子杨洋 /
                迪丽热巴 / 潘粤明 / 胡可 / 王彦霖 / 郑合惠子 杨洋 / 迪丽热巴 /
                潘粤明 / 胡可 / 王彦霖 / 郑合惠子 杨洋 / 迪丽热巴 / 潘粤明 /
                胡可 / 王彦霖 / 郑合惠子 杨洋 / 迪丽热巴 / 潘粤明 / 胡可 /
                王彦霖 / 郑合惠子 杨洋 / 迪丽热巴 / 潘粤明 / 胡可 / 王彦霖 /
                郑合惠子
              </span>
            </p>
            {videoInfo?.relations && (
              <Module
                dataSource={videoInfo?.relations}
                title="相关推荐"
                column={6}
                xs={2}
                sm={3}
                md={3}
                lg={4}
                xl={4}
                xxl={6}
                pageSize={12}
                itemClick={boxClick}
              />
            )}
          </Col>
          {videoInfo?.rankList && (
            <Col
              xs={24}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className={styles.rightPart}
            >
              <HotRank
                cateName="电影排行榜"
                dataSource={videoInfo?.rankList}
                itemClick={boxClick}
              />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}
