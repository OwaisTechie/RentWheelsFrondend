import {useSelector} from 'react-redux';
// import ip from "../Config/IpAddress";

// console.log("GET IP =>> ",ip.getIp())
export function getLocalHost(image) {
  var http = image.split('//')[0] + '//';
  var removeLocalHost = image.split('//')[1].split('/').slice(1).join('/');
  // var Convert = http +ip.getIp()+':8000/'+removeLocalHost
  var Convert =
    'https://rent-wheels.netlify.app/.netlify/functions/app/api/v1/' +
    removeLocalHost;
  // var Convert = http +'192.168.43.197:8000/'+removeLocalHost
  return Convert;
}
