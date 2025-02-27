import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { LargeLoad } from "./Loading";

export interface UserType {
  id: string;
  username: string;
  email: string;
  reffCode: string;
  isVerify?: string | null | undefined;
  inviteFrom?: string;
  balance?: number;
  address?: string;
  phone?: string;
  country?: string;
  socialMedia?: string;
  avatar?: string;
  timestamp?: any;
  role?: string;
}

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (location !== "/login" && location !== "/register") {
      const userId = localStorage.getItem("user");

      if (userId) {
        getDoc(doc(db, "users", userId)).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data() as UserType;
            if (userData?.role !== "admin") {
              navigate("/login");
            } else {
              setUser({
                ...userData,
              });
              setIsLogin(true);
            }
          } else {
            navigate("/login");
          }
        });
      } else {
        navigate("/login");
      }
    } else {
      setIsLogin(true);
    }
  }, [location]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!isLogin ? <LargeLoad /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
