import mongoose, { Schema } from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const userSchema = new Schema({
    id: {
        type: String,
        default: Snowflake.generate(),
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
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
