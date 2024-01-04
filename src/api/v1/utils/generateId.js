import { Snowflake } from "@theinternetfolks/snowflake";

export default function generateId(){
    return Snowflake.generate()
}