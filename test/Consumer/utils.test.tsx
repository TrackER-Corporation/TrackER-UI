import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { renderRenewableInfo } from "../../src/Consumer/Organizations/utils"

describe('Renewable component', () => {

    test("renders organization title and divider when type array is not empty", () => {
        const type = [{ _id: 1, name: "Solar Panel", type: "solar", price: 100, earning: 50, organization: 20 }];
        const title = "Test";
        const load = false;
        const { getByText } = render(renderRenewableInfo(type, title, load));
        expect(getByText(`Organization ${title} Energy Resources Available Devices`)).toBeInTheDocument();
    });

    test("renders statistics for each element in type array when type array is not empty", () => {
        const type = [
            { _id: 1, name: "Solar Panel", type: "solar", price: 100, earning: 50, organization: 20 },
            { _id: 2, name: "Wind Turbine", type: "wind", price: 200, earning: 75, organization: 30 },
        ];
        const title = "Test";
        const load = false;
        const { getAllByText } = render(renderRenewableInfo(type, title, load));
        expect(getAllByText(/Test/i)).toHaveLength(1);
        expect(getAllByText("€")).toHaveLength(4);
        expect(getAllByText("%")).toHaveLength(2);
    });

    test("renders nothing when type array is empty", () => {
        const type = [];
        const title = "Test";
        const load = false;
        const { queryByText } = render(renderRenewableInfo(type, title, load));
        expect(queryByText(`Organization ${title} Energy Resources Available Devices`)).not.toBeInTheDocument();
        expect(queryByText("Name")).not.toBeInTheDocument();
    });
})