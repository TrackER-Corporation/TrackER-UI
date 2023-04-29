import { useRef, useState } from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from '../Home/utils';
import { renderChildPrice } from '../globalUtils';
import { BannerProps } from '../types';

const Feature8 = ({ dataSource, ...props }: BannerProps) => {
  const carouselRef = useRef(null);
  const [current, setCurrent] = useState(0);

  return (
    <div {...props} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div {...dataSource.titleWrapper}>
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </div>
        <OverPack {...dataSource.OverPack}>
          {renderChildPrice(dataSource, carouselRef, current, setCurrent)}
        </OverPack>
      </div>
    </div>
  );
};

export default Feature8;