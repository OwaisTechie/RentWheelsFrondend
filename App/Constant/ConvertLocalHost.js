import { useSelector } from "react-redux";

const {ipAddress} = useSelector(state => state?.auth);
export function getLocalHost(image) {
    const Convert = image?.replace('localhost', ipAddress)
    return Convert;
  }