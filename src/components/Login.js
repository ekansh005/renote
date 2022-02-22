import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      // success case will be handled by the auth state change listener
    }
  };

  const handleSignup = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else if (user && user.confirmation_sent_at) {
      alert("Confirmation email sent");
      // success case will be handled by the auth state change listener
    }
  };

  return (
    <div className="loginForm">
      <input type="email" placeholder="Email" className="input" value={email} name="email" onChange={handleChange} />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        name="password"
        onChange={handleChange}
      />
      <button
        className="btn btn--primary loginForm--login"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </button>
      <button
        className="btn loginForm--signup"
        onClick={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
