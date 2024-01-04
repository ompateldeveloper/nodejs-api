import mongoose, { Schema } from "mongoose";
import snowflakeId from "../utils/snowflakeId.js";

const roleSchema = new Schema({
    id: {
        type: String,
        default: snowflakeId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type:Date,
        default:Date.now
    },
    updated_at: {
        type:Date,
        default:Date.now
    },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
