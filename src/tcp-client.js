import {Socket} from "net"

const TCP_PORT = 53333
const TCP_HOST = "localhost"

const sendSingleMessage = () => {
    return new Promise((resolve, reject) => {
        const TcpClient = new Socket()
        let RTT = 0
        TcpClient.connect(TCP_PORT, TCP_HOST, () => {
            const startTimestamp = Date.now()

            sendMessage(TcpClient)

            TcpClient.on("data", (data) => {
                const endTimestamp = Date.now()
                RTT = endTimestamp - startTimestamp
                // console.log({data: data.toString()})
                // console.log("Round trip time:", RTT, " ms")
                TcpClient.end()
                resolve(RTT)
            })

            TcpClient.on("error", (error) => {
                console.log("TCP client error:", {error})
                reject(error)
            })
        })
    })
}

const sendMultipleMessages = () => {
    return new Promise((resolve, reject) => {
        const TcpClient = new Socket()
        let messageCount = 0
        let RTT = 0
        TcpClient.connect(TCP_PORT, TCP_HOST, () => {
            const startTimestamp = Date.now()
            sendMessage(TcpClient)

            TcpClient.on("data", (data) => {
                messageCount++;
                if (messageCount < 1000) {
                    sendMessage(TcpClient)
                } else {
                    const endTimestamp = Date.now()
                    RTT = endTimestamp - startTimestamp
                    // console.log("Messages sent:", messageCount)
                    // console.log({data: data.toString()})
                    // console.log("Round trip time:", RTT, " ms")
                    TcpClient.end()
                    resolve(RTT)
                }
            })

            TcpClient.on("error", (error) => {
                console.log("TCP client error:", {error})
                reject(error)
            })
        })
    })
}

const sendMessage = (TcpClient) => {
    TcpClient.write("Hello TCP")
}

if (process.argv[2] === "single") {
    const RTT = []
    const calculateAverageRTT = async () => {
        for (let i = 0; i < 10; i++) {
            try {
                const rtt = await sendSingleMessage()
                RTT.push(rtt)
            } catch (error) {
                console.log("Error:", error)
            }
        }
        const averageRTT = RTT.reduce((a, b) => a + b) / RTT.length
        console.log("Average RTT:", averageRTT, " ms")
    }
    await calculateAverageRTT()
} else if (process.argv[2] === "multiple") {
    const RTT = []
    const calculateAverageRTT = async () => {
        for (let i = 0; i < 10; i++) {
            try {
                const rtt = await sendMultipleMessages()
                RTT.push(rtt)
            } catch (error) {
                console.log("Error:", error)
            }
        }
        const averageRTT = RTT.reduce((a, b) => a + b) / RTT.length
        console.log("Average RTT:", averageRTT, " ms")
    }
    await calculateAverageRTT()
} else {
    console.log("Invalid argument. Please use 'single' or 'multiple'")
}