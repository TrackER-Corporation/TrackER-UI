import React from 'react';
import Nav from '../../src/Home/Nav';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Nav30DataSource } from "../../src/Home/data.source"

describe('Nav component', () => {

    it('renders the Nav component', () => {
        const result = render(<Nav isMobile={false} dataSource={Nav30DataSource} />);
        expect(result.container.querySelector('header')).toBeInTheDocument();
        expect(result.container.querySelector('.mobile-menu')).not.toBeInTheDocument();
    });

    it('renders the Nav component with mobile menu open', () => {
        const result = render(<Nav dataSource={Nav30DataSource} isMobile />);
        const mobileMenu = result.container.querySelector('.mobile-menu');
        if (mobileMenu) {
            fireEvent.click(mobileMenu);
            expect(result.container.querySelector('.page.open')).toBeInTheDocument();
        }
    });

    it('renders the Nav component with default selected keys', () => {
        const result = render(<Nav dataSource={Nav30DataSource} isMobile={true} />);
        const menuComponent = result.container.querySelector('.ant-menu');
        expect(menuComponent).toBeInTheDocument();
        const menuItems = result.container.querySelectorAll('.ant-menu-item');
        expect(menuItems).toHaveLength(3);
        expect(menuItems[0].textContent).toEqual('Home');
        expect(menuItems[1].textContent).toEqual('Service');
        const tweenOneComponent = document.getElementById('animationNav');
        expect(tweenOneComponent).toBeInTheDocument();
        vi.useFakeTimers();
        tweenOneComponent && fireEvent.animationEnd(tweenOneComponent);
        vi.runAllTimers();
        tweenOneComponent && expect(tweenOneComponent.style.height).toEqual('0px');
    });

    it('calls the onComplete function when a menu item is clicked', () => {
        const onComplete = vi.fn();
        const result = render(<Nav dataSource={Nav30DataSource} isMobile={true} />);
        const menuItem = result.container.querySelector('.ant-menu-item');
        menuItem && fireEvent.click(menuItem);
        expect(onComplete).toHaveBeenCalledTimes(0);
    });
});