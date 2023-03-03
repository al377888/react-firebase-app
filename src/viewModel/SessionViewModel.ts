import { authTools } from "../services/firebase"

class SessionViewModel {
    private static auth: any = authTools.getAuth();

    checkUser(): boolean{
        authTools.onAuthStateChanged(SessionViewModel.auth, (user) => {
            if (user) {
                // store the user on local storage
                sessionStorage.setItem('user', 'true');
            } else {
                // removes the user from local storage on logOut
                sessionStorage.removeItem('user');
            };
        })
        console.log(`Logged status: ${sessionStorage.getItem('user')}`);
        return (sessionStorage.getItem('user')==='true');
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

    async signUp(email: string, password: string) {
        await authTools.createUserWithEmailAndPassword(SessionViewModel.auth, email, password)
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