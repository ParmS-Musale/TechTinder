# Node.js Notes

## Session 1: Node.js Introduction and Basics

### **What is Node.js?**

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is designed to build scalable network applications. Key features:

- **Non-blocking I/O**: Handles multiple requests efficiently.
- **Event-driven**: Uses event loop for concurrency.
- **Single-threaded**: Unlike traditional multithreaded systems.

### **What is a Databases?**

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



# Middleware in Express.js

Middleware is a fundamental concept in Express.js, enabling the processing of requests and responses in a modular and reusable manner. 

---

## **What is Middleware?**

Middleware functions are functions that have access to the request (`req`) and response (`res`) objects, as well as the next middleware function in the application’s request-response cycle.

---

## **Purpose of Middleware**

1. **Code Reusability**: Break down logic into reusable functions.
2. **Request Processing**: Modify requests before they reach route handlers.
3. **Response Handling**: Manipulate responses before sending them to the client.
4. **Error Handling**: Centralize error management.

---

## **Syntax of Middleware**

```javascript
app.use((req, res, next) => {
  console.log('Middleware executed!');
  next(); // Pass control to the next middleware or route handler
});
```

# Middleware Execution Flow
- A request enters the application.
- Middleware is executed in the order it is defined.
- Control is passed to the next middleware using next().
- If no middleware handles the request, a 404 response is returned.

# Key Features
- Middleware can terminate the request-response cycle or pass control to the next middleware.
- They enable features like logging, authentication, and data parsing.


# How Express.js Handles Requests Behind the Scenes

Express.js is a lightweight framework for Node.js that simplifies the process of building web applications by managing incoming HTTP requests and outgoing responses.

---

## **Overview of Request Handling**

When a request is made to an Express.js application:
1. Express.js starts by initializing the application.
2. Middleware functions are processed in the order they are defined.
3. The framework matches the request to the defined routes.
4. It sends a response back to the client.

---

## **Request Handling Process**

### 1. **Middleware Execution**
- Middleware functions have access to:
  - The incoming request (`req`) object.
  - The outgoing response (`res`) object.
  - The `next()` function to pass control to the next middleware.
- Middleware can:
  - Log requests.
  - Parse incoming data (e.g., JSON or form data).
  - Authenticate or validate users.

---

### 2. **Routing**
- Express checks the request's **URL** and **HTTP method** to find a matching route.
- If a route matches:
  - The associated callback or controller is executed.
- If no route matches:
  - A `404 Not Found` response is sent.

**Example**:
```javascript
app.get('/home', (req, res) => {
  res.send('Welcome to the Home Page');
});
```

### 4. **Built-In Middleware**
  - Express uses built-in middleware to handle common tasks like:- If a route matches:
  - Serving static files: express.static().
  - Parsing incoming JSON payloads: express.json().
  
  **Example**:
```javascript
app.use(express.json());
```

### 5. **Error Handling**
  - If an error occurs, Express skips remaining middleware and routes.
  - The error is passed to error-handling middleware
    
  **Example**:
```javascript
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Internal Server Error');
});

```
### 6. **Request Lifecycle**
  - The lifecycle of a request in Express.js involves:
  - Receiving the Request: A client makes an HTTP request.
  - Middleware Processing: Each middleware function runs in sequence.
  - Route Matching: The request is matched to a route or a 404 error is returned.
  - Sending the Response: The server sends a response back to the client.


  # Difference Between `app.use` and `app.all` in Express.js

When working with Express.js, it’s essential to understand the difference between `app.use` and `app.all`, as both are used to handle requests but in different ways.

---

## **Key Differences**

| Feature         | `app.use`                                       | `app.all`                                     |
|------------------|------------------------------------------------|----------------------------------------------|
| **Purpose**      | Applies middleware globally or to specific routes. | Handles all HTTP methods for a specific route. |
| **Scope**        | Middleware for any route or a specific route.   | Specific to the route defined.               |
| **HTTP Methods** | Applies to all HTTP methods.                   | Handles all HTTP methods for a defined route. |
| **Use Case**     | Logging, authentication, parsing, etc.         | Pre-processing or handling all requests to a route. |

---


# **Difference Between JSON and JavaScript**

This document highlights the key differences between JSON (JavaScript Object Notation) and JavaScript in a clear tabular format, along with examples.

---

## **Comparison Table**

| **Aspect**              | **JSON**                                                                 | **JavaScript**                                              |
|--------------------------|------------------------------------------------------------------------|------------------------------------------------------------|
| **Definition**           | JSON (JavaScript Object Notation) is a lightweight data interchange format. | JavaScript is a programming language used to create dynamic web content. |
| **Data Format**          | JSON is a text-based data format for storing and transmitting data.    | JavaScript includes variables, functions, objects, and more for computation. |
| **Structure**            | Follows a strict syntax for key-value pairs, e.g., `{ "key": "value" }`. | Objects and variables can follow a less strict syntax.    |
| **Type**                 | JSON is purely a **data format** and not executable code.              | JavaScript is executable code used to implement logic.      |
| **Support for Functions**| JSON does not support functions or methods.                           | JavaScript supports functions, objects, and methods.        |
| **Usage**                | Used for data exchange between systems (e.g., APIs).                  | Used for writing logic and interacting with web applications. |
| **String Quotes**        | Keys and values must be enclosed in **double quotes** (`" "`).         | Keys don’t require quotes unless they contain special characters. |
| **Parsing**              | Requires `JSON.parse()` or `JSON.stringify()` to convert to/from JavaScript objects. | Native to JavaScript and doesn’t need parsing.              |

