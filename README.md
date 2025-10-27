#  Node User Server Sorkin

A learning project built with **Node.js + TypeScript**, demonstrating **EventEmitter** and a **custom logger**.

---

##  Features

- REST API for user management
- Full CRUD operations:  
  `GET`, `POST`, `PUT`, `DELETE`
- Event logging (`user_added`, `user_updated`, `user_removed`)
- Two logging levels:
  - In-memory array
  - Log file (`logs.txt`)
- CORS support
- Postman collection for API testing

---

## Technologies

- Node.js (HTTP server without Express)
- TypeScript
- EventEmitter
- File System (for log persistence)
- Postman

---

##  Project Structure

```
src/
  app.ts             # main server
  tools.ts           # request body parser
  events/
    emitter.ts       # EventEmitter instance
    logger.ts        # logger with file writing
  model/
    users.ts         # user model
postman_collection.json  # Postman API collection
logs.txt             # generated automatically at runtime
```
