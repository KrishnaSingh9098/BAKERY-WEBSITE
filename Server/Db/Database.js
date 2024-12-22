import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Database Successfully Connected  "BEEDU"');
        });
        
        await mongoose.connect(`${process.env.MONGODB_URI}/MAMA@BAKERS`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default connectDatabase;  // Exporting the function using ES module syntax
