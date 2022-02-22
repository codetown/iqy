import styles from './hotRank.less';
import { history } from 'umi';
export default (props) => {
  const { cateName = '', dataSource = [] } = props;
  const linkClick = (e, video) => {
    e.preventDefault();
    const {
      location: { pathname },
    } = history;
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
    dataSource.length > 0 && (
      <div className={styles.hotRank}>
        <div className={styles.rankHeader}>{cateName}</div>
        {dataSource.map(
          (item, index) =>
            index < 8 && (
              <div
                className={styles.rankItem}
                key={`rank-item-${index}-${item.id}`}
              >
                {index < 3 ? (
                  <a
                    className={styles.top3}
                    onClick={(e) => linkClick(e, item)}
                  >
                    <img src={item.poster} />
                    <em>0{index + 1}</em>
                    <span>{item.title}</span>
                  </a>
                ) : (
                  <a onClick={(e) => linkClick(e, item)}>
                    <img src={item.poster} />
                    <em>0{index + 1}</em>
                    <span>{item.title}</span>
                  </a>
                )}
                <a onClick={(e) => linkClick(e, item)}>
                  <strong>{item.title}</strong>
                  <span>
                    杨洋 / 迪丽热巴 / 潘粤明 / 胡可 / 王彦霖 / 郑合惠子
                  </span>
                </a>
              </div>
            ),
        )}
      </div>
    )
  );
};
