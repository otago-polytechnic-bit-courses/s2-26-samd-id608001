import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    getToken,
    clearToken,
    login as loginRequest,
} from "../components/auth";

interface AuthContextValue {
    token: string | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getToken().then((stored) => {
            setToken(stored);
            setIsLoading(false);
        });
    }, []);

    async function login(username: string, password: string): Promise<void> {
        await loginRequest(username, password);
        setToken(await getToken());
    }

    async function logout(): Promise<void> {
        await clearToken();
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }

    return context;
}