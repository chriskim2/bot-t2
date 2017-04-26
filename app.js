var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    //appId: process.env.MICROSOFT_APP_ID,
    //appPassword: process.env.MICROSOFT_APP_PASSWORD

    appId: '27ea08b6-c5c9-4c2b-b9cb-ee7e1534eb06',
    appPassword: 'KBifN4S7usjS4qHx2eWYWK2'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        //builder.Prompts.text(session, "Hello... What's your name?");
        builder.Prompts.choice(session, "What would you like to do today?", ["Could you recommend personalized activies for me?", "I am looking for specipic activities.", "Nothing"]);
    },
    function (session, results) {
        //session.userData.name = results.response;
        session.userData.choice1 = results.response.entity;

        if (session.userData.choice1.startsWith("Could you recommend")) {
            //session.send("I would like to search opportuniites.");
            builder.Prompts.choice(session, "What kind of opportunity do you want to search?", ["Study", "Athlete", "Social", "Networking"]);
        }
        else if (session.userData.choice1.startsWith("I am looking for")) {
            //session.send("I would like to create an opportunity.");
            session.send("You are looking for something specific one. I will try later!!");
        }
    },
    function (session, results) {
        session.userData.choice2 = results.response.entity;

        if (session.userData.choice1.startsWith("Could you recommend")) {
            if (session.userData.choice2 == "Study") {
                builder.Prompts.choice(session, "There are three personalized study opportunities for you.", ["Math - North York", "English - Downtown", "History - Bramton"]);    
            }
            else if (session.userData.choice2 == "Athlete") {
                builder.Prompts.choice(session, "There are three personalized athlete opportunities for you.", ["Soccer - North York", "Basketball - Downtown", "Tennis - Bramton"]);  
            }
            else if (session.userData.choice2 == "Social") {
                builder.Prompts.choice(session, "There are three personalized social opportunities for you.", ["club - North York", "party - Downtown", "meeting - Bramton"]);
            }
            else if (session.userData.choice2 == "Networking") {
                builder.Prompts.choice(session, "There are three personalized networking opportunities for you.", ["job fair - North York", "seminar - Downtown", "lecture - Bramton"]);
            }
        }
    },
    function (session, results) {
        session.userData.choice3 = results.response.entity;

        if (session.userData.choice1.startsWith("Could you recommend")) {
            session.send("You have chosen '" + session.userData.choice3 +"'");
        }
    }
]);
