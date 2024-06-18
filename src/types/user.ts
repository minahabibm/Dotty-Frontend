export interface User {
    sid: string;
    name: string;
    email: string;
    picture: string;
    locale: string;
    accessToken: string;
    refreshToken: string;
}

export interface DecodedJwt {
    header: Record<string, any>;
    payload: Payload;
    signature: string;
}

export interface Payload {
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    picture: string;
    locale: string;
    updated_at: string;
    email: string;
    email_verified: string;
    iss: string;
    iat: string;
    exp: string;
    sub: string;
    sid: string;
    accessToken: string;
    refreshToken: string;
}

export interface UserInterface {
    getUser: () => Promise<User>;
    setUser: (user: User) => Promise<void>;
    deleteUser: () => Promise<void>;
}