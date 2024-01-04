import mongoose, { Schema } from "mongoose";
import snowflakeId from "../utils/snowflakeId.js";

const userSchema = new Schema({
    id: {
        type: String,
        default: snowflakeId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
});

const User = mongoose.model("User", userSchema);

export default User;
