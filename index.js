
const Alexa = require('ask-sdk-core');

const STREAM_URL = 'https://servidor31.brlogic.com:7098/live'; // URL direta da rádio.

const PlayGaiolaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayGaiolaFMIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Tocando a Rádio Gaiola FM.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective('REPLACE_ALL', STREAM_URL, 'gaiolaFMStream', 0, null)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você pode dizer: Alexa, tocar Gaiola FM.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Parando a Rádio Gaiola FM. Até logo!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Desculpe, ocorreu um erro. Tente novamente mais tarde.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        PlayGaiolaHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
