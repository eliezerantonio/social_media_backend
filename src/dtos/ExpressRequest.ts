import { Request } from 'express';
import { UserDocument } from './User';

export interface IExpressRequest extends Request {
    user?: UserDocument;
}