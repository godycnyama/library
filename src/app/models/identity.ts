export class Identity {
    token: string;
    role: string;
    userID: number;
    userEmail: string;
    passwordTemporary: boolean;
    passwordTemporaryTTL: number;
    message: string;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
     }
}

export interface IIdentity {
    token: string;
    role: string;
    userID: number;
    userEmail: string;
    passwordTemporary: boolean;
    passwordTemporaryTTL: number;
    message: string;
}
