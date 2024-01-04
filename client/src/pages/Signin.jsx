import AuthForm from "../components/AuthForm";
import Nav from "../components/Nav";

const Signin = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 h-screen">
      <Nav />
      <div className="flex justify-center items-center h-[700px]">
        <AuthForm title={"Sign In"} register={true} />
      </div>
    </div>
  );
};

export default Signin;
