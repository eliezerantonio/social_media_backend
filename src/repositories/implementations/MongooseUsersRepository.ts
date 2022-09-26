
import { IUser, IUserRequest, IUserUpdateRequest } from "../../dtos/User";
import User from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class MongooseUsersRepository implements IUsersRepository{

  private repository = User;

  async findByEmail(email: string): Promise<IUser>{
      const userExists = await this.repository.findOne({ email });
  
      return userExists;
  }

  async findById(id: string): Promise<IUser> {
      const userExists = await this.repository.findById(id);
      return userExists;
  }
      
      
  async save(user: IUserRequest): Promise<IUser> {
      const newUser = await this.repository.create(user)
      return newUser;
  }

  async update(email: string, user: IUserUpdateRequest): Promise<IUser> {
      const userUpdate = await this.repository.findOne({ email })
      
      userUpdate.name = user.name;

      const result = await userUpdate.save();
      return result;
  }

}