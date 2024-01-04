import mongoose, { Schema } from "mongoose";
import snowflakeId from "../utils/snowflakeId.js";

const communitySchema = new Schema({
    id: {
        type: String,
        default: snowflakeId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
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
