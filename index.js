const testing = false;
const fs = require('fs');
const readline = require('readline');

const config = require('./config.json')

const {Client, ThreadChannel} = require('discord.js');

const client = new Client({ intents: 583 });



client.on('ready', () =>{

    console.log(`Logged in as ${client.user.tag}`)
    let data = '0'
    fs.writeFile('./kick_amounts.txt', data, err =>{
        if (err) {
            console.log(err)
            return
        }
        console.log(`file written successfully, data written: ${data}`)
    })
    if (testing){
       client.guilds.cache.get("919382180449370173").channels.cache.get("919382180449370176").send("Spook!");
    };
    
});

client.on('messageCreate', async msg =>{
    if (msg.content === "!count"){
        //msg.reply(`Lewis has been kicked ${KickAmount}`)
    }else if (msg.content === "!count sam") {
        //msg.reply(`Sam has been kicked ${SamKicks}`)
    }else if (msg.content === "!help"){
        msg.reply('This bot counts how many times someone has been kicked for making dom cry. Type "!count" for lewis or "!count sam" for sam')
    }else if (msg.content === "!data"){
        tempData = kick_read()
        console.log(tempData)
        console.log(kick_increase(tempData))
        fs.readFile('./kick_amounts.txt', 'utf-8', (err, data)=>{
            if (err){
                console.log(err)
                return
            }
            console.log(data)
        })
    };
});

/*client.on('messageDelete', async msg => {
    client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Someone deleted a message, the message was '${msg}'`);
})*/

client.on('guildMemberAdd', async member =>{
    if (member.user.id === "589773384443887637"){
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Lewis has come back for the ${KickAmount} times`);
    }else{
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`${member.user.tag} has just joined`);
    };
});

client.on('guildMemberRemove', member =>{

    if (member.user.id === config.samID){
        console.log(member);
        data = kick_read()
        console.log(data)
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Lewis has been kicked ${data} times.`);
        console.log(`Lewis has been kicked ${data} times`)
        kick_increase(data)
    }else if (member === config.lewisID) {
        console.log(member);
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Sam has been kicked ${KickAmount} times because he cant spell.`);
    }else if (member === config.harveyID) {
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Harvey has been kicked times because hes a nonce init.`);
    }else{
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`${member.user.tag} has been removed because he made dom cry`);
    };
});

client.login(config.token);



function kick_read(){
    let data = fs.readFileSync('./kick_amounts.txt', 'utf-8');
    for (const ch of data){
        return ch
    }
}

function kick_increase(data){
    let tempData = parseInt(data)
    tempData += 1
    console.log(tempData)

    fs.writeFileSync('./kick_amounts.txt', " ", err =>{
        if (err) {
            console.log(err)
            return
        }
        console.log("file cleared for new write")
    })

    fs.writeFile('./kick_amounts.txt', tempData.toString(), err =>{
        if (err) {
            console.log(err)
            return
        }
        console.log(`data written successfully, the data was ${tempData}`)
        return 
    })
    return
}