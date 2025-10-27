import {createServer} from "node:http";
import {parsBody} from "./tools.js";
import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
} from "./model/users.js";
import {emitter} from "./events/emitter.js";
import {myLogger} from "./events/logger.js";

const json = (res: any, code: number, data: unknown) => {
    res.writeHead(code, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(data));
};

const text = (res: any, code: number, msg: string) => {
    res.writeHead(code, {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    });
    res.end(msg);
};

const server = createServer(async (req, res) => {
    const {method, url} = req;
    const urlObj = new URL(url!, `http://${req.headers.host}`);
    const path = urlObj.pathname;

    if (method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        });
        return res.end();
    }

    if (method === "GET" && path === "/api/users") {
        return json(res, 200, getAllUsers());
    }

    if (method === "GET" && /^\/api\/users\/\d+$/.test(path)) {
        const id = parseInt(path.split("/").pop()!);
        const user = getUserById(id);
        if (!user) return text(res, 404, "User not found");
        return json(res, 200, user);
    }

    if (method === "POST" && path === "/api/users") {
        try {
            const body = (await parsBody(req)) as { id: number; userName: string };
            if (addUser(body)) {
                emitter.emit("user_added", body);
                return json(res, 201, {status: "created"});
            } else {
                return text(res, 409, "User already exists");
            }
        } catch {
            return text(res, 400, "Invalid JSON");
        }
    }

    if (method === "PUT" && /^\/api\/users\/\d+$/.test(path)) {
        const id = parseInt(path.split("/").pop()!);
        try {
            const body = (await parsBody(req)) as { userName: string };
            if (updateUser(id, body.userName)) {
                emitter.emit("user_updated", {id, userName: body.userName});
                return json(res, 200, {status: "updated"});
            } else {
                return text(res, 404, "User not found");
            }
        } catch {
            return text(res, 400, "Invalid JSON");
        }
    }

    if (method === "DELETE" && /^\/api\/users\/\d+$/.test(path)) {
        const id = parseInt(path.split("/").pop()!);
        const removed = deleteUser(id);
        if (!removed) return text(res, 404, "User not found");
        emitter.emit("user_removed", removed);
        return json(res, 200, {status: "deleted"});
    }

    if (method === "GET" && path === "/api/logs") {
        return json(res, 200, myLogger.getLogArray());
    }

    return text(res, 404, "Not found");
});

server.listen(3055, () => {
    console.log("Server is running on http://localhost:3055");
});