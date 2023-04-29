import React from 'react';
import TweenOne, { AnimObjectOrArray } from 'rc-tween-one';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';
import { BannerProps } from '../types';

const Content7: React.FC<BannerProps> = ({ dataSource, isMobile }) => {
  const getBlockChildren = React.useCallback(
    (data: any) =>
      data.map(($item: any) => {
        const { ...item } = $item;
        const { title, img, content } = item;
        ['title', 'img', 'content'].forEach((key) => delete item[key]);
        return (
          <li key={item.name} {...item}>
            <span {...img}>
              <img
                src={img.children}
                width="100%"
                alt="img"
                style={{ filter: 'flipv' }}
              />
            </span>
            <h2 {...title}>{title.children}</h2>
            <div {...content}>{content.children}</div>
          </li>
        );
      }),
    []
  );

  const ulChildren = React.useMemo(
    () => getBlockChildren(dataSource.block.children),
    [dataSource.block.children, getBlockChildren]
  );

  const queue = isMobile ? 'bottom' : 'left';

  const imgAnim: AnimObjectOrArray = React.useMemo(
    () =>
      isMobile
        ? [
          { x: 0, y: '+=30', duration: 600, type: 'from', opacity: 0 },
          { x: 0, y: 0, opacity: 1 },
        ]
        : [
          { x: '+=200', y: 0, duration: 200, type: 'from', opacity: 0 },
          { x: 0, y: 0, opacity: 1 },
        ],
    [isMobile]
  );

  return (
    <div {...dataSource.wrapper}>
      <OverPack {...dataSource.OverPack} component={Row as any}>
        <QueueAnim
          key="text"
          type={queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.textWrapper}
          component={Col as any}
        >
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <QueueAnim
            component="ul"
            key="ul"
            type={queue}
            ease="easeOutQuad"
            {...dataSource.block}
          >
            {ulChildren}
          </QueueAnim>
        </QueueAnim>
        <TweenOne
          key="img"
          animation={imgAnim}
          resetStyle
          {...dataSource.img}
          component={Col as any}
        >
          <img src={dataSource.img.children as string} width="100%" alt="img" />
        </TweenOne>
      </OverPack>
    </div>
  );
};

export default Content7;