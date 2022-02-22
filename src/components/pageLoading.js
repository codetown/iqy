import { Spin } from 'antd';

export default () => {
  return (
    <div
      style={{
        height: '100%',
        verticalAlign: 'middle',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
};
