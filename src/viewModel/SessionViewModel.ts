import { authTools } from "../services/firebase"

class SessionViewModel {
    private static auth: any = authTools.getAuth();

    checkUser():boolean{
        var logged: boolean;
        var user = SessionViewModel.auth.currentUser;
        if(user) logged = true;
        else logged = false;
        console.log('checkUser --> ¿User logged? ',logged);
        return logged;
    }
    async signIn(email: string, password: string) {
       await authTools.signInWithEmailAndPassword(SessionViewModel.auth, email, password)
        .then((user) => {
            console.log('Signed in');
        })
        .catch((error) => {
            console.log(error.message);
            throw error;
        });
    }
    async signOut() {
        await authTools.signOut(SessionViewModel.auth)
        .then(() => {
            console.log('Signed out');
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
}

export default SessionViewModel