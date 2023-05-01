const Client = require("./src/Client")
const client = new Client({}) //fetchAllMembers: true
require("./src/structures/ProtoTypes").start()
require("dotenv").config()
client.loadCommands("./commands")
client.loadEvents("./events")
client.login(process.env.TOKEN)

let bt1 = process.openStdin()
bt1.addListener("data", res => {
let bt2 = res.toString().trim().split(/ +/g)
client.channels.cache.get("1012002696154325063").send(bt2.join(" "));
});