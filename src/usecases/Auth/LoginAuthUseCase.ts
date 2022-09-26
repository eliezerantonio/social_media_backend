import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRepository } from '../../repositories';
import { IUserLogin, IUserData } from '../../dtos/User';
import { SECRET } from '../../configs/app';


dotenv.config();



export class LoginAuthUseCase {

    async execute ({email, password}: IUserLogin): Promise<IUserData | Error> {
        const _repository = userRepository(); 

        const user = await _repository.findOne({ email }).select(
            "+password"
        );

        if (!user) {
            return new Error("User doesn't exists");
        }

        const validate = await user.validatePassword(password);

       if (validate) {

            const token = jwt.sign(
                {id: user._id, email: user.email},
               SECRET,
                { expiresIn: "2h" }
            );
           
            return {
               
                id: user._id,
                email: user.email,
                name: user.name,
                token: `Bearer ${token}`
            }
       }

       return new Error("User unauthorized");
    }
}