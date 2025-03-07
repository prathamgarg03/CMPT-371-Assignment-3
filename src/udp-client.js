import {createSocket} from "dgram"

const UDP_PORT = 53444
const UDP_HOST = "localhost"

const sendSingleMessage = () => {
    const UdpClient = createSocket("udp4")
    const startTimestamp = Date.now()

    sendMessage(UdpClient)

    UdpClient.on("message", (msg, rInfo) => {
        const endTimestamp = Date.now()
        const RTT = endTimestamp - startTimestamp
        console.log("Message received from UDP server:", {msg: msg.toString()})
        console.log("Round trip time:", RTT, " ms")
        UdpClient.close()
    })

    UdpClient.on('error', (err) => {
        console.error('Error:', err);
        UdpClient.close();
    })
}

const sendMultipleMessages = () => {
    const UdpClient = createSocket("udp4")
    let messageCount = 0
    const startTimestamp = Date.now()

    sendMessage(UdpClient)

    UdpClient.on("message", (msg, rInfo) => {
        messageCount++
        if(messageCount < 1000) {
            sendMessage(UdpClient)
        } else {
            const endTimestamp = Date.now()
            const RTT = endTimestamp - startTimestamp
            console.log("Messages sent:", messageCount)
            console.log({data: msg.toString()})
            console.log("Round trip time:", RTT, " ms")
            UdpClient.close()
        }
    })

    UdpClient.on('error', (err) => {
        console.error('Error:', err);
        UdpClient.close();
    })
}

const sendMessage = (UdpClient) => {
    const message = Buffer.from("Hello UDP")
    UdpClient.send(message, 0, message.length, UDP_PORT, UDP_HOST, (error) => {
        if(error) {
            console.log("Error sending message:", {error})
        }
    })
}

if (process.argv[2] === "single") {
    sendSingleMessage()
} else if (process.argv[2] === "multiple") {
    sendMultipleMessages()
} else {
    console.log("Invalid argument")
}