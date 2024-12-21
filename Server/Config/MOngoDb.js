import mongoose from "mongoose";

const connectTODFB = async () =>{
    await mongoose.connect(`${process.env.MONGODB_URI}/MAMA@BAKERS`)
}