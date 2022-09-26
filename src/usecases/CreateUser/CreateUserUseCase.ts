//implementacao da criacao do usuario , nao sabe onde estao armazeandos dos usuario,
//logica desacolpada 

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{

    constructor(private usersRepository:IUsersRepository){}

    async execute(data:ICreateUserRequestDTO){
        const userAlreadyExists=await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const result = await this.usersRepository.save(data);

        return result;
    }
}