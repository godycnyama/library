export class Message {
    statusCode: string;
    message: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
     }
}

export interface IMessage {
    statusCode: string;
    message: string;
}