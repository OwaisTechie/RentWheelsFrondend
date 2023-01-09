import { useSelector } from "react-redux";
import ip from "../Config/IpAddress";

// console.log("GET IP =>> ",ip.getIp())
export function getLocalHost(image) {
  var http = image.split("//")[0]+"//";
  var removeLocalHost= image.split("//")[1].split('/').slice(1).join('/');
  // var Convert = http +ip.getIp()+':8000/'+removeLocalHost 
  var Convert = http +'10.0.112.106:8000/'+removeLocalHost 
    return Convert;
  }