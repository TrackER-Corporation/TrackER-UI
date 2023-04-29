import React from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { isImg } from './utils';
import { Link } from 'react-router-dom';
import { BannerProps } from '../types';


const Banner: React.FC<BannerProps> = ({ dataSource }: BannerProps) => {
  return (
    <div {...dataSource.wrapper}>
      <QueueAnim
        key="QueueAnim"
        type={['bottom', 'top']}
        delay={200}
        {...dataSource.textWrapper}
      >
        <div key="title" {...dataSource.title}>
          {typeof dataSource.title.children === 'string' &&
            dataSource.title.children.match(isImg) ? (
            <img src={dataSource.title.children} width="100%" alt="img" />
          ) : (
            dataSource.title.children
          )}
        </div>
        <div key="content" {...dataSource.content}>
          {dataSource.content.children}
        </div>
        <Link to={"/Service"}>
          <Button ghost key="button" {...dataSource.button}>
            {dataSource.button.children}
          </Button>
        </Link>
      </QueueAnim>
      <TweenOne
        animation={{
          y: "-=20",
          yoyo: true,
          repeat: -1,
          duration: 1000,
        }}
        className="banner0-icon"
        key="icon"
      >
        <DownOutlined />
      </TweenOne>
    </div>
  );
};

export default Banner;