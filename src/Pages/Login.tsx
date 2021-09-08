import React, { useContext, useState } from "react";
import { userContext } from "../contexts/userContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { LogIn, user } = useContext(userContext);

  async function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!(username && password)) {
      setError("Please enter both username and password");
      return;
    }
    if (username.length > 32 || password.length > 32) {
      setError("Enter valid length for username and password");
      return;
    }
    const isSuccess = await LogIn(username, password);
    if (!isSuccess) {
      setError("Incorrect email/password");
      return;
    }
  }

  return (
    <div>
      {!user.isLoggedIn ? (
        <form onSubmit={SubmitHandler}>
          <label>Username</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button type="submit">Log In</button>
        </form>
      ) : (
        <span>You're Signed in</span>
      )}

      {error && <h1>{error}</h1>}
    </div>
  );
}
