import { render, screen } from '@testing-library/react';
import RenewableCards from "../../src/Consumer/Building//RenewableCards"
import React from 'react';


describe('RenewableCards', () => {
    const mockItem = { _id: '1' };
    const mockBills = {
        all: [
            {
                buildingId: '1',
                bills: [
                    { date: '2022-05-01', resources: [{ Solar: 100 }] },
                    { date: '2022-04-01', resources: [{ Hydro: 200 }] },
                    { date: '2022-03-01', resources: [{ Wind: 300 }] },
                    { date: '2022-02-01', resources: [{ Geo: 400 }] },
                ],
            },
        ],
    };
    const mockResources = [{ Solar: {} }, { Hydro: {} }, { Wind: {} }, { Geo: {} }];

    it('renders the component', async () => {
        render(<RenewableCards
            item={mockItem}
            bills={mockBills}
            resources={mockResources} />
        );
        const title = await screen.findByText('Total Energy Production');
        expect(title).toBeInTheDocument();
    });

    it('updates the filter state when clicking on a card', async () => {
        render(<RenewableCards item={mockItem} bills={mockBills} resources={mockResources} />);
        const solarCard = await screen.findByText('Total Solar Production');
        solarCard.click();
        const filterTitle = await screen.findByText('Solar Devices Production');
        expect(filterTitle).toBeInTheDocument();
    });
});