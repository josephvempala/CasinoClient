import axios from "axios";
import {
  createContext,
  useEffect,
  useState,
} from "react";
import { setSocketAuthToken } from "../utils/socket";

interface props {
  children: JSX.Element;
}

interface User {
  username: string;
  admin: boolean;
  profilePicture: string;
  balance: number;
  isLoggedIn: boolean;
}

interface context {
  user: User;
  LogIn: (username: string, password: string) => Promise<boolean>;
  LogOut: () => boolean;
}

async function checkLogin() {
  try {
    const response = await axios.get("http://localhost:3000/users/checkToken", {
      withCredentials: true,
    });
    const token = response.data.token;
    return token;
  } catch (err) {
    return null;
  }
}

const initialState: User = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : {
      username: "",
      admin: false,
      profilePicture: "",
      balance: 0,
      isLoggedIn: false,
      token : ''
    };

export const userContext = createContext<context>({} as any);

export function UserProvider({ children }: props) {

  const [user, setUser] = useState<User>(initialState);

  const LogOut = () => {
    setUser({
      username: "",
      admin: false,
      profilePicture: "",
      balance: 0,
      isLoggedIn: false,
    });
    return true;
  };

  const LogIn = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { token, ...user } = response.data;
      user.isLoggedIn = true;

      setUser({...user, token});
      setSocketAuthToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (err) {
      LogOut();
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = await checkLogin();
      if (!isLoggedIn) {
        setUser({
          username: "",
          admin: false,
          profilePicture: "",
          balance: 0,
          isLoggedIn: false,
        });
      }
      if(isLoggedIn)
        setSocketAuthToken(isLoggedIn);
    })();
  }, []);

  return (
    <userContext.Provider value={{ user, LogIn, LogOut }}>
      {children}
    </userContext.Provider>
  );
}
