import Header from './header';
import Footer from './footer';
const Layout = (props) => (
  <>
    <div className='wrapper'>{props.children}</div>
    <Header />
    <Footer />
  </>
);
export default Layout;
