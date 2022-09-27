import { IPost } from "../dtos/Post";
import { ICreatePostDTO } from "../usecases/CreatePost/ICreatePostDTO";

export interface IPostsRepository{

    save(post: ICreatePostDTO): Promise<IPost>;
}