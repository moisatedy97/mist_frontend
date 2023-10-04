export type LoginUserReq = {
    email: string;
    password?: string;
    otp?: string;
};

export type LoginUserRes = {
    access_token: string;
    refresh_token: string;
};

export type SignupUserReq = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
};
