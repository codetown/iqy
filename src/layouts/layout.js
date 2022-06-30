import Header from './header';
import Footer from './footer';
const Layout = (props) => (
  <>
    <Header />
    <div className="wrapper">{props.children}</div>
    <Footer />
  </>
);
export default Layout;
