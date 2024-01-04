import React from "react";
import AuthForm from "../components/AuthForm";
import Nav from "../components/Nav";

const Signup = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 h-screen">
      <Nav />
      <div className="flex justify-center items-center h-[700px]">
        <AuthForm title={"Sign Up"} register={false} />
      </div>
    </div>
  );
};

export default Signup;
