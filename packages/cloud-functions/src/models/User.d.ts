import { User as UserType } from '@silver-care/shared';
export declare class User {
    static findById(id: string): Promise<UserType | null>;
    static findByOpenId(openId: string): Promise<UserType | null>;
    static create(data: Partial<UserType>): Promise<UserType>;
    static update(id: string, data: Partial<UserType>): Promise<UserType>;
}
