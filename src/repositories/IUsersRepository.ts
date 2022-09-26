import { IUser, IUserRequest, IUserUpdateRequest } from "../dtos/User";

export interface IUsersRepository{

    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
    update(name: string, hero: IUserUpdateRequest): Promise<IUser>;
    save(user: IUserRequest): Promise<IUser>;
    

}