import React, { useEffect, useState } from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender, getDelay } from './utils';
import { BannerProps } from '../types';

const Content3: React.FC<BannerProps> = ({ dataSource, isMobile }) => {
  const [clearFloatNum, setClearFloatNum] = useState(0);

  useEffect(() => {
    setClearFloatNum(0);
  }, [dataSource]);

  const blockChildren = dataSource.block.children;
  const children = blockChildren.map((item: any, i: number) => {
    const childObj = item.children;
    const delay = isMobile ? i * 50 : getDelay(i, 24 / item.md);
    const newClearFloatNum = (clearFloatNum + item.md) % 24;

    const colClassName = !newClearFloatNum
      ? `${item.className || ''} clear-both`.trim()
      : item.className;

    return (
      <TweenOne
        component={Col}
        animation={[
          { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: delay },
          { x: 0, y: 0, opacity: 1 },
        ]}
        key={item.name}
        {...item}
        componentProps={{ md: item.md, xs: item.xs }}
        className={colClassName}
      >
        <TweenOne
          animation={[
            { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: delay },
            { x: 0, y: 0, opacity: 1 },
          ]}
          key="img"
          {...childObj.icon}
        >
          <img src={childObj.icon.children} width="100%" alt="img" />
        </TweenOne>
        <div {...childObj.textWrapper}>
          <TweenOne
            key="h2"
            animation={[
              { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: delay },
              { x: 0, y: 0, opacity: 1 },
            ]}
            component="h2"
            {...childObj.title}
          >
            {childObj.title.children}
          </TweenOne>
          <TweenOne
            key="p"
            animation={[
              { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: 400 },
              { x: 0, y: 0, opacity: 1 },
            ]}
            component="div"
            {...childObj.content}
          >
            {childObj.content.children}
          </TweenOne>
        </div>
      </TweenOne>
    );
  });

  return (
    <div {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div {...dataSource.titleWrapper}>
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </div>
        <OverPack {...dataSource.OverPack}>
          <QueueAnim key="u" type="bottom">
            <Row key="row" {...dataSource.block}>
              {children}
            </Row>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
};

export default Content3;