import Banner0 from './Banner';
import Content0 from './Content0';
import Feature1 from './Feature1';
import Feature4 from './Feature4';
import Content3 from './Content3';
import Content11 from './Content11';

import {
  Banner01DataSource,
  Content00DataSource,
  Feature10DataSource,
  Feature40DataSource,
  Content110DataSource,
  Content30DataSource
} from './data.source';
import './less/antMotionStyle.less';
import { isMobile } from 'react-device-detect';
const Home = () => {
  const children = [
    <Banner0
      key="Banner0_1"
      dataSource={Banner01DataSource}
      isMobile={isMobile}
    />,
    <Content0
      key="Content0_0"
      dataSource={Content00DataSource}
      isMobile={isMobile}
    />,
    <Feature1
      key="Feature1_0"
      dataSource={Feature10DataSource}
      isMobile={isMobile}
    />,
    <Feature4
      key="Feature4_0"
      dataSource={Feature40DataSource}
      isMobile={isMobile}
    />,
    <Content3
      key="Content12_0"
      dataSource={Content30DataSource}
      isMobile={isMobile}
    />,
    <Content11
      key="Content11_0"
      dataSource={Content110DataSource}
      isMobile={isMobile}
    />,
  ];

  return (
    <div className="templates-wrapper">
      {children}
    </div>
  );
}

export default Home;