import { config } from '../data/config';
import jwt from 'jsonwebtoken';

export const calcTokenIdMail = (id: string, expiration: boolean,permissions:number) => {
    return jwt.sign({ id,permissions }, config.jwtkey, { expiresIn: expiration ?  "14d":'1d'  });
};


