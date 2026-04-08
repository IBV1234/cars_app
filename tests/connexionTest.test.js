
import { Alert } from 'react-native';
import { validateUserLogin } from '../fonctions/auth';
import * as Utils from '../fonctions/utils.js';

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});

jest.mock('../../fonctions/utils', () => ({
  getUserInBd: jest.fn(),
}));
describe('validateUserLogin', () => {

    it('connexion success', () => {
        const fakeUser = {
            email: 'test@example.com',
            password: 'password123'
        };

        const mockGetUser = jest.fn().mockReturnValue(fakeUser);
        const mockSetUser = jest.fn();
        const mockPush = jest.fn();
        const mockAlert = jest.fn();

        const mockRouter = { push: mockPush };

        validateUserLogin(
            { email: 'test@example.com', password: 'password123' },
            mockGetUser,
            mockSetUser,
            mockRouter,
            mockAlert
        );

        expect(mockSetUser).toHaveBeenCalledWith(fakeUser);
        expect(mockPush).toHaveBeenCalledWith('/acceuil');
        expect(mockAlert).not.toHaveBeenCalled();
    });

    it('connexion failure', () => {


        const mockGetUser = jest.fn().mockReturnValue(false);
        const mockSetUser = jest.fn();
        const mockPush = jest.fn();
        const mockAlert = jest.fn();
        const mockRouter = { push: mockPush };

        validateUserLogin(
            { email: 'test@example.com', password: 'wrongpassword' },
            mockGetUser,
            mockSetUser,
            mockRouter,
            mockAlert
        );

        expect(mockAlert).toHaveBeenCalledWith('Mot de passe incorrecte');
        expect(mockSetUser).not.toHaveBeenCalled();
    });


});