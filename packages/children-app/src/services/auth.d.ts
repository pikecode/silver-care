import { User } from '@silver-care/shared';
export declare class AuthService {
    private token;
    private user;
    login(code: string): Promise<User>;
    logout(): Promise<void>;
    getUser(): User | null;
    getToken(): string | null;
    isLoggedIn(): boolean;
    private callCloudFunction;
}
export declare const authService: AuthService;
