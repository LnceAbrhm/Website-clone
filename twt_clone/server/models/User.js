import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name :String,
    uname: String,
    pass: String,
    cmark: Boolean,
    followers : Array,
    followed : Array,
});

export const Users = mongoose.model('Users', userSchema);