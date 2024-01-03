import {connect} from "mongoose";
export default function connectDB(){
    connect(process.env.URI || "idk what to connect anymore")
    console.log('database connected');

}
