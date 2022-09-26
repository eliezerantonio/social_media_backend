import dotenv from 'dotenv'


dotenv.config()

const APP_PORT = process.env.APP_PORT;
const BASE_URL = process.env.BASE_URL;

export {
    APP_PORT,
    BASE_URL
}