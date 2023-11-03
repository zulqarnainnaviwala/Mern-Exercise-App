import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { login, error, isLoading } = useLogin();

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(data.email, data.password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email : </label>
      <input type="email" name="email" onChange={handleChange} />
      <label>Password : </label>
      <input type="password" name="password" onChange={handleChange} />
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
