import { Snowflake } from "@theinternetfolks/snowflake";
import { Schema } from "mongoose";
import generateId from "../utils/generateId.js";

const communitySchema = new Schema({
    id: {
        type: String,
        default: generateId(),
        required: true,
        // unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    owner: {
        type: String,
        required: true,
        ref: 'User',
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

const Community = mongoose.model("Community", communitySchema);

export default Community;
