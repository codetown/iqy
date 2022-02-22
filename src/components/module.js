import styles from './module.less';
import { Carousel, List } from 'antd';
import { useRef, useState } from 'react';
import { history } from 'umi';
const cdt8 =
  window.innerWidth >= 1600 ||
  (window.innerWidth >= 480 && window.innerWidth < 576) ||
  (window.innerWidth >= 768 && window.innerWidth < 976);
export default function Module(props) {
  const carouselRef = useRef();
  const [handleState, setHandleState] = useState({
    prevDisabled: true,
    currentIndex: 0,
    nextDisabled: false,
  });
  const { dataSource = [] } = props;
  const {
    pageSize = cdt8 ? 8 : 6,
    column = 6,
    xs = 2,
    sm = 3,
    md = 4,
    lg = 6,
    xl = 6,
    xxl = 8,
  } = props;
  const pageCount = Math.ceil(dataSource.length / pageSize);
  const pageArray = new Array(pageCount);
  dataSource.forEach((video, index) => {
    const pageIndex = Math.floor(index / pageSize);
    if (!pageArray[pageIndex]) {
      pageArray[pageIndex] = [video];
    } else {
      pageArray[pageIndex].push(video);
    }
  });
  const onChange = (index) => {
    setHandleState({
      prevDisabled: index === 0,
      currentIndex: index,
      nextDisabled: index === pageCount - 1,
    });
  };
  const slide = (e, direction = 1) => {
    e.preventDefault();
    const { currentSlide } = carouselRef.current.innerSlider.state;

    if (direction === 1 && currentSlide < pageCount - 1) {
      carouselRef.current.next();
    }
    if (direction === 0 && currentSlide > 0) {
      carouselRef.current.prev();
    }
  };
  const linkClick = (e, video) => {
    e.preventDefault();
    const {
      location: { pathname },
    } = history;
    console.info('module=>line:47=>path=>', pathname);
    if (pathname != '/play') {
      history.push({
        pathname: '/play',
        state: { id: video.id, cateID: video.cateID },
      });
    } else {
      props?.itemClick(video);
    }
  };
  return (
    <div className={styles.module}>
      <div className={styles.titleBar}>
        <h3>{props.title}</h3>
        {pageArray && pageArray?.length > 1 && (
          <div className={styles.indicator}>
            <a
              onClick={(e) => {
                slide(e, 0);
              }}
              style={{ opacity: handleState.prevDisabled ? 0.2 : 1 }}
            >
              <svg
                className="svg_icon svg_icon_prev"
                viewBox="0 0 6 10"
                width="6"
                height="10"
              >
                <path
                  d="M1.4 4.7L5 1M1.3 5.3L5 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                ></path>
              </svg>
            </a>
            <span>
              {handleState.currentIndex + 1}&#47;{pageCount || 0}
            </span>
            <a
              onClick={(e) => {
                slide(e, 1);
              }}
              style={{ opacity: handleState.nextDisabled ? 0.2 : 1 }}
            >
              <svg
                className="svg_icon svg_icon_next"
                viewBox="0 0 6 10"
                width="6"
                height="10"
              >
                <path
                  d="M4.6 4.7L1 1M4.7 5.3L1 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                ></path>
              </svg>
            </a>
          </div>
        )}
      </div>

      {pageArray && pageArray?.length > 1 && (
        <Carousel afterChange={onChange} ref={carouselRef} dots={false}>
          {pageArray.map((page, pageIndex) => (
            <List
              grid={{
                gutter: [16, 24],
                column,
                xs,
                sm,
                md,
                lg,
                xl,
                xxl,
              }}
              className={styles.moduleBody}
              key={`carousel-item-${pageIndex}`}
              dataSource={page}
              renderItem={(video) => (
                <List.Item
                  className={styles.video}
                  key={`preview-video-${pageIndex}-${video.id}`}
                >
                  <a
                    className={styles.imgContainer}
                    style={{
                      paddingTop: `${(1 / (props.ratio || 1 / 1.28)) * 100}%`,
                    }}
                    onClick={(e) => linkClick(e, video)}
                  >
                    <img src={video.poster} />
                  </a>
                  <a
                    className={styles.txtContainer}
                    onClick={(e) => linkClick(e, video)}
                  >
                    {video?.slogan ? (
                      <>
                        <strong>{video?.title}</strong>
                        <span className={styles.shortTitle}>
                          {video?.slogan}
                        </span>
                      </>
                    ) : (
                      <span className={styles.longTitle}>{video?.title}</span>
                    )}
                  </a>
                </List.Item>
              )}
            />
          ))}
        </Carousel>
      )}
      {pageArray && pageArray?.length == 1 && (
        <List
          grid={{
            gutter: [16, 24],
            column,
            xs,
            sm,
            md,
            lg,
            xl,
            xxl,
          }}
          className={styles.moduleBody}
          key="carousel-item-1"
          dataSource={pageArray[0]}
          renderItem={(video) => (
            <List.Item className={styles.video} key={`video-${video.id}`}>
              <a
                className={styles.imgContainer}
                style={{
                  paddingTop: `${(1 / (props.ratio || 1 / 1.28)) * 100}%`,
                }}
                onClick={(e) => linkClick(e, video)}
              >
                <img src={video.poster} />
              </a>
              <a
                className={styles.txtContainer}
                onClick={(e) => linkClick(e, video)}
              >
                {video?.slogan ? (
                  <>
                    <strong>{video?.title}</strong>
                    <span className={styles.shortTitle}>{video?.slogan}</span>
                  </>
                ) : (
                  <span className={styles.longTitle}>
                    {video?.title}
                    {video?.title}
                    {video?.title}
                    {video?.title}
                  </span>
                )}
              </a>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
