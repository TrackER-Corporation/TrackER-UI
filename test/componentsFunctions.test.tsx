import { handleLoginSubmit, handleSignUpSubmit, signInButton, signUpButton } from "../src/componentsFunctions";

describe('Authentication functions', () => {
    describe('signUpButton', () => {
        it('should call the setError and setSwapPanel functions with the correct arguments', () => {
            const setError = jest.fn();
            const setSwapPanel = jest.fn();
            signUpButton(setError, setSwapPanel);
            expect(setError).toHaveBeenCalledWith([]);
            expect(setSwapPanel).toHaveBeenCalledWith(true);
        });
    });

    describe('signInButton', () => {
        it('should call the setError and setSwapPanel functions with the correct arguments', () => {
            const setError = jest.fn();
            const setSwapPanel = jest.fn();
            signInButton(setError, setSwapPanel);
            expect(setError).toHaveBeenCalledWith([]);
            expect(setSwapPanel).toHaveBeenCalledWith(false);
        });
    });

    describe('handleLoginSubmit', () => {
        it('should call setError with an error message if email or password is null', () => {
            const setError = jest.fn();
            handleLoginSubmit("", 'password', setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
            handleLoginSubmit('email', "", setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
        });

        it('should not call setError if email and password are not null', () => {
            const setError = jest.fn();
            handleLoginSubmit('email', 'password', setError);
            expect(setError).not.toHaveBeenCalled();
        });
    });

    describe('handleSignUpSubmit', () => {
        it('should call setError with an error message if any required fields are null', () => {
            const setError = jest.fn();
            handleSignUpSubmit(null, 'name', 'surname', 'password', 'password', 'email', 'type', setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
            handleSignUpSubmit('event', "", 'surname', 'password', 'password', 'email', 'type', setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
            handleSignUpSubmit('event', 'name', "", 'password', 'password', 'email', 'type', setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
            handleSignUpSubmit('event', 'name', 'surname', "", 'password', 'email', 'type', setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
            handleSignUpSubmit('event', 'name', 'surname', 'password', "", 'email', 'type', setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
            handleSignUpSubmit('event', 'name', 'surname', 'password', 'password', "", 'type', setError);
            expect(setError).toHaveBeenCalledWith(['Fill the form to continue']);
        });

        it('should call setError with an error message if password and passwordConf do not match', () => {
            const setError = jest.fn();
            handleSignUpSubmit('event', 'name', 'surname', 'password', 'different', 'email', 'type', setError);
            expect(setError).toHaveBeenCalledWith(['Typed Password are different']);
        });

        it('should not call setError if all required fields are present and password and passwordConf match', () => {
            const setError = jest.fn();
            handleSignUpSubmit('event', 'name', 'surname', 'password', 'password', 'email', 'type', setError);
            expect(setError).not.toHaveBeenCalled();
        });
    });
});