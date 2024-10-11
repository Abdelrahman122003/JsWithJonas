## The client-server architecture

The client-server architecture is a model for structuring applications that divide tasks between service providers, known as servers, and service requesters, known as clients.

1. Client

   - The client is the end-user application or device that requests resources or services from the server.
   - Clients can be web browsers, mobile applications, or any software that communicates over a network.
   - They initiate requests for data or services and display the results to the user.

2. Server

   - The server is a powerful system that provides resources, data, or services to multiple clients over a network.
   - Servers handle requests from clients, process them, and return the requested information or perform the requested actions.
   - They can run various types of services, such as web servers, database servers, file servers, and application servers.

### How It Works

- **Request-Response Model**: The client sends a request to the server, often using protocols like HTTP (for web applications). The server processes the request and responds with the appropriate data or acknowledgment.

- **Network Communication**: Clients and servers communicate over a network (e.g., the Internet or a local network). This communication can be synchronous (immediate response) or asynchronous (responses sent at a later time).

- **Scalability and Resource Sharing**: Multiple clients can connect to a single server, allowing for efficient resource sharing and centralized management. Servers can also be scaled vertically (more powerful hardware) or horizontally (adding more servers) to handle increased load.

## What happens When we Access A WebPage

<p align="center">
  <img src="../images/overviewAboutHowWebWork.png" alt="alt-text" width="500"/>
</p>

- **DNS lookup**

  **`Domain Name System (DNS)`** is a hierarchical system that translates human-friendly domain names (like www.example.com) into IP addresses (like 192.0.2.1) that computers use to identify each other on the network. A DNS lookup involves querying DNS servers to resolve a domain name into its corresponding IP address.

- **TCP/IP socket connection**

  **`Transmission Control Protocol`** (TCP) and **`Internet Protocol`** (IP) are core protocols of the Internet protocol suite, forming the basis for network communication.

  **`Socket Connection`**: A socket is an endpoint for sending or receiving data across a computer network. It is defined by an IP address and a port number, allowing multiple services to run on a single machine without conflict.
