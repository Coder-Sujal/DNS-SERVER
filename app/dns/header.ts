import { Buffer } from "buffer";

export enum OPCODE {
    STANDARD_QUERY = 0,
    INVERSE_QUERY = 0,
    SERVER_STATUS_REQUEST = 0
}

export enum ResponseCode{
    NO_ERROR = 0,
    FORMAT_ERROR = 1,
    SERVER_FAILURE = 2,
    NAME_ERROR = 3,
    NOT_IMPLEMENTED = 4,
    REFUSE = 5
}

export interface TDNSheader{
    id : number,
    qr : number,
    opcode : OPCODE,
    aa : number,    // Authoritative Answer
    tc : number,    // TrunCation
    rd : number,    // Recursion Desired
    ra : number,    // Recursion Available
    z : number,     // Reserved
    rcode : ResponseCode,  // Response Code
    qdcount : number,  // Question Count 
    ancount :number,   // Answer Record Count
    nscount : number,  // Authority Record Count
    arcount : number,  // Additional Record Count
}

class DNSheader{
    static write(values : TDNSheader){
        const header = Buffer.alloc(12);
        const flags = values.qr | values.opcode | values.aa | values.tc | values.rd | values.ra | values.z | values.rcode;
        
        header.writeUInt32BE(values.id,0);
        header.writeUInt32BE(flags,2);
        header.writeUInt32BE(values.qdcount,4);
        header.writeUInt32BE(values.ancount,6);
        header.writeUInt32BE(values.nscount,8);
        header.writeUInt32BE(values.arcount,10);

        return header;
    }
}

export default DNSheader;