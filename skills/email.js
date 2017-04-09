const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const smtpConfig = {
    service: process.env.smtpService,
    auth: {
        user: process.env.smtpUsername,
        pass: process.env.smtpPassword
    }
};
const transporter = nodemailer.createTransport(smtpConfig);
console.log("Smtp Config", smtpConfig);

/*

Botkit Studio Skill module to enhance the "Test" script

*/
const skill = 'sendemail';

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    controller.studio.before(skill, function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log(`BEFORE: ${skill}`);
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */

    // Validate user input: question_1
    controller.studio.validate(skill,'emailaddress', function(convo, next) {

        var value = convo.extractResponse('emailaddress');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log(`VALIDATE: ${skill} VARIABLE: ${value}`);

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate(skill,'subject', function(convo, next) {

        var value = convo.extractResponse('subject');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log(`VALIDATE: ${skill} VARIABLE:  ${value}`);

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate(skill,'message', function(convo, next) {

        var value = convo.extractResponse('message');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log(`VALIDATE: ${skill} VARIABLE: question_3: ${value}`);

        // always call next!
        next();

    });

    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    controller.studio.after(skill, function(convo, next) {

        console.log(`AFTER: ${skill}`);
        console.log('Success?', convo.successful());
        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            console.log(responses);
            // setup email data with unicode symbols

            sendMessageTo = responses.emailaddress.split("|").pop();
            let mailOptions = {
                from: process.env.smtpFrom, // sender address
                to: sendMessageTo, // list of receivers
                subject: responses.subject, // Subject line
                text: responses.message, // plain text body
                html: responses.message // html body
            };
            console.log("Mail Options", mailOptions);
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    bot.reply('Message failed: ', error.Error);
                    return console.log(error);
                }
                bot.reply('Message sent to ', sendMessageTo);
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
