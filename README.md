# Node.js Notes

## Session 1: Node.js Introduction and Basics

### **What is Node.js?**

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is designed to build scalable network applications. Key features:

- **Non-blocking I/O**: Handles multiple requests efficiently.
- **Event-driven**: Uses event loop for concurrency.
- **Single-threaded**: Unlike traditional multithreaded systems.

### **What is a Database?**

A database is an organized collection of data stored electronically for efficient access, management, and updating.

### **Difference Between RAM and ROM**

- **RAM** (Random Access Memory): Temporary, volatile memory used for active processes.
- **ROM** (Read-Only Memory): Non-volatile, permanent memory storing firmware.

---

## History and Evolution

### **History of RDBMS**

- 1970s: Introduction of the relational model by E.F. Codd at IBM.
- 1980s: Rise of commercial systems like Oracle, SQL Server, and DB2.
- Focused on structured, tabular data with ACID compliance.

### **History of NoSQL**

- 2000s: Emerged with the need to handle unstructured data and scalability.
- Examples: MongoDB, Cassandra, DynamoDB.
- Prioritizes performance and flexibility over strict schema.

---

## MongoDB Connection Issues

### **Common Errors**

- **Invalid connection string**: Ensure it starts with `mongodb://` or `mongodb+srv://`.
- **Authentication failed**: Check credentials (username/password).
- **Not authorized on admin**: User does not have required permissions for the database.

**Solution:**
Verify your credentials, permissions, and the structure of your connection string.

### **Sample Connection String**

```plaintext
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

---

## Programming Concepts in Node.js

### **Difference Between Monolith and Microservices**

| Feature      | Monolith                | Microservices                     |
| ------------ | ----------------------- | --------------------------------- |
| Architecture | Single unified codebase | Divided into independent services |
| Scalability  | Vertical                | Horizontal                        |
| Deployment   | Entire application      | Service-by-service                |

### **What is REST API?**

Representational State Transfer (REST) is an architectural style for designing networked applications. Key principles:

- Stateless communication
- Use of HTTP methods
- Resource representation (JSON/XML)

### **HTTP Methods**

- **GET**: Retrieve data.
- **POST**: Submit data.
- **PUT**: Update data.
- **DELETE**: Remove data.

---

## Package Management in Node.js

### **Caret (****`^`****) vs Tilde (****`~`****)**

- **Caret (****`^`****)**: Updates to the latest minor version.
- **Tilde (****`~`****)**: Updates to the latest patch version.

### **Middleware in Express.js**

Middleware functions are executed in the request-response cycle. Uses:

- Logging
- Authentication
- Data parsing

### **Difference Between ****`app.use`**** and ****`app.all`**

| Feature | `app.use`                            | `app.all`               |
| ------- | ------------------------------------ | ----------------------- |
| Purpose | Middleware for all requests          | Handle all HTTP methods |
| Usage   | Pre-process requests (e.g., logging) | Handle specific routes  |

---

## JSON vs JavaScript Object

| Feature | JavaScript Object                     | JSON                          |
| ------- | ------------------------------------- | ----------------------------- |
| Syntax  | Flexible (functions, symbols allowed) | Strict (only key-value pairs) |
| Usage   | Runtime, dynamic                      | Data exchange format          |

---

## Import and Export in Node.js

### **Why Important?**

- Code reusability
- Modularity
- Dependency management

### **Syntax**

#### CommonJS:

```javascript
// Exporting
module.exports = { func1, func2 };

// Importing
const { func1, func2 } = require('./module');
```

#### ES Modules:

```javascript
// Exporting
export const func1 = () => {};

// Importing
import { func1 } from './module.js';
```

---

### Express.js Request Handling

Express.js uses a middleware stack to process requests. When a request is received:

1. Middleware functions execute sequentially.
2. Routes match the request URL and HTTP method.
3. Response is sent back to the client.

---


## What’s an IIFE?
### Answer:
**IIFE (Immediately Invoked Function Expression)** is a JavaScript function that is executed as soon as it is defined. It is commonly used to create a private scope and avoid polluting the global namespace.

### Syntax:
```javascript
(function() {
    console.log("IIFE executed!");
})();
```

### Example:
```javascript
const result = (function(a, b) {
    return a + b;
})(5, 3);

