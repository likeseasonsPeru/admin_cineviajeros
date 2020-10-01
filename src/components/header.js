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
            <NavLink active="active" to="/peliculas/">
              Peliculas
            </NavLink>
            <NavLink active="active" to="/combos">
              Combos
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
          <NavLink active="active" to="/peliculas" onClick={() => setSideBar(!sideBar)}>
            Peliculas
          </NavLink>
          <NavLink active="active" to="/combos" onClick={() => setSideBar(!sideBar)}>
            Combos
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
