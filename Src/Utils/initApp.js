import ConnectionDB from "../../DB/Connection.js"
import * as allRouters from '../Modules/app.router.js'
import { stackVar } from "./errorHandling.js"


const initApp = (app, express) => {
//========================================================    
    app.use(express.json())
    ConnectionDB()
    const port = process.env.PORT
   
//========================================================

//============================= app project routes ===================
    app.use(`/user` , allRouters.userRouter)
    app.use(`/authUser` , allRouters.authUserRouter)
    app.use(`/post` , allRouters.postRouter)
    app.use(`/comment` , allRouters.commentRouter)
   
//====== error global =======================================
    app.use((err, req, res, next) => {
        if (process.env.ENV_MOOD == 'dev') {
            return res.status(err['cause'] || 500).json({ message: "fail Response", Error: err.message, stack: stackVar })
        }
        res.status(err['cause'] || 500).json({ message: "fail Response", Error: err.message })

    })
    //==================================== handling  not found pages ====================
    app.get('/', (req, res) => res.send('Hello page'))
    app.use('/*', (req, res) => res.send('404 PAGE NOT FOUND'))
    
    //==============================================================
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default initApp