import axios from "axios";

const API_URL = "http://localhost:8000";

const Paths = {
  Base: "/api",
  Auth: {
    Base: "/auth",
    Login: "/login",
    Register: "/register",
    Refresh: "/refresh",
  },
  Users: {
    Base: "/users",
    Get: "/all",
    Add: "/add",
    Update: "/update",
    Delete: "/delete/:id",
  },
};

const PATH_AUTH = API_URL + Paths.Base + Paths.Auth.Base;

const axiosAuthorized = axios.create({
  headers: {
    Accepted: "appication/json",
    "Content-Type": "application/json",
  },
});

axiosAuthorized.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const REFRESH_URL = PATH_AUTH + Paths.Auth.Refresh;

const sendRefresh = async () => {
  try {
    const result = await axiosAuthorized.get(REFRESH_URL);
    const user = result.data.user;
    return { success: true, user };
  } catch (error) {
    let errorMessage = "Server error.";
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      error.response.data.error
    ) {
      errorMessage = error.response.data.error; // Return the error message from the backend
    }

    return { success: false, errorMessage };
  }
};

const LOGIN_URL = PATH_AUTH + Paths.Auth.Login;

const sendLogin = async (email: string, password: string) => {
  try {
    const result = await axios.post(LOGIN_URL, { email, password });
    localStorage.setItem("token", result.data.token);
    const user = result.data.user;
    return { success: true, user };
  } catch (error) {
    let errorMessage = "Server error.";
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      error.response.data.error
    ) {
      errorMessage = error.response.data.error; // Return the error message from the backend
    }

    return { success: false, errorMessage };
  }
};

const REGISTER_URL = PATH_AUTH + Paths.Auth.Register;

const sendRegister = async (name: string, email: string, password: string) => {
  try {
    const result = await axios.post(REGISTER_URL, { name, email, password });
    localStorage.setItem("token", result.data.token);
    const user = result.data.user;
    return { success: true, user };
  } catch (error) {
    let errorMessage = "Server error.";
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      error.response.data.error
    ) {
      errorMessage = error.response.data.error; // Return the error message from the backend
    }

    return { success: false, errorMessage };
  }
};

export { sendRefresh, sendLogin, sendRegister };
