import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Inscription from '../(tabs)/inscription';
import * as Utils from '../../fonctions/utils';
import { Alert } from 'react-native'
// import { useGoogleAuth } from '@/fonctions/googleAuth';

// Mocking the modules
jest.mock('../../fonctions/utils', () => ({
  validerEmail: jest.fn(),
  BoolValideUserInBd: jest.fn(),
  insertUserInBd: jest.fn(),
}));

// jest.mock('@/fonctions/googleAuth', () => ({
//   useGoogleAuth: () => ({
//     signIn: jest.fn().mockResolvedValue({ success: true, user: { name: 'Test User', email: 'test@example.com', picture: '', google_id: '123' } }),
//   }),
// }));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  Link: 'Link', // Mock the Link component
}));

jest.mock('@expo/vector-icons', () => ({
  FontAwesome: () => null, // retun null for all FontAwesome icons
}));

beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => { });
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

describe('Inscription Component', () => {


  it('renders the form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Inscription />);

    expect(getByPlaceholderText('Entrer votre nom')).toBeTruthy();
    expect(getByPlaceholderText('Entrer votre e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Entrer votre mot de passe')).toBeTruthy();
    expect(getByPlaceholderText('Réentrer votre mot de passe')).toBeTruthy();
    expect(getByText('Inscription')).toBeTruthy();
    expect(getByText('ou inscrivez vous avec')).toBeTruthy();
  });

  it('shows alert if fields are empty', async () => {
    const { getByPlaceholderText, getByText } = render(<Inscription />);

    fireEvent.changeText(getByPlaceholderText('Entrer votre nom'), '');
    fireEvent.changeText(getByPlaceholderText('Entrer votre e-mail'), '');
    fireEvent.changeText(getByPlaceholderText('Entrer votre mot de passe'), '');
    fireEvent.changeText(getByPlaceholderText('Réentrer votre mot de passe'), '');

    fireEvent.press(getByText('Inscription'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Tous les champs doivent être remplis');
    });
  });

  it('shows alert for invalid email', async () => {
    Utils.validerEmail.mockReturnValue(false);
    const { getByPlaceholderText, getByTestId } = render(<Inscription />);

    fireEvent.changeText(getByPlaceholderText('Entrer votre nom'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Entrer votre e-mail'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Entrer votre mot de passe'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Réentrer votre mot de passe'), 'password123');

    fireEvent.press(getByTestId('inscription_button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Email non valide');
    });
  });

  it('shows alert if passwords do not match', async () => {
    Utils.validerEmail.mockReturnValue(true);
    const { getByPlaceholderText, getByText } = render(<Inscription />);

    fireEvent.changeText(getByPlaceholderText('Entrer votre nom'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Entrer votre e-mail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Entrer votre mot de passe'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Réentrer votre mot de passe'), 'password456');

    fireEvent.press(getByText('Inscription'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Mot de passe non correspondant');
    });
  });

  it('shows alert if user already exists', async () => {
    Utils.validerEmail.mockReturnValue(true);
    Utils.BoolValideUserInBd.mockReturnValue(true);
    const { getByPlaceholderText, getByText } = render(<Inscription />);

    fireEvent.changeText(getByPlaceholderText('Entrer votre nom'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Entrer votre e-mail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Entrer votre mot de passe'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Réentrer votre mot de passe'), 'password123');

    fireEvent.press(getByText('Inscription'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Utilisateur non trouvable');
    });
  });

  it('calls insertUserInBd for new user', async () => {
    Utils.validerEmail.mockReturnValue(true);
    Utils.BoolValideUserInBd.mockReturnValue(false);
    Utils.insertUserInBd.mockReturnValue(true);

    const { getByPlaceholderText, getByText } = render(<Inscription />);

    fireEvent.changeText(getByPlaceholderText('Entrer votre nom'), 'New User');
    fireEvent.changeText(getByPlaceholderText('Entrer votre e-mail'), 'new@example.com');
    fireEvent.changeText(getByPlaceholderText('Entrer votre mot de passe'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Réentrer votre mot de passe'), 'password123');

    fireEvent.press(getByText('Inscription'));

    await waitFor(() => {
      expect(Utils.insertUserInBd).toHaveBeenCalledWith({
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
        passwordConfirm: 'password123',
        picture: '',
      });
    });
  });
});
