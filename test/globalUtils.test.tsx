import { render } from '@testing-library/react';
import { accountMenu, animTypePricing, dataInRange, getChildrenToRender, getChildrenToRenderComponent, getChildrenToRenderPrice, getDelay, getItem, getSelectedKeys, isImg, onComplete, onTitleClick, renderChildPrice, uploadImage } from '../src/globalUtils';
import { describe, expect, test, vi } from 'vitest';
import { Feature60DataSource, Feature80DataSource } from '../src/Service/data.source';
import '@testing-library/jest-dom';
import React from 'react';
import moment from 'moment';


describe('renderChildPrice utility function', () => {
    test('renders child components based on data source', () => {
        const carouselRef = { current: null };
        const setCurrent = vi.fn();
        const { container } = render(
            renderChildPrice(Feature80DataSource, carouselRef, 0, setCurrent)
        );
        expect(container.querySelector('.ant-carousel')).toBeInTheDocument();
        expect(container.querySelectorAll('.ant-carousel-slide')).toHaveLength(0);
        expect(container.querySelectorAll('.ant-carousel-arrow')).toHaveLength(0);
        expect(container.querySelectorAll('.ant-col')).toHaveLength(8);
        expect(container.querySelectorAll('.ant-btn')).toHaveLength(1);
        expect(container).toHaveTextContent(/Building/);
    });
});

describe('getChildrenToRenderPrice', () => {
    it('returns a component with expected props', () => {
        const carouselRef = {};
        const current = 0;
        const setCurrent = vi.fn();

        const result = getChildrenToRenderPrice(Feature60DataSource, carouselRef, current, setCurrent);

        expect(result.type).toBe('div');
        expect(result.props.children).toHaveLength(2);

        const [titleWrapper, antCarousel] = result.props.children;

        expect(titleWrapper.type).toBe('div');


        expect(antCarousel.type.displayName).toBe('Carousel');
        expect(antCarousel.props.beforeChange).toBeDefined();
        expect(antCarousel.props.infinite).toBe(false);
        expect(antCarousel.props.children).toHaveLength(2);
    });
});

describe('isImg', () => {
    it('should match valid image URLs', () => {
        expect(isImg.test('https://www.w3schools.com/w3css/img_avatar3.png')).toBe(true);
    });

    it('should not match invalid URLs', () => {
        expect(isImg.test('htps://example.com/image.png')).toBe(false);
        expect(isImg.test('https://example')).toBe(false);
    });
});

describe('getChildrenToRender', () => {
    it('should return an h1 tag for items with name starting with "title"', () => {
        const item = { name: 'title', children: 'Title Text' };
        const result = getChildrenToRender(item, 0);
        expect(result.type).toBe('h1');
        expect(result.props.children).toBe('Title Text');
    });

    it('should return an a tag for items with an href property', () => {
        const item = { name: 'link', href: 'https://example.com', children: 'Link Text' };
        const result = getChildrenToRender(item, 0);
        expect(result.type).toBe('a');
        expect(result.props.href).toBe('https://example.com');
        expect(result.props.children).toBe('Link Text');
    });

    it('should return a div tag for all other items', () => {
        const item = { name: 'text', children: 'Some Text' };
        const result = getChildrenToRender(item, 0);
        expect(result.type).toBe('div');
        expect(result.props.children).toBe('Some Text');
    });

    it('should create an img tag if the children of an item match the isImg regex', () => {
        const item = { name: 'image', children: 'https://www.w3schools.com/w3css/img_avatar3.png' };
        const result = getChildrenToRender(item, 0);
        expect(result.type).toBe('div');
    });

    it('should return the item if children of type other than string and object', () => {
        const item = { name: 'text', children: ['Some Text'] };
        const result = getChildrenToRender(item, 0);
        expect(result.type).toBe('div');
        expect(result.props.children).toEqual(['Some Text']);
    });
});

describe('getDelay', () => {
    it('should return the correct delay for even and odd numbers', () => {
        expect(getDelay(0, 2)).toBe(200);
        expect(getDelay(1, 2)).toBe(300);
        expect(getDelay(3, 4)).toBe(700);
    });
});

describe('onComplete function', () => {
    test('should set height to auto if open is true', () => {
        const e = {
            target: {
                style: {} as React.CSSProperties,
            },
        };
        onComplete(e, true);

        expect(e.target.style.height).toEqual('auto');
    });

    test('should not set height to auto if open is false', () => {
        const e = {
            target: {
                style: {} as React.CSSProperties,
            },
        };
        onComplete(e, false);

        expect(e.target.style.height).toBeUndefined();
    });
});

