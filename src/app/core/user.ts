export interface Roles {
    guest?: boolean;
    client?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    activities?: {}
    balance?: number;
    betslips?: {};
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    emailVerified: boolean;
    roles: Roles;
    transactions?: {};
}