
import React from 'react';
import { Button } from 'antd';
import { IObject } from 'rc-queue-anim';

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
export const getChildrenToRender = (item: any, i: number) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children = typeof item.children === 'string' && item.children.match(isImg)
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

export const getDelay = (e: number, b: number) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

export const onComplete = (e: IObject, open: boolean) => {
  if (open) e.target.style.height = 'auto'
}

export const getSelectedKeys = () =>
  window.location.pathname === '/' ||
    window.location.pathname === '/Home'
    ? ['item1']
    : window.location.pathname === '/Service'
      ? ['item0']
      : ['item2']
