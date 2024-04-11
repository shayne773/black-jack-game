// db.mjs
import mongoose from 'mongoose';
mongoose.connect(process.env.DSN);
const movieSchema = new mongoose.Schema({title:String, year:Number, director:String});
mongoose.model("movie", movieSchema);