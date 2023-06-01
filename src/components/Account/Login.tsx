import React, { FormEvent, useState } from "react";
import "../../styles/account.css";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../../types and interfaces";
import { Link } from "react-router-dom";
import Loader from "../other/Loader";

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BE_URL as String;
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const logIn = async (formValues: FormValues) => {
    try {
      const res = await fetch(`${apiUrl}/users/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.accessToken);
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setisLoading(false);
        setIsIncorrect(false);
        navigate(
          `/?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}`
        );
      } else {
        console.error("Error logging in:");
        setIsIncorrect(true);
        setisLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    logIn(formValues);
    // Handle form submission
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-white hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://res.cloudinary.com/dvagn6szo/image/upload/v1683630521/hotel-Rheingold/tinified/logan-mayer-tFc9kSPbMDg-unsplash_cam6v7.jpg"
          alt=" by Logan Mayer on Unsplash"
          className="w-full h-full object-cover "
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form
            className="mt-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="on"
                required
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                minLength={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="/login"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="block font-semibold rounded-lg  login-button  text-black  w-full "
            >
              Log In
            </button>
          </form>
          {isLoading && (
            <p>
              <div role="status" className="mt-10">
                {/* <span className="sr-only">Loading...</span> */}
                <Loader />
              </div>
            </p>
          )}
          {isIncorrect && (
            <p className="text-danger">Wrong password, try again!</p>
          )}

          <hr className="my-6 border-gray-300 w-full" />
          <a href={`${apiUrl}/users/googlelogin`}>
            <button className="button-google mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
                className="svg"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  className="blue"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  className="green"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  className="yellow"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  className="red"
                ></path>
              </svg>
              <span className="text">Continue with Google</span>
            </button>
          </a>

          <p className="mt-8">
            Need an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
