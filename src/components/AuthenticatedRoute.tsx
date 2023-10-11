import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthenticatedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect the user to the sign-up page and then back to the intended page
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
    return <div>Redirecting to sign-up...</div>;
  }

  return element;
};

export default AuthenticatedRoute;
