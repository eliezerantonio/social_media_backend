import dotenv from 'dotenv'


dotenv.config()

const APP_PORT = process.env.APP_PORT;
const BASE_URL = process.env.BASE_URL;
const SECRET = process.env.SECRET;

export {
    APP_PORT,
    BASE_URL,
    SECRET
}