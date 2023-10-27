import { Link, useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  function goBackHandler() {
    navigate("..");
  }

  if (error.status === 404) {
    return (
      <div>
        <h3>Ohh! </h3>
        <p>We can't seem to find the page you're looking for</p>
        <i>{error.statusText || error.message}</i>
        <p>
          <i>{error.status}</i>
        </p>
        <Link to="/">back home</Link>
      </div>
    );
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Root Error Page</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        <i>{error.status}</i>
      </p>
    </div>
  );
}
