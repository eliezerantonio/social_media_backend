// import { Request, Response } from 'express'
// import { CreatePostUseCase } from "./CreatePostUseCase";
// import { cloudinary } from '../../providers/CloudinaryService';
// import User from '../../entities/User';
// export class CreatePostController {

//     constructor(private createPostUseCase: CreatePostUseCase) {



//     }
//     async handle(resquest: Request, response: Response): Promise<Response> {
//         const { name, email, password } = resquest.body;
//         let path = "";

//         try {

//             if (resquest?.files) {

//                 const { id } = resquest.user;
//                 const userExists = await User.findById(id);
            
//                 if (!userExists) {
//                   return response.status(404).json({ message: "User doesn't exists!" });
//                 }

//                 const { photo } = resquest?.files;
//                 await cloudinary.uploader.upload(photo.tempFilePath, (err, result) => {
//                     if (err) {
//                         return response.status(404).json({ message: "Error uploading: " + err });
//                     }
//                     path += result.url;
//                 });

//                 const data = await this.createPostUseCase.execute({ name, email, password });
//                 return response.status(201).json(data);
//             }




//         } catch (err) {
//             return response.status(400).json({
//                 message: err.message || 'Unexpected error.'
//             })
//         }
//     }
// }






