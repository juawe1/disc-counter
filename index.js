const testing = false;

const config = require('./config.json')

const {Client} = require('discord.js');

const client = new Client({ intents: 583 });
var KickAmount = 0;
var SamKicks = 0;


client.on('ready', () =>{

    console.log(`Logged in as ${client.user.tag}`)
    console.log(KickAmount, SamKicks)
    if (testing){
       client.guilds.cache.get("919382180449370173").channels.cache.get("919382180449370176").send("Spook!");
    };
    
});

client.on('messageCreate', async msg =>{
    if (msg.content === "!count"){
        msg.reply(`Lewis has been kicked ${KickAmount}`)
    }else if (msg.content === "!count sam") {
        msg.reply(`Sam has been kicked ${SamKicks}`)
    }else if (msg.content === "!help"){
        msg.reply('This bot counts how many times someone has been kicked for making dom cry. Type "!count" for lewis or "!count sam" for sam')
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

client.on('guildMemberRemove', async member =>{

    if (member.user.id === config.lewisID){
        console.log(member.user.id);
        console.log(KickAmount);
        let KickAmount = KickAmount + 1;
        console.log(KickAmount);
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Lewis has been kicked ${KickAmount} times.`);
    }else if (member.user.id === config.samID) {
        console.log(member.user.id);
        console.log(SamKicks);
        let SamKicks = SamKicks + 1;
        console.log(SamKicks);
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Sam has been kicked ${KickAmount} times because he cant spell.`);
    }else if (member.user.id === config.harveyID) {
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`Harvey has been kicked times because hes a nonce init.`);
    }else{
        client.guilds.cache.get(config.ServerID).channels.cache.get(config.GeneralChannelID).send(`${member.user.tag} has been removed because he made dom cry`);
    };
});

client.login(config.token);