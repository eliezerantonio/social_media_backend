import {Router} from 'express';
import { LoginController } from './usecases/Auth/LoginAuthController';
import { RegisterController } from './usecases/Auth/RegisterAuthController';
import { createUserController } from './usecases/CreateUser';

const router=Router();

router.post('/api/auth/login', new LoginController().handle)
router.post('/api/auth/register', new RegisterController().handle)


router.post('/api/users', (request, response) => {

return createUserController.handle(request, response);

});

export { router };