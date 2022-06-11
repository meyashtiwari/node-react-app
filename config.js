import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

export const mongoAtlasURI = process.env.MONGO_ATLAS_URI;
export const port = process.env.PORT;