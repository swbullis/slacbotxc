/*

Botkit Studio Skill module to enhance the "Test" script

*/
const skill = 'Test';

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
    controller.studio.validate(skill,'question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log(`VALIDATE: ${skill} VARIABLE: question_1: ${value}`);

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate(skill,'question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log(`VALIDATE: ${skill} VARIABLE: question_2 ${value}`);

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate(skill,'question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

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
