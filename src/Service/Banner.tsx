import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import "./style.css"
import { getChildrenToRender } from '../Home/utils';
import { animType } from '../globalUtils';
import { BannerProps } from '../types';

const Banner = ({ dataSource, ...props }: BannerProps) =>
  <div {...props} {...dataSource.wrapper}>
    <div {...dataSource.page}>
      <QueueAnim
        key="text"
        type={animType.queue}
        leaveReverse
        ease={['easeOutQuad', 'easeInQuad']}
        {...dataSource.childWrapper}
        componentProps={{
          md: dataSource.childWrapper.md,
          xs: dataSource.childWrapper.xs,
        }}
      >
        {dataSource.childWrapper.children.map(getChildrenToRender)}
      </QueueAnim>
      <TweenOne animation={animType.one} key="title" {...dataSource.image}>
        <img src={dataSource.image.children} width="100%" alt="img" className='shadowImage' />
      </TweenOne>
    </div>
  </div>


export default Banner;