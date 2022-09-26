import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET } from "../configs/app";

import { IExpressRequest } from "../dtos/ExpressRequest";
import { userRepository } from "../repositories";



export const ensuredAuthenticated = () => {

    return async (
        request: IExpressRequest,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const authHeader = request.headers.authorization;

            if (!authHeader) {
                return response.status(401).json({ error: 'Token is missing'});
            }

            const _repository = userRepository();

            const [, token] = authHeader.split(" ");
            const data = jwt.verify(token, SECRET) as {email: string, id: string};
            const user = await _repository.findById(data.id);
            
            if (!user) {
                return response.status(401).json({ error: 'Token is invalid.'});
            }

            request.user = user;
            next();
        } catch(err) {
            return response.status(401).json({ error: err})
        }
    }
}

export const currentUser = () => {
    return async (request: IExpressRequest, response: Response) => {
    if (!request.user) {
      return response.sendStatus(401);
    }
    const { user } = request;
    const token = jwt.sign(
        {id: user._id, email: user.email},
         SECRET,
        { expiresIn: "2h" }
    );
        
    const userCurrent = {
        id: user._id,
        email: user.email,
        username: user.name,
        token
    }
    response.send(userCurrent);
  };
}

