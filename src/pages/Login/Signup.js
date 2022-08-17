import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, Redirect, Navigate } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
// import './Register.css';
function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const [isLoggedIn, setLogin] = useState(false);
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      setLogin(true);
      // console.log('logged in');
      // history.replace('/dashboard');
    }
  }, [user, loading]);

  return (
    <div className="register">
      {isLoggedIn ? (
        <div>
          <Navigate replace to="/home" />
        </div>
      ) : (
        <div className="register__container">
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>
          <div>
            Already have an account? <Link to="/login">Login</Link> now.
          </div>
        </div>
      )}
    </div>
  );
}
export default Signup;
