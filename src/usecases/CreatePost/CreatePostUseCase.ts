import { IPostsRepository } from "../../repositories/IPostRepository";
import { ICreatePostDTO } from "./ICreatePostDTO";

export class CreateuserUseCase{

    constructor(private postsRepository:IPostsRepository){}

    async execute(data:ICreatePostDTO){
     await this.postsRepository.save(data);

    }

}