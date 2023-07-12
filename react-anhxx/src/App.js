import React from 'react';
import './assets/css/reset.css';
import './assets/css/common.css';
import './assets/css/modern.css';
import './assets/css/motion.css';
import './assets/css/style.css';

import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import Guide from './components/GuideLine';
import Wrapper from './components/Wrapper';
import Modern from './components/ui/SettingModern';

/* index.js -> import Join, function call */
function App() {
  return (
    <>
      <Header iName="nav-chk" cName="header"/>
      <SideNav />
      <Wrapper cName="page-wrapper">
        <Modern cName="modern-wrapper"/>
      </Wrapper>
      <Footer cName="footer"/>
      <Guide />
    </>
  );
}

export default App;
