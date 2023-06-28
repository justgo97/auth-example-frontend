import { PropsWithChildren, useEffect, useState } from "react";

// Import all of Bootstrap's JS
import "bootstrap";

import Navbar from "./Navbar";
import { useAppSelector, selectUser, useAppDispatch } from "../../store";
import { sendRefresh } from "../../util/connectUtil";
import { authActions } from "../../store/authReducer";
import LoadingSpinner from "../LoadingSpinner";

function Layout({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser());

  useEffect(() => {
    const fetchRefresh = async () => {
      const result = await sendRefresh();

      if (result.success) {
        dispatch(authActions.login(result.user));
      }

      setIsLoading(false);
    };

    if (localStorage.getItem("token") && !currentUser.email) {
      fetchRefresh();
    }
  }, [dispatch, currentUser.email]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default Layout;
