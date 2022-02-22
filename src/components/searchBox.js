import { Link } from 'umi';
import styles from './searchBox.less';
export default function SearchBox(props) {
  const { dataSource } = props;
  return (
    <div className={styles.searchBox}>
      <Link
        className={styles.imgContainer}
        to={{
          pathname: '/play',
          state: { id: dataSource.id, cateID: dataSource.cateID },
        }}
      >
        <img src={dataSource?.poster} />
      </Link>
      <Link
        className={styles.txtContainer}
        to={{
          pathname: '/play',
          state: { id: dataSource.id, cateID: dataSource.cateID },
        }}
      >
        {dataSource?.slogan ? (
          <>
            <strong>{dataSource?.title}</strong>
            <span>{dataSource?.slogan}</span>
          </>
        ) : (
          <span style={{ height: 44, lineHeight: '22px' }}>
            {dataSource?.title}
          </span>
        )}
      </Link>
    </div>
  );
}
