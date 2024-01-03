import { Snowflake } from "@theinternetfolks/snowflake";
import { Schema } from "mongoose";

const memberSchema = new Schema({
    id: {
        type: String,
        default: Snowflake.generate(),
        required: true,
        unique: true,
    },
    community: {
        type: String,
        required: true,
        ref: 'Community',
    },
    user: {
        type: String,
        required: true,
        ref: 'User',
    },
    role: {
        type: String,
        required: true,
        ref: 'Role',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
