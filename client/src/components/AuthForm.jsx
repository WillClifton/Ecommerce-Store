/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const AuthForm = ({ title, register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const auth = useSelector((state) => state.auth);
  const signUpMessage = auth[0].message;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Check which page first -> auth functions
    if (!register) {
      signUp(email, password);
    } else {
      signIn(email, password);
    }

    console.log(auth);
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[400px] border h-[400px] bg-white rounded-2xl shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {title}
          </h2>
        </div>

        <form
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={handleSubmitForm}
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {register ? (
                  <div className="text-sm">
                    <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {register ? "" : signUpMessage}
            </div>

            <div>
              {register ? (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {title}
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {title}
                </button>
              )}
            </div>
          </div>
          {register ? (
            <p className="mt-3 text-center text-sm text-gray-500 flex flex-row gap-2 items-center justify-center">
              Don't have an account?
              <button
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  // dispatch(setSignedUp(""));
                  navigate("/signup");
                }}
              >
                Register
              </button>
            </p>
          ) : (
            <p className="mt-3 text-center text-sm text-gray-500 flex flex-row gap-2 items-center justify-center">
              Already have an account?
              <button
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
