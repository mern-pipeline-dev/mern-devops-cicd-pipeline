import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthContextType, User, RegisterData, LoginData } from "../types/auth";
import { authApi } from "../services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      setIsLoading(true);

      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await authApi.register(data);
      setToken(response.token);
      setUser(response.user);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (err) {
      let errorMessage = "Registration failed";
      
      // Handle axios error
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as any;
        errorMessage = axiosErr.response?.data?.message || axiosErr.response?.data?.error || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error("Register error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authApi.login(data);
      setToken(response.token);
      setUser(response.user);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (err) {
      let errorMessage = "Login failed";
      
      // Handle axios error
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as any;
        errorMessage = axiosErr.response?.data?.message || axiosErr.response?.data?.error || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error("Login error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    authApi.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        register,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
