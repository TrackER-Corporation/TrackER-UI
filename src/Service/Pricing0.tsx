import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import { getChildrenToRender } from '../Home/utils';
import { BannerProps } from '../types';
import { animTypePricing } from '../globalUtils';

const Pricing0 = ({ dataSource, ...props }: BannerProps) =>
  <div {...props} {...dataSource.wrapper}>
    <OverPack component={Row} {...dataSource.OverPack}>
      <TweenOne
        key="img"
        animation={animTypePricing.one}
        resetStyle
        {...dataSource.imgWrapper}
        component={Col}
        componentProps={{
          md: dataSource.imgWrapper.md,
          xs: dataSource.imgWrapper.xs,
        }}
      >
        <span {...dataSource.img}>
          <img src={dataSource.img.children} width="100%" alt="img" />
        </span>
      </TweenOne>
      <QueueAnim
        key="text"
        type={animTypePricing.queue}
        leaveReverse
        ease={['easeOutQuad', 'easeInQuad']}
        {...dataSource.childWrapper}
        component={Col}
        componentProps={{
          md: dataSource.childWrapper.md,
          xs: dataSource.childWrapper.xs,
        }}
      >
        {dataSource.childWrapper.children.map(getChildrenToRender)}
      </QueueAnim>
    </OverPack>
  </div>

export default Pricing0;
