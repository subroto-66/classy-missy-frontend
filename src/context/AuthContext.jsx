import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("cm_token") || null);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("cm_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Sync state with storage and fetch current profile if token exists
  useEffect(() => {
    async function loadUser() {
      const storedToken = localStorage.getItem("cm_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/user");
        if (response.data?.data) {
          setUser(response.data.data);
          localStorage.setItem("cm_user", JSON.stringify(response.data.data));
        }
      } catch (error) {
        // Token might be invalid or expired
        if (error.response?.status === 401) {
          localStorage.removeItem("cm_token");
          localStorage.removeItem("cm_user");
          setToken(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const response = await api.post("/login", credentials);
    const authData = response.data?.data;
    const authToken = response.data?.token || authData?.token;
    const userData = authData?.user || authData;

    if (authToken) {
      localStorage.setItem("cm_token", authToken);
      setToken(authToken);
    }

    if (userData) {
      localStorage.setItem("cm_user", JSON.stringify(userData));
      setUser(userData);
    }

    return response.data;
  };

  const register = async (formData) => {
    const response = await api.post("/register", formData);
    const authData = response.data?.data;
    const authToken = response.data?.token || authData?.token;
    const userData = authData?.user || authData;

    if (authToken) {
      localStorage.setItem("cm_token", authToken);
      setToken(authToken);
    }

    if (userData) {
      localStorage.setItem("cm_user", JSON.stringify(userData));
      setUser(userData);
    }

    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // Ignore network / logout error
    } finally {
      localStorage.removeItem("cm_token");
      localStorage.removeItem("cm_user");
      setToken(null);
      setUser(null);
    }
  };

  const updateUser = (updated) => {
    setUser((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem("cm_user", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token && user),
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
