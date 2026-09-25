import type {TokenPayload} from '../lib/token';

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }       
    }
}
export {};

