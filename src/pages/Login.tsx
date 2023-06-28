import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { selectUser, useAppSelector } from "../store";

const Login = () => {
  const currentUser = useAppSelector(selectUser());

  // Already logged in, take them somwhere else
  if (currentUser.email) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container">
      <LoginForm />
    </div>
  );
};

export default Login;
