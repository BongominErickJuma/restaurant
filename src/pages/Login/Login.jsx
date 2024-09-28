import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Input from "../../components/UI/Forms/Input";
import useFetch from "../../useFetch";

const Login = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // state to handle form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // state to trigger form submission
  const [submitData, setSubmitData] = useState(false);

  // capture the data
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitData(true);
  };

  // Use the hook conditionally based on submitData
  const { data, error, loading } = useFetch(
    submitData ? "https://fakestoreapi.com/auth/login" : null,
    {
      method: "POST",
      body: JSON.stringify({
        username: "mor_2314", // use test credentials
        password: "83r5^_",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Handle response and redirect
  useEffect(() => {
    if (data) {
      // Store the token in local storage
      localStorage.setItem("access_token", data.access_token);
      setSubmitData(false);

      navigate("/restaurant/dashboard");
    }

    if (error) {
      // Reset submitData to false in case of error
      setSubmitData(false);
    }
  }, [data, error, navigate]);

  return (
    <div className="container-fluid">
      <div className="mt-5 pt-5"></div>
      <div className="row">
        <div className="mx-auto login col-lg-6">
          <h3 className="heading-2">Please Sign In</h3>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="addBtn p-2 w-100 mt-3 fs-4">
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {error && <p className="text-danger para-2">Error: {error}</p>}
          {data && (
            <p className="text-success para-2">Admin Login successfully!</p>
          )}

          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="form-check">
              <input
                className="form-check-input fs-4"
                type="checkbox"
                name="remember"
                value="true"
                id="rememberMe"
              />
              <label className="form-check-label para-2" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <div className="form-check">
              <a className="forgot-password text-end para-2" href="#">
                forgot password
              </a>
            </div>
          </div>
          <hr />
          <p className="text-start para-2">
            Don&apos;t have an account?{" "}
            <Link to="/restaurant/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;