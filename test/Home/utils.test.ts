import { expect, describe, it } from 'vitest'
import { isImg, getDelay, getChildrenToRender } from "../../src/Home/utils"
import { Button } from 'antd';

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