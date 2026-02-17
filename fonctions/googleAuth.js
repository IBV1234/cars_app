import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
export function useGoogleAuth() {


    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '953087995572-470ht1jdc8j562kve7bkalk7dpgsvsto.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({
            scheme: 'carsapp',
            preferLocalhost: true,

        }),
    });

    const signIn = async () => {
        if(!request) {
            console.error('Google Auth request not initialized');
            alert('Google Auth request not initialized');
            return null;
        }
        const result = await promptAsync();
        let authenticationResult = null;
        switch (result?.type) {
            case 'success':
                const { authentication } = result;
                authenticationResult = authentication;
                break;
            case 'cancel':
                console.log('canceled');
                alert('Sign-in canceled');
                break;
            case 'error':
                console.error(result.error);
                alert('An error occurred during sign-in');
                break;
        }
        return authenticationResult;
    };



    // const signOut = async () => {
    //     try {
    //         await GoogleSignin.signOut();
    //         return true;// Remember to remove the user from your app's state as well
    //     } catch (error) {
    //         console.error(error);
    //         return false
    //     }
    // };

    // const getCurrentUser = async () => {
    //     const currentUser = GoogleSignin.getCurrentUser();
    //     if (!currentUser)
    //         return false;

    //     return currentUser;
    // };

    // const hasPreviousSignIn = async () => {
    //     const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
    //     if (!hasPreviousSignIn)
    //         return false;
    //     return hasPreviousSignIn;
    // };
    return { signIn };
};