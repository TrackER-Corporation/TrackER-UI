import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import { getChildrenToRender } from './utils';
import { isImg } from './utils';

const Footer = (props: any) => {
  const dataSource = props.dataSource

  const childrenToRender = dataSource.block.children.map((item: any, i: number) => {
    const { title, childWrapper, ...itemProps } = item;
    return (
      <Col key={i.toString()} {...itemProps} title={null} content={null}>
        <h2 {...title}>
          {typeof title.children === 'string' &&
            title.children.match(isImg) ? (
            <img src={title.children} width="100%" alt="img" />
          ) : (
            title.children
          )}
        </h2>
        <div {...childWrapper}>{childWrapper.children.map(getChildrenToRender)}</div>
      </Col>
    );
  });

  return (
    <div {...props} {...dataSource.wrapper}>
      <OverPack {...dataSource.OverPack}>
        <QueueAnim
          type="bottom"
          key="ul"
          leaveReverse
          component={Row}
          {...dataSource.block}
        >
          {childrenToRender}
        </QueueAnim>
        <TweenOne
          animation={[
            { x: 0, y: '+=30', type: 'from', duration: 300 },
            { x: 0, y: 0 },
          ]}
          key="copyright"
          {...dataSource.copyrightWrapper}
        >
          <div {...dataSource.copyrightPage}>
            <div {...dataSource.copyright}>
              {dataSource.copyright.children}
            </div>
          </div>
        </TweenOne>
      </OverPack>
    </div>
  );
}

export default Footer;
