"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
class SocketService {
    constructor() {
        console.log("Init socket service...");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });
    }
    initListeners() {
        const io = this.io;
        console.log("Init socket listeners");
        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on("event:message", (_a) => __awaiter(this, [_a], void 0, function* ({ message }) {
                console.log("New Message received", message);
                try {
                    // Parse the message string to JSON object
                    const parsedMessage = JSON.parse(message);
                    // Check if parsed message has id and content properties
                    if (parsedMessage && parsedMessage.id && parsedMessage.content) {
                        const { data, error } = yield supabase.from('messages').insert([
                            {
                                author_id: parsedMessage.id,
                                content: parsedMessage.content
                            }
                        ]);
                        if (error) {
                            console.error('Error inserting message:', error.message);
                            return;
                        }
                        console.log('Message inserted successfully:', data);
                    }
                    else {
                        console.error('Parsed message does not have id and content properties.');
                    }
                }
                catch (error) {
                    console.error('Error handling message:', error);
                }
            }));
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
