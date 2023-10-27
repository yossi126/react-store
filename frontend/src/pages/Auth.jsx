import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
  redirect,
  json,
} from "react-router-dom";

const Auth = () => {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <Form method="post">
        <h2>{isLogin ? "Log in" : "Create a new user"}</h2>

        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!isLogin && (
          <div>
            <p>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="name"
                name="name"
                required
                disabled={isLogin}
              />
            </p>
            <p>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="city"
                name="city"
                required
                disabled={isLogin}
              />
            </p>
          </div>
        )}
        <button>{isLogin ? "Login" : "Register"}</button>
        <div>
          {isLogin ? (
            <h4>don't have an account?</h4>
          ) : (
            <h4>already have an account?</h4>
          )}
          <Link to={`?mode=${isLogin ? "register" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
        </div>
        <p>{data && data}</p>
      </Form>
    </>
  );
};

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  // if (mode !== "login" && mode !== "register") {
  //   throw json({ message: "Unsupported mode." }, { status: 422 });
  // }
  const data = await request.formData();
  let authData;
  if (mode === "register") {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      city: data.get("city"),
      role: "user",
    };
  } else {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  }

  try {
    const response = await fetch("http://localhost:3000/auth/" + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (
      response.status === 422 ||
      response.status === 401 ||
      response.status === 400
    ) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 30); // Set the expiration time to 20 minutes

    localStorage.setItem("token", token);
    localStorage.setItem("role", resData.user.role);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
  } catch (error) {
    console.log("Error occurred:", error.message);
    return error.message;
  }
}

export default Auth;
