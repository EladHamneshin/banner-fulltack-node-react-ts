export interface UserInterface {
    _id?: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface LoginInterface {
    email: string;
    password: string;
}

export interface Response {
    success: boolean;
    data: {
        token: string,
        user: {
            id: string,
            name: string,
            email: string,
            password: string,
            isadmin: boolean
        }
    };
    message: string;
}