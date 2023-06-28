import { useState } from "react";
import { sendLogin } from "../util/connectUtil";
import { useAppDispatch } from "../store";
import { authActions } from "../store/authReducer";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchLogin = async () => {
      const result = await sendLogin(email, password);

      if (result.success) {
        dispatch(authActions.login(result.user));
        navigate("/");
      } else if (result.errorMessage) {
        setError(result.errorMessage);
      }
    };

    fetchLogin();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <p>
          Don't have an account? sign up from <Link to="/register">here</Link>.
        </p>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {error && <div className="text-danger">{error}</div>}
    </form>
  );
};

export default LoginForm;
