import mongoose from "mongoose";

const statusSchema = mongoose.Schema({
    id : String,
    uname : String,
    status: String,
    likes: Number,
    repost: Number,
    comments: Number,
    createdAt: String,
    updatedAt: String,
});

export const Status = mongoose.model('Status', statusSchema);
