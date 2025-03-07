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

## Screenshots
### Part 1

#### TCP
<img width="468" alt="image" src="https://github.com/user-attachments/assets/84389079-4416-4713-a8e6-fa958628b4c0" />
<img width="468" alt="image" src="https://github.com/user-attachments/assets/361a7329-b62e-466b-ac00-defc407f15a2" />

#### UDP
<img width="468" alt="image" src="https://github.com/user-attachments/assets/6f25e4f3-ea69-4b5e-b8e5-1a56ccbee49b" />
<img width="468" alt="image" src="https://github.com/user-attachments/assets/2c73987f-34bd-41f7-bedd-e5b1883f3492" />

### Part 3

#### TCP
<img width="468" alt="image" src="https://github.com/user-attachments/assets/fd4e5424-293b-4415-8572-4f570d791ebc" />

#### UDP
<img width="468" alt="image" src="https://github.com/user-attachments/assets/9e243d62-f9c2-4990-a43f-f2c985535cd3" />

### Part 4

#### TCP
<img width="468" alt="image" src="https://github.com/user-attachments/assets/2fbf17a8-ba24-4848-bdd6-cbabb5a3370f" />

#### UDP
<img width="468" alt="image" src="https://github.com/user-attachments/assets/c4a91841-2677-4d10-bfb4-fdb06eac2a76" />
