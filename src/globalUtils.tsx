
import React from 'react';
import { Button, Col, Row, Carousel as AntCarousel, Menu, } from 'antd';
import QueueAnim, { IObject } from 'rc-queue-anim';
import { isMobile } from 'react-device-detect';
import TweenOne from 'rc-tween-one';
import { GetItem } from './types';
import { UploadRequestOption } from "rc-upload/lib/interface";



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


export const getChildrenToRenderComponent = (item: any) => {
    if (item.children && item.children.indexOf('iframe') !== -1) {
        return (
            <div
                className="iframe-wrapper"
                key={item.name}
                dangerouslySetInnerHTML={{ __html: item.children }}
            />
        );
    }
    return item.children;
};

export const onTitleClick = (i: any, carouselRef: any) => {
    const ref = carouselRef.current;
    ref.goTo(i);
};

export const animType = {
    queue: 'bottom',
    one: [
        { x: 0, y: "+=30", duration: 1000, type: 'from', opacity: 0, delay: 80 },
        { x: 0, y: 0, opacity: 1 },
    ]
};

export const animTypePricing = {
    queue: isMobile ? 'bottom' : 'right',
    one: isMobile
        ? {
            scaleY: '+=0.3',
            opacity: 0,
            type: 'from',
            ease: 'easeOutQuad',
        }
        : [
            { y: 0, x: "-=30", duration: 1000, type: 'from', opacity: 0, delay: 100 },
            { x: 0, y: 0, opacity: 1 },
        ]
};

export const getChildrenToRenderPrice = (dataSource: any, carouselRef: any, current: number, setCurrent: (index: number) => void) => {
    const { Carousel } = dataSource;
    const {
        titleWrapper,
        children: childWrapper,
        ...carouselProps
    } = Carousel;

    const {
        barWrapper,
        title: titleChild,
        ...titleWrapperProps
    } = titleWrapper;
    const titleToRender: Array<any> = [];

    const childrenToRender = childWrapper.map((item: any, ii: number) => {
        const { title, children, ...itemProps } = item;
        titleToRender.push(
            <div
                {...title}
                key={ii.toString()}
                onClick={() => onTitleClick(ii, carouselRef)}
                className={ii === current ? `${title.className || ''} active` : title.className}
            >
                {title.children}
            </div>
        );
        const childrenItem = children.map(($item: any) => {
            const { number, children: child, ...childProps } = $item;
            const numberChild = number.children.replace(/[^0-9.-]/g, '');
            const { unit, ...numberProps } = number;
            return (
                ii === current &&
                <Col {...childProps} >
                    <TweenOne
                        {...numberProps}
                        animation={{
                            Children: {
                                value: parseFloat(numberChild),
                                floatLength:
                                    parseFloat(numberChild) -
                                        Math.floor(parseFloat(numberChild)) >
                                        0
                                        ? 2
                                        : 0,
                                formatMoney: true,
                            },
                            duration: 1000,
                            delay: 300,
                            ease: 'easeInOutCirc',
                        }}
                        component="span"
                    >
                        0
                    </TweenOne>
                    {unit && <span {...unit}>{unit.children}</span>}
                    <p {...child}>{child.children}</p>
                </Col>
            );
        });
        return (
            <div key={ii.toString()}>
                <QueueAnim type="bottom" component={Row} {...itemProps}>
                    {childrenItem}
                </QueueAnim>
            </div>
        );
    });

    const width = 100 / childrenToRender.length;
    return (
        <div>
            <div {...titleWrapperProps} key="title">
                <div {...titleChild}>
                    {titleToRender}
                    <div
                        {...barWrapper}
                        style={{
                            width: `${width}%`,
                            left: `${width * current}%`,
                        }}
                    >
                        <em {...barWrapper.children} />
                    </div>
                </div>
            </div>
            <AntCarousel
                ref={carouselRef}
                key="carousel"
                {...carouselProps}
                infinite={false}
                beforeChange={(_, index) => setCurrent(index)}
            >
                {childrenToRender}
            </AntCarousel>
        </div>
    );
};

export const renderChildPrice = (dataSource: any, carouselRef: any, current: number, setCurrent: (index: number) => void) => {
    const { Carousel, childWrapper: buttonWrapper } = dataSource;
    const { children: carouselChild, ...carouselProps } = Carousel;
    const {
        titleWrapper,
        children: childWrapper,
    } = carouselChild;

    const titleToRender = childWrapper.length > 1 && (
        <div {...titleWrapper.title}>
            {childWrapper.map((item: any, ii: number) => (
                <div
                    {...item.title}
                    key={item.id}
                    onClick={() => onTitleClick(ii, carouselRef)}
                    className={
                        ii === current
                            ? `${item.title.className || ''} active`
                            : item.title.className
                    }
                >
                    {item.title.children}
                </div>
            ))}
        </div>
    );

    const childrenToRender = childWrapper.map((item: any) => (
        <div key={item.id}>
            <QueueAnim
                component={Row}
                type="bottom"
                componentProps={{ type: 'flex' }}
                {...item}
            >
                {item.children.map(($item: any) => {
                    const { children: colChild, arrow, ...colProps } = $item;
                    const { ...childProps } = colChild;
                    return (
                        <Col {...colProps} key={$item.id}>
                            <div {...childProps}>
                                {colChild.children.map(getChildrenToRender)}
                            </div>
                            {arrow && (
                                <div {...arrow}>
                                    <img src={arrow.children} alt="img" />
                                </div>
                            )}
                        </Col>
                    );
                })}
            </QueueAnim>
        </div>
    ));

    const buttonToRender = (
        <div key="button" {...buttonWrapper}>
            {buttonWrapper.children.map(getChildrenToRender)}
        </div>
    );

    return (
        <>
            {titleToRender}
            <AntCarousel
                ref={carouselRef}
                autoplay
                infinite={false}
                beforeChange={(_, newIndex) => setCurrent(newIndex)}
                {...carouselProps}
            >
                {childrenToRender}
            </AntCarousel>
            {buttonToRender}
        </>
    );
};


export const getItem: (label: string, key: string, icon: JSX.Element) => GetItem = (label, key, icon) => ({
    key,
    icon,
    label,
});


async function importAll() {
    const images: { [key: string]: any } = {};
    const files = import.meta.glob('../assets/avatars/*.svg');
    for (const path in files) {
        const match = path.match(/\.\/(\w+)\.svg$/);
        if (match) {
            images[match[1]] = await files[path]();
        }
    }
    return images;
}

export const avatarImages = await importAll();

export const accountMenu = (user: any, setVisible: (arg: boolean) => void): any => (
    <Menu style={{ padding: 6, borderRadius: 10, }}
        items={[{
            key: '1',
            label: user?.type === "Building" ? "Change Avatar" : "Change Organization Logo",
            onClick: () => { setVisible(true) }
        }]}
    />)

export const uploadImage = async (file: UploadRequestOption, setCurrent: (arg: any) => void) => {
    const data = new FormData();
    data.append("file", file.file);
    data.append("upload_preset", "lazkktrh");
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/dgfnyulqh/image/upload`,
        {
            method: "POST",
            body: data,
        }
    );
    const img = await res.json();
    if (img) {
        file.onSuccess && file.onSuccess(img);
        setCurrent(img.secure_url)
    }
    else {
        file.onError && file.onError(img);
    }
}