---

## **Examples**

### **JSON Example**:
```json
{
  "name": "Parmeshwar",
  "age": 20,
  "isStudent": true
}
```
### **JavaScript Example**:
```javascript
const person = {
  name: "Parmeshwar",
  age: 20,
  isStudent: true,
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
```

## **What is Hashing?**

- **Definition**: 
  Hashing is a process that converts input data (of any size) into a fixed-size string of characters, which is typically a hash value. This is achieved using a hashing algorithm.
  
- **Purpose**:
  - Data integrity verification.
  - Efficient data retrieval.
  - Password storage.
  - Digital signatures.

### **Types of Hashing**

| **Hashing Type**            | **Description**                                                                                     |
|-----------------------------|-----------------------------------------------------------------------------------------------------|
| **MD5 (Message Digest 5)**  | Produces a 128-bit hash value. Fast but considered insecure due to vulnerabilities to collisions.    |
| **SHA (Secure Hash Algorithm)** | Variants like SHA-1, SHA-256, and SHA-512 are widely used for secure hashing in cryptography.          |
| **CRC (Cyclic Redundancy Check)** | Used in error-detection algorithms for network transmissions and file storage.                      |
| **Bcrypt**                  | Designed for password hashing. Involves salting to make it more secure.                             |
| **Argon2**                  | A memory-intensive password hashing algorithm, winner of the Password Hashing Competition (PHC).    |
| **PBKDF2**                  | Uses a password, a salt, and a specified number of iterations to derive a cryptographic key.        |

---


## What are Cookies, Sessions, and JSON Web Tokens?

### **1. Cookies**
- **Definition**: Small text files stored on the client-side (browser) by a website to retain user information.
- **Purpose**: Track user activity, maintain session state, and store preferences.
- **Characteristics**:
  - Sent with every HTTP request.
  - Can have an expiration date or be session-based.
  - Often used for authentication, personalization, and tracking.

### **2. Sessions**
- **Definition**: Server-side storage mechanism to retain user data across multiple requests.
- **Purpose**: Maintain user state and information while interacting with a web application.
- **Characteristics**:
  - Requires session ID (usually stored in a cookie).
  - Data is stored on the server.
  - More secure than storing sensitive data in cookies.

### **3. JSON Web Token (JWT)**
- **Definition**: A compact, self-contained token format for securely transmitting information.
- **Purpose**: Used for authentication and information exchange.
- **Characteristics**:
  - Contains a payload with user data.
  - Signed using a secret key (HMAC) or public/private key pair (RSA/ECDSA).
  - Does not require server-side storage.

---

## Well-Known Companies and Cookie Expiration Dates

| **Company**       | **Cookie Type**          | **Expiration**                    |
|--------------------|--------------------------|------------------------------------|
| **Google**         | Analytics               | Up to 2 years                     |
|                    | Ads Preferences         | 13 months (GDPR compliance)       |
|                    | Login Cookies           | 30 days                           |
| **Facebook**       | Session Cookies         | When browser closes or inactive   |
|                    | Login Cookies           | Up to 90 days                     |
|                    | Tracking Cookies        | Up to 2 years                     |
| **Amazon**         | Shopping Cart Cookies   | 7 days or until cart cleared      |
|                    | Session Cookies         | When browser closes               |
|                    | Recommendations         | Up to 1 year                      |
| **Twitter**        | Session Cookies         | When browser closes               |
|                    | Persistent Cookies      | Up to 18 months                   |
| **Netflix**        | Authentication Cookies  | 30 days ("Remember Me" enabled)   |
|                    | Session Cookies         | When browser closes               |
| **Microsoft**      | Authentication Cookies  | 30 days to a few months           |
|                    | Tracking/Personalization| Up to 2 years                     |

---

## Why Do Expiration Dates Vary?

1. **Purpose**:
   - Functional cookies (e.g., login or shopping cart).
   - Tracking cookies (e.g., analytics).
2. **User Control**:
   - Many companies allow users to manage or delete cookies.
3. **Compliance**:
   - Regulations like GDPR and CCPA influence cookie expiration limits.

--- 


## **What are Indexes?**
Indexes are special data structures that store a small portion of the collection's data in an easy-to-traverse form. This structure helps MongoDB locate and retrieve documents efficiently.

---

## **Why Do We Need Indexes in a Database?**
- **Improved Query Performance**: Indexes make it faster to search, sort, and filter data, reducing query execution time significantly.
- **Efficient Data Retrieval**: Without an index, MongoDB performs a *collection scan*, which is slow for large datasets.
- **Essential for Sorting**: Indexes optimize sorting query results.
- **Supports Unique Constraints**: Indexes enforce unique constraints on a field, ensuring data integrity.

