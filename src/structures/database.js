const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.error(err)
    console.log("Conectada ao banco de dados")
})
let User = new mongoose.Schema({
	_id:{ type: String },
	PlazaCoin:{ type: Number, default: 0 },
	timedaily: { type: String, default: '0000000000000' },
	clan:{ type: String, default:"Nenhum" },
	hasclan:{ type: Boolean, default: false },
	apartamenttime:{ type: String, default: '0000000000000' },
	afk: { type: Boolean, default: false },
	afkReason: { type: String, default: null },
	blacklist: { type: Boolean, default: false },
	blacklistReason: { type: String, default: null },
	aboutme: { type: String, default: "pao de batata" },
	profileColor: { type: String, default: "#6b8dff" },
	isMarry: { type: Boolean, default: false },
	marryWith: { type: String, default: "" },
	rep: { type: Number, default: 0 },
	repTime: { type: String, default: "000000000000" },
	shipValue: { type: String, default: null }
})

  let LoJa = new mongoose.Schema({
    _id:{ type: String },
    custo:{ type: String, default: "0" },
    desk:{ type: String, default: "Sem descrição" },
    giverole:{ type: Boolean, default: false },
    roleid:{ type: String },
    resposta:{ type: String, default: "Parabéns por comprar o {item}" }
})
let Guild = new mongoose.Schema({
	_id: { type: String },
	prefix: { type: String, default: "!!!"},
	channelid: { type: String, default: 'none' },
	commandinchannel: { type: String, default: 'false' }
})
let vip = new mongoose.Schema({
    _id: { type: String },
    desk: { type: String },
    dailycusto: { type: String },
    custo: { type: String },
    vipID: { type: String }
})
let me = new mongoose.Schema({
    _id: { type: String },
    blockedCommands: { type: Map, default: new Map() }
})
let whitelist = new mongoose.Schema({
	_id: { type: String, default: 'none' },
	userid: { type: String, default: 'none' },
	whitelisted: { type: String, default: 'false' }
})
exports.whitelist = new mongoose.model('Whitelist', whitelist)
exports.me = new mongoose.model('Me', me)
let Vips = new mongoose.model('Vips', vip)
exports.Vips = Vips
let Loja = new mongoose.model("Loja", LoJa)
exports.Loja = Loja
let Users = new mongoose.model("Users", User)
exports.Users = Users 
let Guilds = mongoose.model("Guilds", Guild)
exports.Guilds = Guilds