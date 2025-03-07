import {createSocket} from "dgram"

const UDP_PORT = 53444
const UdpServer = createSocket("udp4")

UdpServer.on("message", (msg, rInfo) => {
    console.log("Data received:", {data: msg.toString()})

    const response = Buffer.from("Back at you UDP")
    UdpServer.send(response,0, response.length, rInfo.port, rInfo.address, (error) => {
        if(error) {
            console.log("Error sending response:", {error})
        }
    })
})

UdpServer.on("error", (error) => {
    console.log("UDP server error:", {error})
    UdpServer.close()
})

UdpServer.bind(UDP_PORT, () => {
    console.log("UDP server listening on port:", UDP_PORT)
})