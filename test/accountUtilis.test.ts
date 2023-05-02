import { message } from 'antd';
import { confirm, confirmPreference, updatePref, deleteAccount, setNotification, fetchActivity } from '../src/accountUtilis';
import { vi } from 'vitest';
import api from '../src/api';
import { updatePreference } from '../src/reducers/preference';
import { fetchOrganization } from '../src/reducers/organization';
import { logout } from '../src/reducers/user';

vi.mock('../src/api');

describe('confirm function', () => {
    const user = { _id: '1' };
    const organization = { _id: '2' };
    const current = 'image.png';
    const dispatch = vi.fn();
    const onClose = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('updates preference and organization and shows success message', async () => {
        api.preference.updatePreference.mockResolvedValueOnce({ avatar: current });
        api.organization.update.mockResolvedValueOnce({ icon: current });

        await confirm(user, organization, current, dispatch, onClose);

        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, { avatar: current });
        expect(api.organization.update).toHaveBeenCalledWith(organization._id, { icon: current });
        expect(dispatch).toHaveBeenNthCalledWith(1, updatePreference({ avatar: current }));
        expect(dispatch).toHaveBeenNthCalledWith(2, fetchOrganization({ icon: current }));
        expect(onClose).toHaveBeenCalled();
    });

    it('shows error message if organization update fails', async () => {
        api.preference.updatePreference.mockResolvedValueOnce({ avatar: current });
        await confirm(user, organization, current, dispatch, onClose);
        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, { avatar: current });
        expect(api.organization.update).toHaveBeenCalledWith(organization._id, { icon: current });
        expect(dispatch).toHaveBeenNthCalledWith(1, updatePreference({ avatar: current }));
        expect(dispatch).not.toHaveBeenCalledWith(fetchOrganization({ icon: current }));
        expect(onClose).toHaveBeenCalled();
    });
});

describe('confirmPreference function', () => {
    const userPreference = { avatar: 'old.png' };
    const current = 'new.png';
    const user = { _id: '1' };
    const dispatch = vi.fn();
    const onClose = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('updates preference and shows success message', async () => {
        api.preference.updatePreference.mockResolvedValueOnce({ avatar: current });

        await confirmPreference(userPreference, current, user, dispatch, onClose);

        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, { avatar: current });
        expect(dispatch).toHaveBeenCalledWith(updatePreference({ avatar: current }));
        expect(onClose).toHaveBeenCalled();
    });

    it('shows warning message if current avatar is the same as the new one', async () => {
        await confirmPreference(userPreference, userPreference.avatar, user, dispatch, onClose);

        expect(api.preference.updatePreference).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    it('shows error message if preference update fails', async () => {
        await confirmPreference(userPreference, current, user, dispatch, onClose);

        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, { avatar: current });
        expect(dispatch).not.toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });
});

describe('updatePref function', () => {
    const value = true;
    const user = { _id: '1' };
    const dispatch = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('updates preference and shows success message', async () => {
        api.preference.updatePreference.mockResolvedValueOnce({ activityLog: value });

        await updatePref(value, user, dispatch);

        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, { activityLog: value });
        expect(dispatch).toHaveBeenCalledWith(updatePreference({ activityLog: value }));
    });

    it('shows error message if preference update fails', async () => {

        await updatePref(value, user, dispatch);

        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, { activityLog: value });
        expect(dispatch).not.toHaveBeenCalled();
    });
});

describe('deleteAccount function', () => {
    const user = { _id: '1' };
    const dispatch = vi.fn();
    const setShow = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('deletes account, shows success message and logs out', async () => {
        api.user.delete.mockResolvedValueOnce(undefined);

        await deleteAccount(user, dispatch, setShow);

        expect(api.user.delete).toHaveBeenCalledWith(user._id);
        expect(setShow).toHaveBeenNthCalledWith(1, true);
    });
});

describe('setNotification function', () => {
    const data = { notifications: true };
    const user = { _id: '1' };
    const dispatch = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('updates preference and shows success message', async () => {
        api.preference.updatePreference.mockResolvedValueOnce(data);
        await setNotification(data, user, dispatch);
        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, data);
    });

    it('shows error message if preference update fails', async () => {
        api.preference.updatePreference.mockRejectedValueOnce(new Error('Preference update failed'));

        await setNotification(data, user, dispatch);

        expect(api.preference.updatePreference).toHaveBeenCalledWith(user._id, data);
        expect(dispatch).not.toHaveBeenCalled();
    });
});

describe('fetchActivity function', () => {
    const user = { _id: '1' };
    const setData = vi.fn();
    const setLoad = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('fetches activity data and sets state', async () => {
        const activityData = [{ id: 1, message: 'Activity 1' }, { id: 2, message: 'Activity 2' }];
        api.activity.fetchActivity.mockResolvedValueOnce(activityData);

        await fetchActivity(user, setData, setLoad);

        expect(api.activity.fetchActivity).toHaveBeenCalledWith(user._id);
        expect(setData).toHaveBeenCalledWith(activityData);
    });
});