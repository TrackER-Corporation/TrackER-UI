import { useRef } from 'react';
import Banner5 from './Banner';
import Feature6 from './Feature6';
import Pricing0 from './Pricing0';
import Feature8 from './Feature8';
import {
  Banner50DataSource,
  Feature60DataSource,
  Pricing00DataSource,
  Feature80DataSource,
} from './data.source';
import './less/antMotionStyle.less';
import { isMobile } from 'react-device-detect';

const Service = () => {
  const domRef = useRef(null);

  const children = [
    <Banner5
      key="Banner5_0"
      data-testid="Banner5"
      dataSource={Banner50DataSource}
      isMobile={isMobile}
    />,
    <Feature6
      key="Feature6_0"
      data-testid="Feature6"
      dataSource={Feature60DataSource}
      isMobile={isMobile}
    />,
    <Pricing0
      key="Pricing0_0"
      data-testid="Pricing0"
      dataSource={Pricing00DataSource}
      isMobile={isMobile}
    />,
    <Feature8
      key="Feature8_0"
      data-testid="Feature8"
      dataSource={Feature80DataSource}
      isMobile={isMobile}
    />,
  ];

  return (
    <div className="templates-wrapper" ref={domRef}>
      {children}
    </div>
  );
};

export default Service;