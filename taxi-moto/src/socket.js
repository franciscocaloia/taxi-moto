import { io } from "socket.io-client";
console.log(import.meta.env.VITE_API_HOST);
export const socket = io(import.meta.env.VITE_API_HOST);
