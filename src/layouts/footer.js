import styles from './footer.less';
export default function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.info}>
          <a href="">公司介绍</a>
          <a href="">新闻动态</a>
          <a href="">联系方式</a>
          <a href="">招聘信息</a>
          <a href="">内容合作</a>
          <a href="">广告合作</a>
          <a href="">会员合作</a>
          <a href="">技术合作</a>
          <a href="">用户协议</a>
          <a href="">隐私政策</a>
          <a href="">帮助反馈</a>
        </div>
        <div className={styles.feed}>
          <a href="">用户协议</a>
          <a href="">隐私政策</a>
          <a href="">帮助反馈</a>
        </div>
        <div className={styles.copy}>
          版权所有 Copyright&copy; CodeMorn All rights resevrved
        </div>
    </div>
  );
}
