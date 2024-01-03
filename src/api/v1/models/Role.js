import { Schema } from "mongoose";
import { Snowflake } from "@theinternetfolks/snowflake";

const roleSchema = new Schema({
    id: {
        type: String,
        default: Snowflake.generate(),
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
