import { useEffect, useState } from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { getChildrenToRender } from './utils';
import { BannerProps } from '../types';

const Content11: React.FC<BannerProps> = ({ dataSource, ...props }) => {

  const [dataSource1, setDataSource] = useState(dataSource);

  useEffect(() => {
    setDataSource(dataSource);
  }, [dataSource]);

  return (
    <OverPack {...props} {...dataSource1.OverPack}>
      <QueueAnim
        type="bottom"
        leaveReverse
        key="page"
        delay={[0, 100]}
        {...dataSource1.titleWrapper}
      >
        {dataSource1.titleWrapper.children.map(getChildrenToRender)}
      </QueueAnim>
      <TweenOne
        key="button"
        style={{ textAlign: 'center' }}
        {...dataSource1.button}
        animation={
          [
            { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0 },
            { x: 0, y: 0, opacity: 1 },
          ]
        }
      >
        <Button {...dataSource1.button.children.a}>
          {dataSource1.button.children.a.children}
        </Button>
      </TweenOne>
    </OverPack>
  );
};

export default Content11;