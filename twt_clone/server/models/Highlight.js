import mongoose from "mongoose";

const highlightsSchema = mongoose.Schema({
    id : String,
    type : String,
    title : String,
    date : String,
    franchise: String,
});

export const Highlights = mongoose.model('Highlights', highlightsSchema);