console.log(result); // Output: 8
```

### Why Use IIFE?
- To create a private scope.
- To avoid variable collisions.
- Useful in modular programming.

---

## How Are Variables and Functions Made Private in Different Modules?
### Answer:
In Node.js, variables and functions can be made private by not exporting them. Only the properties and methods added to `module.exports` are accessible from other modules.

### Example:
**`math.js`**
```javascript
// Private variable (not exported)
const PI = 3.14;

// Public function (exported)
module.exports.calculateCircumference = function(radius) {
    return 2 * PI * radius;
};
```

**`app.js`**
```javascript
const math = require('./math');

console.log(math.calculateCircumference(5)); // Output: 31.4
// console.log(math.PI); // Error: PI is not defined
```

---

## How Do You Get Access to `module.exports`?
### Answer:
In Node.js, you can access the `module.exports` object using the `require()` function.

### Example:
**Exporting:**
```javascript
// greet.js
module.exports = function(name) {
    return `Hello, ${name}!`;
};
```

**Importing:**
```javascript
// app.js
const greet = require('./greet');
console.log(greet('Parmeshwar')); // Output: Hello, Parmeshwar!
```

---

---

## **What is libuv?**
- A cross-platform library for asynchronous I/O.  
- Core component of Node.js enabling non-blocking, event-driven architecture.  
- Initially designed for Node.js, now used in other projects too.

---

## **Key Features**
1. **Event Loop**: Efficiently manages tasks asynchronously.  
2. **Asynchronous I/O**: Handles non-blocking operations (e.g., file system, networking).  
3. **Cross-Platform**: Abstracts OS-specific operations (Windows, macOS, Linux).  
4. **Thread Pool**: Executes blocking tasks like file I/O in separate threads.

---

## **Core Components**
1. **Event Loop**: Manages events and delegates tasks.  
2. **Thread Pool**: Handles blocking operations in a pool of threads (default: 4).  
3. **Platform Abstraction Layer**: Ensures compatibility across OSes.

---

## **How libuv Works**
1. **Task Delegation**:
   - Non-blocking tasks handled in the event loop.  
   - Blocking tasks sent to the thread pool.

2. **Event Loop Phases**:
   - **Timers**: Executes `setTimeout` and `setInterval` callbacks.  
   - **I/O Polling**: Waits for and processes I/O events.  
   - **Close Callbacks**: Cleans up resources like sockets.

3. **Thread Pool**:
   - Executes blocking operations (e.g., file I/O, DNS lookups).

---

## **libuv and Node.js**
- **Non-blocking I/O**: Allows handling multiple operations simultaneously.  
- **Timers**: Manages `setTimeout` and `setInterval`.  
- **Event-Driven Model**: Essential for scaling Node.js applications.  

---

## **Advantages**
1. Efficient for I/O operations.  
2. Scalable: Handles thousands of concurrent connections.  
3. Cross-platform compatibility.  
4. Foundation of Node.js’s non-blocking architecture.

---

## **Example in Node.js**
```javascript
const fs = require('fs');

fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});
console.log('Reading file...');
```
---

## **V8 Engine**

- **Definition**:  
  V8 is Google's high-performance JavaScript engine. It powers Chrome and Node.js.
- **Features**:  
  - Written in C++.
  - Converts JavaScript code into machine code directly (just-in-time compilation).
  - Manages memory allocation and garbage collection.

---

## **JavaScript: Type of Language**
- **Type**:  
  - High-level, interpreted, and dynamically typed.
  - Scripting language mainly for web development.
  - Event-driven and non-blocking.

---

## **Difference Between Interpreter and Compiler**
| **Aspect**      | **Interpreter**                        | **Compiler**                      |
|------------------|---------------------------------------|-----------------------------------|
| **Execution**    | Executes code line-by-line.           | Converts the whole code to machine code before execution. |
| **Speed**        | Slower, as it processes line-by-line. | Faster, as the entire code is precompiled. |
| **Error Handling**| Stops at the first error.             | Reports all errors at compilation. |

---

## **JavaScript: Compiler or Interpreter?**
- **Type**:  
  JavaScript uses a combination:
  - Traditionally interpreted.
  - Modern engines (like V8) compile JavaScript to machine code for better performance.

---

## **TCP/IP, FTP, UDP, SMTP**
| **Protocol**  | **Definition**                                                                 |
|---------------|-------------------------------------------------------------------------------|
| **TCP/IP**    | Transmission Control Protocol/Internet Protocol. Basis for internet communication, ensures reliable data delivery. |
| **FTP**       | File Transfer Protocol. Used to transfer files over a network.               |
| **UDP**       | User Datagram Protocol. Connectionless, faster but less reliable than TCP.   |
| **SMTP**      | Simple Mail Transfer Protocol. Used to send emails.                          |

---

## **Sockets vs WebSockets**
| **Feature**    | **Sockets**                                     | **WebSockets**                                  |
|----------------|------------------------------------------------|-----------------------------------------------|
| **Definition** | Endpoints for sending/receiving data over a network. | Full-duplex communication protocol over TCP.   |
| **Communication** | Half-duplex (client/server takes turns).       | Full-duplex (simultaneous data transfer).      |
| **Use Case**   | Low-level networking, general data transfer.    | Real-time web apps like chat applications.    |

---

## **Types of Databases and Examples**
| **Type**                | **Definition**                                                   | **Examples**               |
|-------------------------|-----------------------------------------------------------------|---------------------------|
| **Relational (RDBMS)**   | Organizes data into tables with rows and columns.               | MySQL, PostgreSQL          |
| **NoSQL**                | Flexible schemas, suitable for large-scale data.                | MongoDB, Cassandra         |
| **Key-Value Store**      | Data is stored as key-value pairs.                              | Redis, DynamoDB            |
| **Document Store**       | Data stored in JSON-like documents.                             | MongoDB, CouchDB           |
| **Graph Database**       | Focuses on relationships between data.                          | Neo4j, OrientDB            |
| **Columnar Database**    | Stores data in columns instead of rows.                         | Apache Cassandra, HBase    |

---

## **Codd's 12 Rules**

# **Monolithic vs Microservices Architecture**

This document outlines the key differences between Monolithic and Microservices architectures.

## **Key Differences**

| **Aspect**                  | **Monolithic Architecture**                                               | **Microservices Architecture**                                           |
|-----------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Definition**              | A single unified application where all components are tightly coupled.   | A collection of small, independent services that communicate via APIs.   |
| **Scalability**             | Difficult to scale specific parts; requires scaling the entire system.   | Easier to scale individual services based on demand.                     |
| **Deployment**              | Entire application is deployed as a single unit.                        | Each service can be deployed independently.                              |
| **Development**             | Single codebase; changes affect the entire system.                      | Independent codebases; changes are isolated to individual services.      |
| **Fault Tolerance**         | A failure in one component can bring down the entire application.       | Failures are isolated; only the affected service is impacted.            |
| **Technology Stack**        | Limited to a single tech stack for the entire app.                      | Different services can use different technologies.                       |
| **Maintenance**             | Harder to maintain and debug due to code complexity.                    | Easier to maintain since each service has a focused responsibility.      |
| **Communication**           | Internal function calls within the application.                        | Services communicate over APIs, often using HTTP/REST or messaging queues.|
| **Team Structure**          | Requires a large team working on a single codebase.                    | Smaller, independent teams work on different services.                   |
| **Use Cases**               | Suitable for small, simple applications.                               | Ideal for large, complex, and scalable systems.                          |

---

## **Examples**

### **Monolithic Architecture**  
Traditional e-commerce platforms where the product listing, cart, and user management are all part of the same application.  

### **Microservices Architecture**  
Amazon, where the product catalog, payment, and shipping services operate independently.

---

## **When to Choose What?**
- **Monolithic**: Best for small, straightforward projects with low complexity.  
- **Microservices**: Best for large, complex, and scalable systems requiring flexibility and resilience.

---

#  TechTinder Project Started 📁

## 1. High-Level Design (HLD) vs Low-Level Design (LLD)
| **Aspect**                | **High-Level Design (HLD)**                     | **Low-Level Design (LLD)**                    |
|---------------------------|------------------------------------------------|-----------------------------------------------|
| **Focus**                 | Overall system architecture.                   | Detailed component design.                    |
| **Representation**        | Diagrams like flowcharts and block diagrams.   | Code-level class diagrams, method details.    |
| **Audience**              | Architects, stakeholders.                     | Developers and testers.                       |
| **Timeframe**             | Early stages of the project.                  | Post HLD, before implementation.              |
| **Example**               | System architecture overview.                 | Internal logic of a database service.         |

---

## 2. REST API
**Definition**: Representational State Transfer (REST) is an architectural style for building APIs.

### **Key Features**
- Stateless communication.
- Uses standard HTTP methods (GET, POST, PUT, DELETE, PATCH).
- Resources identified via URIs (e.g., `/users/1`).
- Returns structured data, often in JSON or XML format.

---

## 3. Difference Between PUT and PATCH
| **Aspect**          | **PUT**                              | **PATCH**                             |
|----------------------|--------------------------------------|---------------------------------------|
| **Purpose**          | Replaces the entire resource.       | Partially updates the resource.       |
| **Request Body**     | Contains the complete updated resource. | Contains only the fields to update.   |
| **Idempotence**      | **Idempotent**: Same result on repeated requests. | **Idempotent**: Same result on repeated requests. |
| **Use Case**         | Update/replace the entire object.   | Modify specific fields of the object. |
| **Impact on Resource** | Overwrites all fields, including unmentioned ones. | Updates specified fields only.        |

---

### **Examples**

#### **PUT Request**
```http
PUT /api/users/1 HTTP/1.1
Content-Type: application/json

