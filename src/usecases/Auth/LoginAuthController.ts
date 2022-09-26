import { Request, Response } from 'express';
import { LoginAuthUseCase } from './LoginAuthUseCase';


export class LoginController {

    async handle(request: Request, response: Response) {

        const { email, password } = request.body;

        const service = new LoginAuthUseCase();

        const result = await service.execute({
            email, password
        });

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}