import {createServer} from "net"

const TCP_PORT = 53333

const TcpServer = createServer(socket => {
    console.log("TCP client connected")

    socket.on("data", (data) => {
        console.log("Data received:", {data: data.toString()})
        socket.write("Back at you TCP")
    })

    socket.on("end", () => {
        console.log("TCP client disconnected")
    })

    socket.on("error", (error) => {
        console.log("TCP socket error:",  {error})
    })
})

TcpServer.listen(TCP_PORT, () => {
    console.log("TCP server listening on port:", TCP_PORT)
})
