# CMPT 371 - Assignment 3
## TCP/UDP Socket Programming

## Overview
This assignment implements two sets of client-server programs using JavaScript with Node.js. One set communicates over TCP (port 53333), and the other over UDP (port 53444). The implementation demonstrates fundamental differences between these transport protocols, measures their performance characteristics, and explores socket behavior when servers share the same port number.

## Socket Implementation
- **TCP**: Uses Node.js `net` module
- **UDP**: Uses Node.js `dgram` module

## Usage

### Running the TCP Implementation
```bash
# Start the TCP server
npm run tcp-server
```
```bash
# Run TCP client (single message)
npm run tcp-client-single
```
```bash
# Run TCP client (1000 messages)
npm run tcp-client-multiple
```

### Running the UDP Implementation
```bash
# Start the UDP server
npm run udp-server
```
```bash
# Run UDP client (single message)
npm run udp-client-single
```
```bash
# Run UDP client (1000 messages)
npm run udp-client-multiple
```

### Testing Port Sharing
```bash
# Start the TCP server
npm run tcp-server
```
```bash
# Start UDP server
# Change the UDP_PORT to 53333
npm run udp-server
```
```bash
# Run TCP client (single message)
npm run tcp-client-single
```
```bash
# Run TCP client (1000 messages)
npm run tcp-client-multiple
```
