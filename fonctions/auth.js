
export const validateUserLogin = (
    personne,
    getUserInBd,
    setUser,
    router,
    alert,
    validation = null
) => {
    if (validation && !validation.success) {
        const errors = validation.error.issues.map((err) => err.message).join('\n');
        alert(errors);
        return;
    }
    const user = getUserInBd(personne.email, personne.password);

    if (user !== false) {
        setUser(user);
        router.push("/acceuil");
    } else {
        alert('Mot de passe incorrecte');
    }
};