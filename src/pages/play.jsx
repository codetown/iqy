import { useState, useEffect } from 'react';
import { getVideoDetail } from '@/services/common';
import { Row, Col, message } from 'antd';
import { history } from 'umi';
import styles from './play.less';

export default function () {
  const [videoInfo, setVideoInfo] = useState(null);
  const [episodeNo, setEposodeNo] = useState(1);
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
            <video />
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
