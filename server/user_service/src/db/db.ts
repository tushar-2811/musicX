import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_URI as string , {
        dbName : DB_NAME
      });
      console.log(`\n MongoDB Connected :: Db Host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB CONNECTION FAILED" , error);
        process.exit(1);
    }
}

export default connectDB;