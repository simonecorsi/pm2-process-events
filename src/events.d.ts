/// <reference types="node" />
export = Pm2ProcessEvents;
declare class Pm2ProcessEvents extends EventEmitter {
    constructor(socketPath?: string);
    socket: net.Socket;
    handler(data: any): void;
}
import { EventEmitter } from "events";
import net = require("net");
