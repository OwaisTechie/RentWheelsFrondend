class IPAddress {
    ipaddress;
    setIp(ip) {
      this.ipaddress = ip;
    }
    getIp() {
      return this.ipaddress;
    }
  }
  const ip = new IPAddress();
  
  export default ip;

  