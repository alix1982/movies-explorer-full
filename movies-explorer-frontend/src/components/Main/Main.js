import HeaderMain from '../Main/HeaderMain/HeaderMain.js';
import Promo from '../Main/Promo/Promo.js';
import NavTab from '../Main/NavTab/NavTab.js';
import AboutProject from '../Main/AboutProject/AboutProject.js';
import Techs from '../Main/Techs/Techs.js';
import AboutMe from '../Main/AboutMe/AboutMe.js';
import Portfolio from '../Main/Portfolio/Portfolio.js';

function Main (props) {
  return(
    <>
      <HeaderMain/>
      <main>
        <Promo/>
        <NavTab/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/> 
      </main>
    </>
  )
}

export default Main