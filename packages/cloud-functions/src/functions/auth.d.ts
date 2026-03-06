import { User, ApiResponse } from '@silver-care/shared';
export declare function wechatLogin(code: string): Promise<ApiResponse<{
    token: string;
    user: User;
}>>;
export declare function getUserInfo(userId: string): Promise<ApiResponse<User>>;
