import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Queries } from '../imports/api/queries.js';

Meteor.startup(() => {

  WebApp.connectHandlers.use('/list',(req,res,next) => {

    const t = JSON.stringify(Queries.find({},{sort: {'when':-1}}).fetch());
    // console.log(t);
    res.end(t);
    // next();
  });

  WebApp.connectHandlers.use((req,res,next) => {

    if (req.url.slice(1)) {

      const term = req.url.slice(1).split('?offset=')[0];
      const offset = req.url.slice(1).split('?offset=')[1];

      Queries.insert({
        term,
        when: new Date()
      });

      const url = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + term.replace(/\s/gi,"+");

      const result = HTTP.get(url, {
        'headers':{
          'Ocp-Apim-Subscription-Key':"e6cf957783754a9da384e01676e147bc"
        }
      });

      let arrRes = JSON.parse(result['content'])['value'].map((x) => {
        const newItem = {
          name: x['name'],
          pageUrl: x['hostPageUrl'],
          imgUrl: x['thumbnailUrl']
        };
        return newItem;
      });

      res.end(JSON.stringify(arrRes.slice(0,offset)));

    } else {
      next();
    }

  });



});
