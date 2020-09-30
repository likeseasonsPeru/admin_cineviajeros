import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [scroll, setScroll] = React.useState(false)
  const [sideBar, setSideBar] = React.useState(false)

  React.useEffect(() => {
    document.addEventListener("scroll", () => {
      setScroll(window.scrollY > 30);
    })
  })

  return (
    <React.Fragment>
      
      <div className={ `headerEffect ${scroll ? 'activeHeaderEffect' : ''}`}>
      <header className="container">
        <div className="row">
          <nav className="col-4 col-md-8 col-lg-6">
            <NavLink active="active" to="/entradas/1">
              Compra tus entradas
            </NavLink>
            <NavLink active="active" to="/combos/1">
              Tus combos
            </NavLink>
            <NavLink active="active" to="/promociones">
              Promociones
            </NavLink>
          </nav>
        </div>
      </header>
      <div className={`sideBarMobile ${!sideBar ? 'sideBarMobileEffect' : ''}`} onClick={() => setSideBar(!sideBar)}> 
        <div className="containerNavHeaderMobile">
        <nav className="col-12">
          <NavLink active="active" to="/entradas/1" onClick={() => setSideBar(!sideBar)}>
            Compra tus entradas
          </NavLink>
          <NavLink active="active" to="/combos/1" onClick={() => setSideBar(!sideBar)}>
            Tus combos
          </NavLink>
          <NavLink active="active" to="/promociones" onClick={() => setSideBar(!sideBar)}>
            Promociones
          </NavLink>
          <a href="https://goo.gl/maps/U8JbFq3QuyvdggVJ9" target="_blank" rel="noopener noreferrer">
          ¿ Cómo llegar ?
          </a>
        </nav>
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
