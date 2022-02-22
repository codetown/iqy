import styles from './header.less';
import { Input } from 'antd';
import {
  FieldTimeOutlined,
  VideoCameraAddOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import userImg from '@/assets/avatar.png';
import vipImg from '@/assets/vip.png';
import { useState, useEffect } from 'react';
import { history } from 'umi';
import logoImg from '@/assets/avatar.png';
const { Search } = Input;
export default function Header() {
  const [backColor, setBackColor] = useState('rgba(255,255,255,.14)');
  const [inputValue, setInputValue] = useState('');
  const onSearch = (value) => {
    setInputValue(value);
    if (!value) return;
    const {
      location: { pathname, query },
    } = history;
    if (pathname == '/play') {
      window.open(`/search?keywords=${encodeURI(value)}`, '_blank');
      // history.push({
      //   pathname: '/search',
      //   state: { keywords: value },
      // });
    } else {
      window.open(`/search?keywords=${encodeURI(value)}`, '_self');
    }
  };

  const handelScroll = () => {
    setBackColor(
      window.scrollY > 64 ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255,255,255,.23)',
    );
  };

  useEffect(() => {
    const {
      location: { query },
    } = history;
    setInputValue(query?.keywords);
    window.addEventListener('scroll', handelScroll);
    return () => {
      window.removeEventListener('scroll', handelScroll);
    };
  }, []);
  return (
    <div className={styles.header} style={{ backgroundColor: backColor }}>
      <div className={styles.inner}>
        <a className={styles.logo} href="/">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="酷梦影视"
          />
          <span>酷梦影视</span>
        </a>
        <div className={styles.categories}>
          <a href="/">首页</a>
          <a href="/">电视剧</a>
          <a href="/">电影</a>
          <a href="/">综艺</a>
          <a href="/">动漫</a>
        </div>
        <div className={styles.searchBar}>
          <Search
            defaultValue={inputValue}
            placeholder="请输入关键字"
            allowClear
            enterButton="搜索"
            size="middle"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.value);
            }}
            onSearch={onSearch}
          />
        </div>
        <div className={styles.actions}>
          <div className={styles.vip}>
            <img src={vipImg} />
          </div>
          <FieldTimeOutlined className={styles.icon} />
          <VideoCameraAddOutlined className={styles.icon} />
          <LaptopOutlined className={styles.icon} />
          <div className={styles.avatar}>
            <img src={userImg} />
          </div>
        </div>
      </div>
    </div>
  );
}
