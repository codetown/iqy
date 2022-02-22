import styles from './rank.less';
import { history } from 'umi';
export default function Rank(props) {
  const { cateName = '', dataSource = [], itemClick } = props;
  return (
    dataSource.length > 0 && (
      <div className={styles.rank}>
        <div className={styles.listHeader}>{cateName}</div>
        <div className={styles.listBody}>
          {dataSource.map(
            (item, index) =>
              index < 8 && (
                <a
                  key={`rank-item-${index}-${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const {
                      location: { pathname },
                      push,
                    } = history;
                    if (pathname != '/play') {
                      push({
                        pathname: '/play',
                        state: { id: item.id, cateID: item.cateID },
                      });
                    } else if (itemClick) {
                      itemClick(item, index);
                    }
                  }}
                >
                  <span className={styles.number}>{index + 1}</span>
                  <span className={styles.title}>
                    <strong>{item.title}</strong>
                    <em>{item.title}</em>
                  </span>
                  <span className={styles.status}>{item.title}</span>
                </a>
              ),
          )}
        </div>
      </div>
    )
  );
}
