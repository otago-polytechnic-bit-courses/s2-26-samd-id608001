import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  getToken,
  getValidToken,
  clearToken,
  login as loginRequest,
  register as registerRequest,
} from '../components/lib/auth';

interface AuthContextValue {
  token: string | null;
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
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    getValidToken()
      .then(stored => {
        setToken(stored);
        if (stored === null) setIsAuthenticated(false);
        else setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
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
    setToken(await getToken());
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
    setToken(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
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
