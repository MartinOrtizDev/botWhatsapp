const fs = require("fs") 
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');




const SESSION_FILE_PATH = "./session.js";
const country_code = "54"
const number = "insertarNumeroAqui" //numero de telefono para avisar que funciona el bot
const msg= `Comandos: !hola ` 

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)){
    sessionData = require(SESSION_FILE_PATH)
}


const client = new Client({
    session: sessionData
});

client.initialize();


client.on('qr', qr=>{
    qrcode.generate(qr, {small:true});
})

client.on('ready', ()=>{
    console.log("el cliente esta listo")

    let chatId= country_code + number + "@c.us"
    client.sendMessage(chatId,msg)
                .then(response => {
                    if(response.id.fromMe){
                        console.log("el mensaje fue enviado")
                    }
                })
})

client.on('authenticated', session =>{
    sessionData = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err =>{
        if(err){
            console.error(err)
        }
    })
});
client.on('auth_failure', msg =>{
    console.error('Hubo un fallo en la autenticacion', msg)
});


client.on('message', message => {
    if(message.body === '!hola') {
		message.reply('Que onda maquinola! ');
	}
});