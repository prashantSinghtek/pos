import { Config } from "@/constants/config";
import { Constants } from "@/constants/constants";
import rnAxios from "axios";


// console.log("Constants.X_API_KEY",Constants.X_API_KEY)

const axios = rnAxios.create({
  headers: {
    "x-api-key": Constants.X_API_KEY,
  },
 
  
});
// console.log("dddd", Config.X_API_KEY);

export default axios;
