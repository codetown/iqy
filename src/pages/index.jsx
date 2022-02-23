import styles from './index.less';
import { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { getHomeInfo } from '../services/common';
export default function IndexPage() {
  const [homeInfo, setHomeInfo] = useState(null);
  useEffect(() => {
    getHomeInfo({}).then((res) => {
      const { code, data } = res || {};
      if (code == 200) {
        setHomeInfo(data);
      }
    });
  }, []);
  return (
    <>
        <Carousel autoplay={true} effect="fade">
          {homeInfo?.swipers?.map((item, index) => (
            <div key={`carousel-item-${item.id + 1}`}>
              <a
                className={styles.swiperItem}
              >
                <img src={item.poster} />
              </a>
            </div>
          ))}
        </Carousel>
    </>
  );
}
