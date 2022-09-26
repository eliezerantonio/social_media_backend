import { MailTrapMailPovider } from "../../providers/implementation/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgressUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapProvider= new MailTrapMailPovider();

const postgressUsersRepository= new PostgresUsersRepository();


const createUserUseCase= new CreateUserUseCase(postgressUsersRepository,mailTrapProvider);



const createUserController = new CreateUserController(createUserUseCase);


export {createUserController, createUserUseCase}