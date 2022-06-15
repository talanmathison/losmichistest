import {Outlet, Link} from 'react-router-dom';

const Layout = () => {
  return(
    <>
    <nav>
      <ul className="row">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categorias">Categorias</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
      </ul>
    </nav>
    
    <Outlet />
    </>
  );
}

export default Layout;