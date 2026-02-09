import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Seus IDs do Google
const CLIENT_ID = '953087995572-t53cgt672h8197tu0r5kut283dkio09p.apps.googleusercontent.com';

WebBrowser.maybeCompleteAuthSession();/// Vérifie si une session d'authentification était en cours si oui,termine la session 

export function useGoogleAuth (){
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: CLIENT_ID,
        iosClientId: CLIENT_ID, // Se você tiver um ID específico para iOS
        androidClientId: CLIENT_ID, // Se você tiver um ID específico para Android
    });

    const signInWithGoogle = async () => {
        try {
            const result = await promptAsync();// fonction pour afficher l'écran de login Google

            
            if (result?.type === 'success') {
                const { authentication } = result;
                
                const userInfoResponse = await fetch(
                    'https://www.googleapis.com/oauth2/v2/userinfo',
                    {
                        headers: { Authorization: `Bearer ${authentication.accessToken}` },
                    }
                );

                const userInfo = await userInfoResponse.json();
                
                return {
                    success: true,
                    user: {
                        google_id: userInfo.id,
                        name: userInfo.name,
                        email: userInfo.email,
                        picture: userInfo.picture,
                        password: userInfo.id, 
                    },
                    accessToken: authentication.accessToken,
                };
            }
            
            return { success: false };
        } catch (error) {
            console.error('Erreur de connexion avec Google:', error);
            return { success: false, error };
        }
    };

    return { signInWithGoogle, request };//C'est un objet qui contient des infos sur la validité de la requête. Peut être utile pour:
};
