import mongoose from 'mongoose'
import { server } from "./server";
import dotenv from 'dotenv';

import { APP_PORT, MONGO_ATLAS_URL } from './configs'

mongoose.connect(`${MONGO_ATLAS_URL}`)
    .then(res => console.log('Database connected.'))
    .catch(err => console.log(err));


server.listen(APP_PORT, () => console.log(`Server is running on port ${APP_PORT}`));