---

## **Advantages of Creating Indexes**

| **Advantage**                          | **Description**                                                                                         |
|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| **Faster Query Execution**             | Queries are executed more quickly by reducing the search space.                                         |
| **Efficient Sorting**                  | Sorting operations are optimized when indexes are applied to fields used for sorting.                  |
| **Supports Complex Queries**           | Indexes allow efficient execution of queries involving filters, projections, and aggregations.          |
| **Enforces Data Constraints**          | Unique indexes prevent duplicate values in fields, ensuring data consistency.                          |
| **Better Scalability**                 | Indexes enable the database to handle larger datasets with better performance.                         |

---

## **Disadvantages of Creating Indexes**

| **Disadvantage**                       | **Description**                                                                                         |
|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| **Increased Storage Space**            | Indexes consume additional disk space, which grows as the data size increases.                         |
| **Slower Write Operations**            | Insert, update, and delete operations become slower due to the overhead of maintaining the index.       |
| **Maintenance Overhead**               | Indexes need to be updated whenever the data changes, adding computational overhead.                    |
| **Complex Index Management**           | Poorly designed indexes can lead to performance degradation and require careful management.             |
| **Limited Benefits for Small Datasets**| Indexes are less useful for small collections, where the overhead may outweigh the benefits.            |

---

## **Index Types in MongoDB**

| **Index Type**                | **Description**                                                                                     |
|-------------------------------|-----------------------------------------------------------------------------------------------------|
| **Single Field Index**        | Indexes a single field for efficient filtering or sorting.                                         |
| **Compound Index**            | Indexes multiple fields for queries involving combinations of fields.                              |
| **Multikey Index**            | Indexes arrays so that queries can efficiently filter documents based on array contents.           |
| **Text Index**                | Supports text search capabilities across string fields.                                            |
| **Geospatial Index**          | Used for queries involving geographical data, such as distance or location-based filtering.       |
| **Hashed Index**              | Hashes the value of a field, useful for sharded collections.                                       |

---

## **Best Practices**

1. **Limit the Number of Indexes**:
   - Only create indexes on fields frequently used in queries. Avoid over-indexing to prevent performance hits during writes.

2. **Monitor Index Performance**:
   - Use tools like `explain()` to analyze query performance and understand index usage.

3. **Choose the Right Index Type**:
   - Use compound or multikey indexes for complex queries. Avoid text indexes for numeric searches.

4. **Regular Index Maintenance**:
   - Rebuild or remove unused indexes periodically to optimize performance.



## 1. Reference (`ref`) and Populate

### **Reference (`ref`)**
- `ref` in MongoDB is used to create relationships between documents in different collections.
- It stores the `ObjectId` of the referenced document.

#### **Example**
**Users Collection:**
```json
{
  "_id": "64a7f30e4b1a2c001d2b54e9",
  "name": "John Doe"
}
```
  ### **Populate (`ref`)**
```javascript
const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
});

// Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Models
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Query with Populate
Post.find({})
  .populate("author")
  .then((posts) => {
    console.log(posts);
  });

```

# MongoDB Query Operators

## Common Query Operators

| **Operator** | **Description**                                                                 | **Example**                                                                                             |
|--------------|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `$eq`        | Matches values equal to a specified value.                                      | `{ age: { $eq: 25 } }`                                                                                 |
| `$gt`        | Matches values greater than a specified value.                                 | `{ age: { $gt: 20 } }`                                                                                 |
| `$gte`       | Matches values greater than or equal to a specified value.                     | `{ age: { $gte: 18 } }`                                                                                |
| `$lt`        | Matches values less than a specified value.                                    | `{ age: { $lt: 50 } }`                                                                                 |
| `$lte`       | Matches values less than or equal to a specified value.                        | `{ age: { $lte: 40 } }`                                                                                |
| `$in`        | Matches any of the values specified in an array.                               | `{ status: { $in: ["active", "pending"] } }`                                                           |
| `$nin`       | Matches none of the values specified in an array.                              | `{ age: { $nin: [25, 30, 35] } }`                                                                      |
| `$and`       | Combines multiple query conditions, ensuring all are met.                      | `{ $and: [{ age: { $gte: 18 } }, { age: { $lte: 30 } }] }`                                             |
| `$or`        | Joins query clauses with a logical OR, matching documents that satisfy at least one. | `{ $or: [{ age: { $lt: 18 } }, { status: "inactive" }] }`                                              |
| `$ne`        | Matches values not equal to the specified value.                               | `{ status: { $ne: "active" } }`                                                                        |
| `$not`       | Inverts the effect of a query expression.                                       | `{ age: { $not: { $gte: 18 } } }`                                                                      |
| `$exists`    | Matches documents where a field exists or does not exist.                      | `{ email: { $exists: true } }`                                                                         |

---

## Additional Notes

- **Use `$and` and `$or`** for complex queries.
- **Use `$in` and `$nin`** for matching multiple values.
- **Use `$exists`** to check for fields that may or may not exist in a document.

---

Happy Querying! 🚀
