import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionToDatabase = async (): Promise<void> => {
  try {
    const URI_DB: string = `mongodb+srv://${process.env.DB_USER_LOGIN}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_DATABASE}.mongodb.net/`;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
    };

    await mongoose.connect(URI_DB, options);
    console.log("💾[database]: MongoDB connection successful.");
  } catch (error) {
    console.error(`💾[database]: MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectionToDatabase;