{
  "id": 1,
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "age": 26
}
```

#### **PATCH Request**
```
PATCH /api/users/1 HTTP/1.1
Content-Type: application/json

{
  "email": "johnsmith@example.com"
}
```

##  Use of `+`, `*`, and `?` in Routing

In Express.js, special characters like `+`, `*`, and `?` are used to define dynamic and flexible routes.

### **Explanation**
- **`+`**: Matches one or more occurrences of the preceding character or group.
  ```javascript
  app.get('/a+', (req, res) => {
    res.send('Route matched /a+');
  });
  ```
- **`*`**: Matches zero or more occurrences of the preceding character or group.

  ```javascript
  app.get('/a*', (req, res) => {
  res.send('Route matched /a*');
  });
  ```
- **`?`**: Makes the preceding character optional.
  ```javascript
  app.get('/colou?r', (req, res) => {
  res.send('Matched color or colour');
  });
  ```


# Regex in Express.js Routing

Regular expressions (Regex) are a powerful way to define and match URL patterns in Express.js routes. They allow for dynamic, flexible, and precise route definitions.

---

## **What is Regex?**

Regex is a sequence of characters that form a search pattern, often used for string matching and validation.

In Express.js, you can use regex to define routes by passing a regex pattern as the first parameter in the `app.get`, `app.post`, etc., methods.

---

## **Regex Syntax in Routing**

### 1. **Basic Matching**
   - Matches any route containing the specified pattern.
   ```javascript
   app.get(/abc/, (req, res) => {
     res.send('Matched any URL containing "abc"');
   });
   ```

### 2. **Anchors**
   - ^: Matches the start of the string.
   - $: Matches the end of the string.
   
   ```javascript
   app.get(/^abc$/, (req, res) => {
  res.send('Exact match for "abc"');
   });
   ```
### 3. **Wildcards**
   - : Matches any single character.
   - *: Matches zero or more occurrences of any character.

   ```javascript
   app.get(/a.c/, (req, res) => {
  res.send('Matched any URL with "a", any character, and "c"');
   });
   ```

### 4. **Character Classes**
### 5. **Quantifiers**
### 6. **Groups**
### 7. **Named Capture Groups**


# Why Use Regex in Routing?
- Flexibility: Handles complex URL structures.
- Validation: Ensures strict matching of URL patterns.
- Dynamic Routing: Enables dynamic route creation.
- Something TO add on Git
