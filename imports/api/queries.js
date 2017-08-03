import { Meteor } from 'meteor/meteor';


Meteor.methods({
  'azureRequest'(query){

    const url = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + query.replace(/\s/gi,"+");
    const result = HTTP.get(url, {
      'headers':{
        'Ocp-Apim-Subscription-Key':"e6cf957783754a9da384e01676e147bc"
      }
    });
    return JSON.stringify(JSON.parse(result['content'])['value']);
  },
  'logLeo'(){
    return 'leonardo';
  }
});
