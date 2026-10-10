import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  isTokenValid,
  clearToken,
  login as loginRequest,
  register as registerRequest,
} from '../components/lib/auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    isTokenValid()
      .then(valid => {
        setIsAuthenticated(valid);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  async function login(username: string, password: string): Promise<void> {
    if (!username || username.length === 0)
      throw new Error('Please enter a username!');
    if (!password || password.length === 0)
      throw new Error('Please enter a password!');
    setIsLoading(true);
    await loginRequest(username, password);
    setIsAuthenticated(true);
  }

  async function register(
    username: string,
    password: string,
    confirmPassword: string,
  ): Promise<void> {
    if (!username || username.length === 0)
      throw { username: ['Please enter a username!'] };
    if (!password || password.length === 0)
      throw { password: ['Please enter a password!'] };
    if (!confirmPassword || confirmPassword.length === 0)
      throw { confirmPassword: ['Please confirm your password.'] };
    if (password !== confirmPassword)
      throw { confirmPassword: ['Passwords do not match.'] };

    setIsLoading(true);
    await registerRequest(username, password);
  }

  async function logout(): Promise<void> {
    await clearToken();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setIsLoading,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
}