describe('getSelectedKeys function', () => {
    test('should return ["item1"] if pathname is / or /Home', () => {
        window.history.pushState({}, '', '/');
        expect(getSelectedKeys()).toEqual(['item1']);

        window.history.pushState({}, '', '/Home');
        expect(getSelectedKeys()).toEqual(['item1']);
    });

    test('should return ["item0"] if pathname is /Service', () => {
        window.history.pushState({}, '', '/Service');
        expect(getSelectedKeys()).toEqual(['item0']);
    });

    test('should return ["item2"] if pathname is anything else', () => {
        window.history.pushState({}, '', '/About');
        expect(getSelectedKeys()).toEqual(['item2']);

        window.history.pushState({}, '', '/Contact');
        expect(getSelectedKeys()).toEqual(['item2']);

        window.history.pushState({}, '', '/FAQ');
        expect(getSelectedKeys()).toEqual(['item2']);
    });

});

describe('getChildrenToRenderComponent', () => {
    it('returns item children without modification when no iframe is present', () => {
        const item = {
            name: 'test',
            children: 'Test children',
        };

        const result = getChildrenToRenderComponent(item);

        expect(result).toBe('Test children');
    });

    it('returns a div with an iframe when an iframe is present in item children', () => {
        const item = {
            name: 'test',
            children: '<iframe src="https://example.com"></iframe>',
        };

        const result = getChildrenToRenderComponent(item);

        expect(result.props.className).toBe('iframe-wrapper');
        expect(result.props.dangerouslySetInnerHTML.__html).toBe('<iframe src="https://example.com"></iframe>');
    });
});

describe('onTitleClick', () => {
    it('calls the goTo method on the carouselRef with the provided index', () => {
        const carouselRef = {
            current: {
                goTo: vi.fn(),
            },
        };

        onTitleClick(2, carouselRef);

        expect(carouselRef.current.goTo).toHaveBeenCalledWith(2);
    });
});

describe('animTypePricing', () => {
    it('sets the queue property to "right" on non-mobile devices', () => {
        const originalIsMobile = global.isMobile;
        global.isMobile = false;

        const result = animTypePricing;

        expect(result.queue).toBe('right');

        global.isMobile = originalIsMobile;
    });
});

describe('uploadImage function', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('uploads an image and updates the current state with the secure URL', async () => {
        const file = {
            file: new File(['image'], 'test.png'),
            onSuccess: vi.fn(),
        };
        const setCurrent = vi.fn();

        global.fetch.mockResolvedValue({
            json: vi.fn().mockResolvedValue({ secure_url: 'https://test.com/image.png' }),
        });

        await uploadImage(file, setCurrent);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.cloudinary.com/v1_1/dgfnyulqh/image/upload',
            expect.objectContaining({
                method: 'POST',
                body: expect.any(FormData),
            })
        );
        expect(setCurrent).toHaveBeenCalledWith('https://test.com/image.png');
        expect(file.onSuccess).toHaveBeenCalledWith({ secure_url: 'https://test.com/image.png' });
    });
});


describe('dataInRange function', () => {
    test('dataInRange should not push data into arrays if date is outside momentSpan', () => {
        const el = {
            date: '2022-01-01',
            electric: 100,
            gas: 50,
            water: 25
        };
        const elec = [];
        const gas = [];
        const water = [];
        const momentSpan = moment('2022-01-01');
        dataInRange(el, elec, gas, water, momentSpan);
        expect(elec).toEqual([]);
        expect(gas).toEqual([]);
        expect(water).toEqual([]);

    });

    test('dataInRange should push data into arrays if date is within momentSpan', () => {
        const el = {
            date: '2022-02-01',
            electric: 100,
            gas: 50,
            water: 25
        };
        const elec = [];
        const gas = [];
        const water = [];
        const momentSpan = moment('2022-01-01');

        dataInRange(el, elec, gas, water, momentSpan);

        expect(elec).toEqual([[moment.utc(el.date).local().format(), el.electric]]);
        expect(gas).toEqual([[moment.utc(el.date).local().format(), el.gas]]);
        expect(water).toEqual([[moment.utc(el.date).local().format(), el.water]]);
    });
})

describe('accountMenu', () => {
    it('should return menu item for changing avatar when user type is Building', () => {
        const user = {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            type: 'Building',
            password: 'oldpassword',
            _id: '123',
            token: ""
        };

        const setVisible = vi.fn();
        expect(setVisible).toHaveBeenCalledTimes(0);
        const actual = accountMenu(user, setVisible);
        actual[0].onClick();
        expect(setVisible).toHaveBeenCalledTimes(1);
        expect(setVisible).toHaveBeenCalledWith(true);
    });

    it('should return menu item for changing organization logo when user type is not Building', () => {
        const user = {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            type: 'basic',
            password: 'oldpassword',
            _id: '123',
            token: ""
        };

        const setVisible = vi.fn();
        expect(setVisible).toHaveBeenCalledTimes(0);
        const actual = accountMenu(user, setVisible);
        actual[0].onClick();
        expect(setVisible).toHaveBeenCalledTimes(1);
        expect(setVisible).toHaveBeenCalledWith(true);
    });
});

describe('getItem', () => {
    it('returns window size', () => {
        const value = getItem("test", "1", <p></p>)
        expect(value).toBe(value);
    });
});
