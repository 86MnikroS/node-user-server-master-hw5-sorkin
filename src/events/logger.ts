import { appendFileSync, writeFileSync } from "node:fs";
import { emitter } from "./emitter.js";

class MyLogger {
    private logs: string[] = [];
    private logFile = "logs.txt";

    constructor() {
        writeFileSync(this.logFile, "", "utf8");
        emitter.on("user_added", (data) => this.save(`User added: ${JSON.stringify(data)}`));
        emitter.on("user_removed", (data) => this.save(`User removed: ${JSON.stringify(data)}`));
        emitter.on("user_updated", (data) => this.save(`User updated: ${JSON.stringify(data)}`));
    }

    save(message: string) {
        const timestamp = new Date().toLocaleString();
        const entry = `${timestamp} - ${message}`;
        this.logs.push(entry);
        console.log(entry);

        appendFileSync(this.logFile, entry + "\n", "utf8");
    }

    getLogArray() {
        return this.logs;
    }
}

export const myLogger = new MyLogger();