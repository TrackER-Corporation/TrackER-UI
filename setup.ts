import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ResizeObserver from "resize-observer-polyfill"
import 'vitest-canvas-mock'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

global.ResizeObserver = ResizeObserver

Object.defineProperty(global.SVGElement.prototype, 'getScreenCTM', {
    writable: true,
    value: vi.fn(),
});

Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
    writable: true,
    value: vi.fn().mockReturnValue({
        x: 0,
        y: 0,
    }),
});

Object.defineProperty(global.SVGElement.prototype, 'getComputedTextLength', {
    writable: true,
    value: vi.fn().mockReturnValue(0),
});

Object.defineProperty(global.SVGElement.prototype, 'createSVGMatrix', {
    writable: true,
    value: vi.fn().mockReturnValue({
        x: 10,
        y: 10,
        inverse: () => { null },
        multiply: () => { null },
    }),
});


window.URL.createObjectURL = function () {
    return "";
};
if (typeof Worker === "undefined") {
    global.Worker = class {
        addEventListener() { null }

        removeEventListener() { null }

        dispatchEvent() { return false; }

        onmessage() { null }

        onmessageerror() { null }

        onerror() { null }

        postMessage() { null }

        terminate() { null }
    };
}


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