import { fireEvent, render } from '@testing-library/react';
import EditBuildingModal from "../../src/Consumer/Building/EditBuildingModal"
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('EditBuildingModal', () => {

    const setContact = vi.fn()
    const setName = vi.fn()
    const setType = vi.fn()
    const updateBuilding = vi.fn()

    it('renders the component', async () => {
        const { baseElement, getByText, getByPlaceholderText } = render(
            <EditBuildingModal
                address=''
                buildingId=''
                contact='contact'
                name='name'
                setContact={setContact}
                setName={setName}
                setType={setName}
                setVisible={setType}
                type=''
                updateBuilding={updateBuilding}
                visible
            />);
        expect(baseElement).toBeDefined();
        fireEvent.click(getByText("Cancel"))
        fireEvent.click(getByText("OK"))
        fireEvent.change(getByPlaceholderText("contact"), { target: { value: 'Good Day' } })
        fireEvent.change(getByPlaceholderText("name"), { target: { value: 'Good Day' } })
    
    });
});