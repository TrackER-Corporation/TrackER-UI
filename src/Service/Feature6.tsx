import { useState, useRef } from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { CarouselRef } from 'antd/es/carousel';
import { BannerProps } from '../types';
import { getChildrenToRenderPrice } from '../globalUtils';

TweenOne.plugins.push(Children);

const Feature6 = ({ dataSource, ...props }: BannerProps) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div {...props} {...dataSource.wrapper}>
      <div>
        <OverPack {...dataSource.OverPack}>
          {getChildrenToRenderPrice(dataSource, carouselRef, current, setCurrent)}
        </OverPack>
      </div>
    </div>
  );
};

export default Feature6;