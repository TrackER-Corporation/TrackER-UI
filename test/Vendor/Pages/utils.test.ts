import { electricOptions, geoOptions, windOptions, waterOptions, } from "../../../src/Vendor/Pages/utils"
import { expect, describe, it, vi } from 'vitest'
import '@testing-library/jest-dom';

describe('utilis', () => {

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

});
