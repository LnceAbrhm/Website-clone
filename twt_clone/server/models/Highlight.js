import mongoose from "mongoose";

const HighlightsSchema = mongoose.Schema({
    id : Number,
    type : String,
    title : String,
    date : String,
    franchise: String,
});

export const Highlights = mongoose.model('Highlights', HighlightsSchema);