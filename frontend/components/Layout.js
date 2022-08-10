import Navbar from "./Navbar";

const Layout = ({ children, cart }) => (
  <>
    <Navbar cart={cart} />
    {children}
  </>
);

export default Layout;
