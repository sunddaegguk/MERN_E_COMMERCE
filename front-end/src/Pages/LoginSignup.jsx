import React, { useState } from 'react';
import './CSS/LoginSignup.css';
const LoginSignup = () => {
  const [state, setstate] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log('Login Function Executed', formData);
    let responseData;
    await fetch('http://localhost:4444/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      localStorage.setItem('token', responseData.token);
      window.location.replace('/');
      console.log('User Logged In Successfully');
    } else {
      localStorage.removeItem('token');
      alert('Error in User Login');
    }
  };
  const signup = async () => {
    console.log('Signup Function Executed', formData);
    let responseData;
    await fetch('http://localhost:4444/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      localStorage.setItem('token', responseData.token);
      window.location.replace('/');
      console.log('User Registered Successfully');
    } else {
      localStorage.removeItem('token');
      alert('Error in User Registration');
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? (
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              type="text"
              placeholder="Your name"
            />
          ) : (
            <></>
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          className="Btn"
          onClick={() => {
            state === 'Login' ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === 'Sign Up' ? (
          <p className="loginsignup-login">
            Already have an account?{' '}
            <span
              onClick={() => {
                setstate('Login');
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{' '}
            <span
              onClick={() => {
                setstate('Sign Up');
              }}
            >
              Click here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By signing up, you agree to our <span>Terms & Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
