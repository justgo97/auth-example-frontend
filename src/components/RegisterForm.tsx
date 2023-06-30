import { useState } from "react";
import { sendRegister } from "../util/connectUtil";
import { useAppDispatch } from "../store";
import { authActions } from "../store/authReducer";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isFetching, setIsFetching] = useState(false);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFetching) return;

    if (!name || !email || !password) {
      return;
    }

    const fetchLogin = async () => {
      setIsFetching(true);
      const result = await sendRegister(name, email, password);

      if (result.success) {
        dispatch(authActions.login(result.user));
        navigate("/");
      } else if (result.errorMessage) {
        setError(result.errorMessage);
      }
      setIsFetching(false);
    };

    fetchLogin();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputName1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName1"
          aria-describedby="nameHelp"
          value={name}
          onChange={onChangeName}
        />
      </div>
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
      <p>
        Already have an account? sign in from <Link to="/login">here</Link>.
      </p>
      <button type="submit" className="btn btn-primary" disabled={isFetching}>
        Sign Up
      </button>
      {error && <div className="text-danger">{error}</div>}
    </form>
  );
};

export default RegisterForm;
