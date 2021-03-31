
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContex } from "../../App";
import { handleGoogleSginIn, initializeLogInFrameWork, handleSignOut, handleFbSginIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LoginManager";

function Login() {
  const [newUser, setNewUSer] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  });
  initializeLogInFrameWork();
  const [logedInUser, setLogedInUser] = useContext(userContex);
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res)
    setLogedInUser(res)
    if (redirect) {
      history.replace(from);
    }

  }
  const googleSginIn = () => {
    handleGoogleSginIn()
      .then(res => {
        handleResponse(res , true)

      })
  }
  const fbSginIn = () => {
    handleFbSginIn()
      .then(res => {
        handleResponse(res , true)

      })
  }
  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res , false)

      })
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res , true)

        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res , true)
        })
    }
    e.preventDefault()
  }

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const NewUSerInfo = { ...user }
      NewUSerInfo[e.target.name] = e.target.value;
      setUser(NewUSerInfo);
    }
  }

  
  return (
    <div style={{ textAlign: 'center' }}>
      { user.isSignIn ? <button onClick={signOut}>sign out</button> :
        <button onClick={googleSginIn}>sign in</button>
      }
      <br />
      <button onClick={fbSginIn}>sign in with facebook</button>

      {
        user.isSignIn && <div>
          <p>Welcome , {user.name}</p>
          <p>your email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUSer(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser"> new user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="your name" required />}
        <br />
        <input type="text" name="email" placeholder="your email address" onBlur={handleBlur} required />
        <br />
        <input type="password" name="password" id="" placeholder="enter your password" onBlur={handleBlur} required />
        <br />
        <input type="submit" value={newUser ? 'sign in' : 'sign up'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <h4 style={{ color: 'green' }}>User {newUser ? 'Created' : 'Loged in'} Successfully Done </h4>}
    </div>
  );
}

export default Login;