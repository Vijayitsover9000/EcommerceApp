import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)  
        console.log(`Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.blue)
    } catch (error) {
        console.log(`Error in mongodb${error}`.bgRed.white);
    }
}
export default connectDB;