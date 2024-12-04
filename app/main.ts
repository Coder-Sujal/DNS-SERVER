import DNSheader, { TDNSheader,OPCODE,ResponseCode } from './dns/header';
const dgram = require('dgram');

const defautlHeaders:TDNSheader = {
     id : 1234,
     qr : 1,
     opcode : OPCODE.STANDARD_QUERY,
     aa : 0,
     tc : 0,
     rd : 0,
     ra : 0,
     z : 0,
     rcode : ResponseCode.NO_ERROR,
     qdcount : 0,
     ancount : 0,
     nscount : 0,
     arcount : 0,
     
}

const udpSocket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (buf, rinfo) => {
  try {
    const header = DNSheader.write(defautlHeaders);
    const response = header;
    udpSocket.send(response, rinfo.port, rinfo.address);
  } catch (e) {
    console.log(`Error receiving data: ${e}`);
  }
});

udpSocket.on("error", (err) => {
  console.log(`Error: ${err}`);
});

udpSocket.on("listening", () => {
  const address = udpSocket.address();
  console.log(`Server listening ${address.address}:${address.port}`);
});
