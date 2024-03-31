import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import CustomToast from "../Toast";
import { toast } from 'react-toastify';

const SignUp = () => {
  const isSignUp = window.location.pathname == "/signUp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpORLogin = (e) => {
    e.preventDefault();
    
    if(isSignUp) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            toast.success('Successfully sign up!!', {
                position: "top-center",
                autoClose: 5000,
            });
            console.log(userCredential);
        })
        .catch((error) => {
            toast.error('Error occured while sign up. Please try again.', {
                position: "top-center",
                autoClose: 5000,
            });
            console.log(error);
        });
    }
    else {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            toast.success('Successfully logged in!!', {
                position: "top-center",
                autoClose: 5000,
            });
            console.log(userCredential);
        })
        .catch((error) => {
            console.log('error', error?.message)
            const message = error?.message?.includes("auth/invalid-credential") 
                ? "Username or password incorrect" : "Error occured while login. Please try again.";

            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
            });
            console.log(error);
        });
    }
  };

  return (
    <>
        <form className="w-75 mx-auto" onSubmit={signUpORLogin}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
                {isSignUp && <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>
        <CustomToast/>
    </>
  );
};

export default SignUp;