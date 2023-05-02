import { LoadingSpinnerProps, EditAccountModalProps, AccountActivity, BannerProps } from '../src/types';
import { expect, describe, it } from 'vitest'
import '@testing-library/jest-dom';
describe('Interface tests', () => {
  test('LoadingSpinnerProps should have optional message and size properties', () => {
    const loadingSpinnerProps: LoadingSpinnerProps = {
      message: 'Loading...',
    };
    expect(loadingSpinnerProps.message).toBe('Loading...');
  });

  test('EditAccountModalProps should have required visible property and optional setVisible and user properties', () => {
    const setVisible = (visible: boolean) => {};
    const user = { name: 'John Doe' };
    const editAccountModalProps: EditAccountModalProps = {
      visible: true,
      setVisible,
      user,
    };
    expect(editAccountModalProps.visible).toBe(true);
    expect(editAccountModalProps.setVisible).toBe(setVisible);
    expect(editAccountModalProps.user).toBe(user);
  });

  test('AccountActivity should have required user property', () => {
    const user = { name: 'John Doe' };
    const accountActivity: AccountActivity = {
      user,
    };
    expect(accountActivity.user).toBe(user);
  });

  test('BannerProps should have required dataSource and isMobile properties', () => {
    const dataSource = { title: 'Banner Title', description: 'Banner Description' };
    const isMobile = true;
    const bannerProps: BannerProps = {
      dataSource,
      isMobile,
    };
    expect(bannerProps.dataSource).toBe(dataSource);
    expect(bannerProps.isMobile).toBe(isMobile);
  });
});