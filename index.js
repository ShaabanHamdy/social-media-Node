import { config } from 'dotenv'
import express from 'express'
import initApp from './Src/Utils/initApp.js'
config({ path: './DB/Config/secret.env' })
const app = express()



initApp(app, express)