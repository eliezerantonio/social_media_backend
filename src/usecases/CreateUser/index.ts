
import { MongooseUsersRepository } from "../../repositories/implementations/MongooseUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";


const mongooseUsersRepository= new MongooseUsersRepository();


const createUserUseCase= new CreateUserUseCase(mongooseUsersRepository,);


const createUserController = new CreateUserController(createUserUseCase);


export {createUserController, createUserUseCase}