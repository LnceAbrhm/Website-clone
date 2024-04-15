import mongoose from "mongoose";

const trendingSchema = mongoose.Schema({
    id : String,
    type : String,
    title: String,
    total: Number,
    location: String,
});

export const Trendings = mongoose.model('Trendings', trendingSchema);