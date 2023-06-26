import mongoose from "mongoose";




const ConnectionDB = async (req, res, next) => {
    return await mongoose.connect(process.env.CONNECTION_ONLINE)
    .then(req => console.log('ConnectionDB is Running'))
    .catch(err => console.log({ message: 'fail in ConnectionDB', err }))
}


export default ConnectionDB