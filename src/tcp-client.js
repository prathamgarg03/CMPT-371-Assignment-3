import {Socket} from "net"

const TCP_PORT = 53333
const TCP_HOST = "localhost"

const sendSingleMessage = () => {
    const TcpClient = new Socket()

    TcpClient.connect(TCP_PORT, TCP_HOST, () => {
        console.log("Connected to TCP server")
        const startTimestamp = Date.now()

        sendMessage(TcpClient)

        TcpClient.on("data", (data) => {
            const endTimestamp = Date.now()
            const RTT = endTimestamp - startTimestamp
            console.log("Data received from TCP server:", {data: data.toString()})
            console.log("Round trip time:", RTT, " ms")
            TcpClient.end()
        })

        TcpClient.on("error", (error) => {
            console.log("TCP client error:", {error})
        })
    })
}

const sendMultipleMessages = () => {
    const TcpClient = new Socket()
    let messageCount = 0
    TcpClient.connect(TCP_PORT, TCP_HOST, () => {
        console.log("Connected to TCP server")
        const startTimestamp = Date.now()
        sendMessage(TcpClient)

        TcpClient.on("data", (data) => {
            messageCount++;
            if(messageCount < 1000) {
                sendMessage(TcpClient)
            } else {
                const endTimestamp = Date.now()
                const RTT = endTimestamp - startTimestamp
                console.log("Messages sent:", messageCount)
                console.log({data: data.toString()})
                console.log("Round trip time:", RTT, " ms")
                TcpClient.end()
            }
        })

        TcpClient.on("error", (error) => {
            console.log("TCP client error:", {error})
        })
    })
}

const sendMessage = (TcpClient) => {
    TcpClient.write("Hello TCP")
}

if (process.argv[2] === "single") {
    sendSingleMessage()
} else if (process.argv[2] === "multiple") {
    sendMultipleMessages()
} else {
    console.log("Invalid argument. Please use 'single' or 'multiple'")
}