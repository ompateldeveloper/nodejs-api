import mongoose, { Schema } from "mongoose";
import generateId from "../utils/generateId.js";

const roleSchema = new Schema({
    id: {
        type: String,
        default: generateId(),
        required: true,
        // unique: true,
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
