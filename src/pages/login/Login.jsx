import "./login.scss";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(true);
          console.log(errorCode, errorMessage);
        });
  }


  return (
      <div className="login">
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="username" onChange={e=> setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={e=> setPassword(e.target.value)} />
          <button type="submit">Login</button>
          {error && <span>Wrong email or password!</span>}
        </form>
      </div>
  );
};

export default Login;
