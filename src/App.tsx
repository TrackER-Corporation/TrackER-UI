import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home.tsx';
import "./index.css"
import {
  Nav30DataSource,
  Footer10DataSource,
} from './Home/data.source.tsx';
import Nav from './Home/Nav.tsx';
import Footer from './Home/Footer1.tsx';
import { isMobile } from 'react-device-detect';
import 'antd/dist/reset.css';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import Service from "./Service/index.tsx";
import Login from "./Login/Login.tsx";
import DashboardRoutes from "./Consumer/DashboardRoutes.tsx";
import { RootState } from "./store.ts";


const App = ({ logged }: { logged?: boolean }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setShow(true);
      }, 100);
    }
  }, [show]);

  return (
    <div>
      {show && logged ?
        <BrowserRouter>
          <DashboardRoutes />
        </BrowserRouter>
        :
        <BrowserRouter>
          <Nav key="Nav3_0" dataSource={Nav30DataSource} isMobile={isMobile} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Service" element={<Service />} />
            <Route path="/Access" element={<Login />} />
          </Routes>
          <Footer key="Footer1_0" dataSource={Footer10DataSource} isMobile={isMobile} />
        </BrowserRouter>
      }
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const logged = state.user.logged;
  const type = state.user.user.type;
  return { logged, type };
};

const connector = connect(mapStateToProps);

const ReturnApp = connector(App)

export default ReturnApp;
