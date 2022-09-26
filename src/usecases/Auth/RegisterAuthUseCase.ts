import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRepository } from "../../repositories";
import { IUserRequest, IUserData, IUser } from "../../dtos/User";
import { SECRET } from '../../configs/app';




dotenv.config();


export class RegisterAuthUseCase {

    async execute ({ name, email, password }: IUserRequest): Promise<IUserData | Error> {


        const _repository = userRepository();

        const userExists = await _repository.findOne({ email });

        if (userExists) {
            return new Error('User already exists!');
        }


        const user = new _repository({
            name,
            email,
            password
        });

        const userSave = await user.save();

      
        const token = jwt.sign(
            {id: userSave._id, email: userSave.email},
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
}