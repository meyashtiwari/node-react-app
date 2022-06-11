import mongoose from 'mongoose';
import { mongoAtlasURI } from '../../config.js';
import Transaction from '../models/transactionModel.js';

const mongoConnectionURL = mongoAtlasURI;

const connectDB = async () => {
    try {
        const con = await mongoose.connect(mongoConnectionURL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true            
        });
        console.log(`Database connected : ${con.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;