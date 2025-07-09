import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI){
  throw new Error("Please define mongo env var")
}

const connectToDatabase = async ()=>{
  if(mongoose.connection.readyState===1){
    return mongoose;
  }
  const opts = {
    bufferCommands: false,
  }

  await mongoose.connect(MONGODB_URI!, opts);
  return mongoose;
}

export default connectToDatabase