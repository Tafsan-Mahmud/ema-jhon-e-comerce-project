import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLogInFrameWork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

}


export const handleGoogleSginIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success:true,
            }
            return signedInUser;

        })
        .catch(error => {
            console.log(error)
            console.log(error.message)
        })
}

export const handleFbSginIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    console.log('provider clickrd')
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var credential = result.credential;
            const user = result.user;
            user.success = true;
            console.log('click from facebook',user);
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode , errorMessage)

        });
};


export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const isSginedOut = {
                isSignIn: false,
                name: '',
                photo: "",
                password: '',
                email: '',
                error: '',
                success: false
            }
            return isSginedOut;
        })
        .catch(res => {
            //................
        })
};

export const createUserWithEmailAndPassword = (name , email , password) => {
  return  firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const NewUSerInfo = res.user
            NewUSerInfo.error = '';
            NewUSerInfo.success = true;
            updateUserInfo(name);
            return NewUSerInfo;
        })
        .catch((error) => {
            const NewUSerInfo = {}
            NewUSerInfo.error = error.message
            NewUSerInfo.success = false;
            return NewUSerInfo;
        });
}

export const signInWithEmailAndPassword = (email , password) => {
 return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
            const NewUSerInfo = res.user ;
            NewUSerInfo.error = '';
            NewUSerInfo.success = true;
          return NewUSerInfo ;

        })
        .catch((error) => {
            const NewUSerInfo = {}
            NewUSerInfo.error = error.message
            NewUSerInfo.success = false;
            return NewUSerInfo ;
        });
}

const updateUserInfo = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    })
        .then(res => {
            console.log('user name updated successfully')
        })
        .catch(error => {
            console.log(error)
        });
}