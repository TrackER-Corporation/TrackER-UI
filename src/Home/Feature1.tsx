import React from 'react';
import QueueAnim, { IQueueType } from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { BannerProps } from '../types';

const Content1: React.FC<BannerProps> = ({ dataSource, isMobile }) => {
  const animType = React.useMemo(() => {
    return {
      queue: isMobile ? 'bottom' : 'right',
      one: isMobile
        ? {
          scaleY: '+=0.3',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad',
        }
        : [
          { x: "-=30", y: 0, duration: 200, type: 'from', opacity: 0 },
          { x: 0, y: 0, opacity: 1 },
        ],
    };
  }, [isMobile]);

  return (
    <div {...dataSource.wrapper}>
      <OverPack {...dataSource.OverPack} component={Row as any}>
        <TweenOne
          key="img"
          // animation={animType.one }
          resetStyle
          {...dataSource.imgWrapper}
          component={Col}
          componentProps={{
            md: dataSource.imgWrapper.md,
            xs: dataSource.imgWrapper.xs,
          }}
        >
          <span>
            <img src={dataSource.img} width="100%" alt="img" />
          </span>
        </TweenOne>
        <QueueAnim
          data-testid="anim"
          key="text"
          type={animType.queue as IQueueType}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.textWrapper}
          component={Col as any}
          componentProps={{
            md: dataSource.textWrapper.md,
            xs: dataSource.textWrapper.xs,
          }}
        >
          <h2 key="h1" {...dataSource.title}>
            {dataSource.title.children}
          </h2>
          <div key="p" {...dataSource.content}>
            {dataSource.content.children}
          </div>
        </QueueAnim>
      </OverPack>
    </div>
  );
};

export default Content1;