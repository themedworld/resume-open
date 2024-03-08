import axiosInstance from "./axiosInstance";

interface TokenPayload {
    exp: number;
    username: string;
    role: string;
    // Add other properties if necessary
}

const setToken = (token: string): void => {
    localStorage.setItem('token', token);
};

const getToken = (): string | null => {
    const token = localStorage.getItem('token');
    return token ? token : null;
};

const login = (userData: any) => {
    return axiosInstance.post("http://localhost:3001/api/v1/users/signin", userData);
};

const parseToken = (token: string): TokenPayload | null => {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        return null; // Invalid token format
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload as TokenPayload;
};

const getUserName = (): string | null => {
    const token = getToken();
    if (token) {
        const payload = parseToken(token);
        return payload?.username ?? null
    }
    return null;
};

const getUserRole = (): string | null => {
    const token = getToken();
    if (token) {
        const payload = parseToken(token);
        return payload?.role ?? null
    }
    return null;
};

const isLoggedIn = (): boolean => {
    const token = getToken();
    if (token) {
        const payload = parseToken(token);
        const isLogin: boolean = Date.now() < (payload?.exp ?? 0) * 1000;
        return isLogin;
    }
    return false;
};

const logOut = (): void => {
    localStorage.clear();
};

export const authService = { logOut, getToken, setToken, login, getUserName, getUserRole, isLoggedIn };

