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
import { connect, ConnectedProps } from 'react-redux';
import { useEffect, useState } from 'react';


interface AppProps extends ConnectedProps<typeof connector> {
  show: any;
  logged: boolean
  type: string
}

interface MapProps {
  user: any;
  logged: boolean
  type: string
}

const App = () => {
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
      <BrowserRouter>
        <Nav key="Nav3_0" dataSource={Nav30DataSource} isMobile={isMobile} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
        <Footer key="Footer1_0" dataSource={Footer10DataSource} isMobile={isMobile} />
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state: MapProps) => {
  const { logged } = state.user;
  const { type } = state.user.user;
  return { logged, type };
};

const connector = connect(mapStateToProps);

export default connector(App);
