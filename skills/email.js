/*

Botkit Studio Skill module to enhance the "Test" script

*/
const skill = 'Email';

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

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
