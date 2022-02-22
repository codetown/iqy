import styles from './search.less';
import SearchBox from '@/components/searchBox';
import { useState, useEffect } from 'react';
import { getVideos } from '../services/common';
import { Empty, List } from 'antd';
import { history } from 'umi';
import { Pagination } from 'antd';
const pageSize = 20;
export default function SearchPage() {
  const [result, setResult] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const {
    location: { pathname },
  } = history;
  const toSearch = async (params) => {
    const newParams = { page_no: params?.pageNo || 1, page_size: pageSize };
    if (!params?.keywords?.trim()) {
      return null;
    }
    newParams.title = params.keywords?.trim();
    setKeywords(newParams.title);
    setPageNo(newParams.page_no);
    const searchRes = await getVideos(newParams);
    if (searchRes?.code == 200) {
      setResult(searchRes?.data);
    }
  };

  // 初始化页面
  useEffect(async () => {
    const {
      location: { state, query },
    } = history;
    console.info(state, query);
    toSearch({ keywords: query?.keywords?.trim() });
    // 请求后台接口，获取要播放的视频
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <>
      <div className={styles.headerBack}></div>
      <div className="content searchBody">
        <h3 className={styles.title}>搜索结果：</h3>
        {result?.items ? (
          <List
            style={{ marginBottom: 48 }}
            grid={{
              gutter: [48, 48],
              column: 4,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            key="carousel-item-1"
            dataSource={result?.items}
            renderItem={(item, index) => (
              <SearchBox
                key={`search-result-${item.id}-${index}`}
                dataSource={item}
              />
            )}
          />
        ) : (
          <Empty description="未找到任何数据" style={{ marginTop: 100 }} />
        )}
        {result?.items && (
          <Pagination
            style={{ textAlign: 'center' }}
            current={pageNo}
            total={result?.total}
            pageSize={pageSize}
            showTotal={(total) => `总共 ${total} 条记录`}
            onChange={(no, size) => {
              toSearch({ pageNo: no, pageSize: size, keywords });
            }}
          />
        )}
      </div>
    </>
  );
}
