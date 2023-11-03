import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { signup, error, isLoading } = useSignup();

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(data.email, data.password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email : </label>
      <input type="email" name="email" onChange={handleChange} />
      <label>Password : </label>
      <input type="password" name="password" onChange={handleChange} />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
