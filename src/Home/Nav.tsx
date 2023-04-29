import { useState } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import { getChildrenToRender, getSelectedKeys, onComplete } from './utils';
import { IObject } from 'rc-queue-anim';
import { BannerProps } from '../types';

const { Item } = Menu;

const Nav = ({ dataSource, isMobile, ...props }: BannerProps) => {
  const [phoneOpen, setPhoneOpen] = useState(false);

  const navData = dataSource.Menu.children;

  const navChildren = navData.map((item: any) => {
    const { children, ...itemProps } = item;
    return (
      <Item key={item.name} {...itemProps}>
        <a {...children} className={`header3-item-block ${children.className}`.trim()}>
          {children.children.map(getChildrenToRender)}
        </a>
      </Item>
    );
  });

  const moment = phoneOpen === undefined ? 300 : null;

  return (
    <TweenOne
      component="header"
      animation={[
        {
          x: 0,
          y: 0,
          duration: 200,
          type: 'from',
          opacity: 0,
        },
        { x: 0, y: 0, opacity: 1 },
      ]}
      {...dataSource.wrapper}
      {...props}
    >
      <div
        {...dataSource.page}
        className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
      >
        <TweenOne
          animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
          {...dataSource.logo}
        >
          <a href={dataSource.logo.children.href}>
            <img
              width="100%"
              src={dataSource.logo.children.logo}
              alt="img"
            />
          </a>
        </TweenOne>
        {isMobile && (
          <div
            {...dataSource.mobileMenu}
            onClick={() => setPhoneOpen(!phoneOpen)}
          >
            <em />
            <em />
            <em />
          </div>
        )}
        <TweenOne
          id='animationNav'
          {...dataSource.Menu}
          animation={
            isMobile
              ? {
                x: 0,
                height: 0,
                duration: 300,
                onComplete: (e: IObject) => onComplete(e, phoneOpen),
                ease: 'easeInOutQuad',
              }
              : null
          }
          moment={moment}
          reverse={!!phoneOpen}
        >
          <Menu
            style={{ borderRadius: 20 }}
            mode={isMobile ? 'inline' : 'horizontal'}
            defaultSelectedKeys={getSelectedKeys()}
            theme="light"
          >
            {navChildren}
          </Menu>

        </TweenOne>
      </div>
    </TweenOne >
  );
};

export default Nav;