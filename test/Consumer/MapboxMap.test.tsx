import { render } from '@testing-library/react';
import Map from "../../src/Consumer/Building/MapboxMap"
import React from 'react';
import { vi } from 'vitest';
describe('MapboxMap', () => {

    vi.mock('mapbox-gl', () => {
        const mapboxglMock = {
            Map: vi.fn(() => ({
                addControl: vi.fn()
            })),
            Marker: vi.fn(() => ({
                setLngLat: vi.fn(() => ({
                    addTo: vi.fn()
                }))
            })),
            NavigationControl: vi.fn(),
            FullscreenControl: vi.fn(),
            addControl: vi.fn(),
        };
        return {
            __esModule: true,
            default: mapboxglMock,
            ...mapboxglMock
        };
    });
    it('renders the component', async () => {
        const { baseElement } = render(<Map lat={0} lng={0} />);
        expect(baseElement).toBeDefined();
    });
});