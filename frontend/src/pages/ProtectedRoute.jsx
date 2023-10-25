import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...rest }) {
  const isAuthenticated = true;
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/" replace />}
    />
  );
}

export default ProtectedRoute;
