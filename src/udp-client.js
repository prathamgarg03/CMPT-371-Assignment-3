import {createSocket} from "dgram"

const UDP_PORT = 53444
const UDP_HOST = "localhost"

const sendSingleMessage = () => {
    return new Promise((resolve, reject) => {
        const UdpClient = createSocket("udp4")
        let RTT = 0
        const startTimestamp = Date.now()

        sendMessage(UdpClient)

        UdpClient.on("message", (msg, rInfo) => {
            const endTimestamp = Date.now()
            RTT = endTimestamp - startTimestamp
            UdpClient.close()
            resolve(RTT)
        })

        UdpClient.on('error', (err) => {
            console.error('Error:', err)
            UdpClient.close()
            reject(err)
        })
    })
}

const sendMultipleMessages = () => {
    return new Promise((resolve, reject) => {
        const UdpClient = createSocket("udp4")
        let messageCount = 0
        let RTT = 0
        const startTimestamp = Date.now()

        sendMessage(UdpClient)

        UdpClient.on("message", (msg, rInfo) => {
            messageCount++
            if (messageCount < 1000) {
                sendMessage(UdpClient)
            } else {
                const endTimestamp = Date.now()
                RTT = endTimestamp - startTimestamp
                UdpClient.close()
                resolve(RTT)
            }
        })

        UdpClient.on('error', (err) => {
            console.error('Error:', err)
            UdpClient.close()
            reject(err)
        })
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