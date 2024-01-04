import { Snowflake } from "@theinternetfolks/snowflake";

const snowflakeId = () => {
    return Snowflake.generate()
}
export default snowflakeId