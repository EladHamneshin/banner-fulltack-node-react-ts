export interface UserInterface {
    _id?: string;
    name: string;
    email: string;
    password: string;
    isadmin: boolean;
}

export interface LoginInterface {
    email: string;
    password: string;
}

export interface Response {
    success: boolean;
    data?: {
            id: string,
            name: string,
            email: string,
            password: string,
            isadmin: boolean
    };
    message: string;
}