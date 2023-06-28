import { selectUser, useAppDispatch, useAppSelector } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/authReducer";

const Dashboard = () => {
  const currentUser = useAppSelector(selectUser());

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { name } = currentUser;

  const onClickLogout = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div className="container">
      <p>Welcome to auth example Dashboard.</p>
      <div>
        {name ? (
          <>
            Hello {name}
            <div>
              <button onClick={onClickLogout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            You aren't logged in. <Link to="/register">Sign up</Link> or{" "}
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
