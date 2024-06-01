import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useRef,
} from "react";
import { Button } from "../ui/button";
import axios from "axios";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { AuthContextType, PostType } from "./types";
axios.defaults.withCredentials = true;

const serverUrl = process.env.REACT_APP_SERVER_URL;

const defaultAuthContextValue: AuthContextType = {
  loggedIn: null,
  checkLoginState: () => {},
  user: null,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

const AuthContextProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const checkLoginState = useCallback(async () => {
    console.log("entering checkLoginState client");
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await axios.get(`${serverUrl}/auth/logged_in`);
      console.log("logged_in in checkLoginState", logged_in);
      setLoggedIn(logged_in);
      user && setUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  );
};
const Login = () => {
  const handleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const {
        data: { url },
      } = await axios.get(`${serverUrl}/auth/url`);
      // Navigate to consent screen
      window.location.assign(url);
    } catch (err) {
      console.log("authentication not successful");
      console.error(err);
    }
  };
  return (
    <div className="m-7">
      <Button
        className="login-logout-button"
        variant="secondary"
        size="lg"
        onClick={handleLogin}
      >
        <b>Login</b>
      </Button>
    </div>
  );
};

const Dashboard = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    (async () => {
      if (loggedIn === true) {
        try {
          // Get posts from server
          const {
            data: { posts },
          } = await axios.get(`${serverUrl}/auth/user/posts`);
          setPosts(posts);
          console.log("posts:", posts);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [loggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/auth/logout`);
      // Check login state again
      checkLoginState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h3>Dashboard</h3>
      <div className="m-7">
        <Button
          className="login-logout-button"
          variant="secondary"
          size="lg"
          onClick={handleLogout}
        >
          <b>Logout</b>
        </Button>
      </div>

      <h4>{user?.name}</h4>
      <br />
      <p>{user?.email}</p>
      <br />
      <img src={user?.picture} alt={user?.name} />
      <br />
      <div>
        {posts.map((post, idx) => (
          <div key={idx}>
            <h5>{post?.title}</h5>
            <p>{post?.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const Callback = () => {
  const called = useRef(false);
  console.log("entering callback");
  const { checkLoginState, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (loggedIn === false) {
        try {
          if (called.current) return; // prevent rerender caused by StrictMode
          called.current = true;
          const res = await axios.get(
            `${serverUrl}/auth/token${window.location.search}`
          );
          checkLoginState();
          navigate("/");
          console.log("after callback");
        } catch (err) {
          console.log("authentication not sucessful");
          console.error(err);
          navigate("/");
        }
      } else if (loggedIn === true) {
        navigate("/");
      }
    })();
  }, [checkLoginState, loggedIn, navigate]);
  return <></>;
};

const Home = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log("loggedIn", loggedIn);
  if (loggedIn === true) return <Dashboard />;
  if (loggedIn === false) return <Login />;
  return <></>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/callback", // google will redirect here
    element: <Callback />,
  },
]);

const LoginHome = () => {
  return (
    <div className="flex align-center">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
};

export default LoginHome;
