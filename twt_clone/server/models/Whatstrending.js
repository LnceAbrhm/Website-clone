import mongoose from "mongoose";

const trendingSchema = mongoose.Schema({
    id : Number,
    type : String,
    title: String,
    total: Number,
    location: String,
});

export const Trending = mongoose.model('Trending', trendingSchema);