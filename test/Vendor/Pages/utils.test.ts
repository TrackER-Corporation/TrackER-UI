import { electricOptions, geoOptions, windOptions, waterOptions, columns, options, } from "../../../src/Vendor/Pages/utils"
import { expect, describe, it, vi } from 'vitest'
import '@testing-library/jest-dom';

describe('utils', () => {

    it('length of electric', () => {
        expect(electricOptions.length).toBe(2)
    });

    it('length of geo', () => {
        expect(geoOptions.length).toBe(3)
    });

    it('length of wind', () => {
        expect(windOptions.length).toBe(2)
    });

    it('length of water', () => {
        expect(waterOptions.length).toBe(3)
    });

    it('get columns', () => {
        const setVisible = vi.fn()
        const setBuilding = vi.fn()
        expect(columns(setVisible, setBuilding)).not.toBe(null)
    });

    it('get options', () => {
        expect(options(["A", "B"], true, ["¥","$"])).not.toBe(null)
        expect(options(["A", "B"], false, ["¥","$"])).not.toBe(null)
    });
});
