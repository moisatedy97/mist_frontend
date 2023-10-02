export type I_UserinfoReq = {
    email: string;
};

export type I_UserinfoRes = {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
};

export type I_EditUserInfoReq = {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    birthPlace?: string;
};
