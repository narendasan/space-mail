// allusers = new Mongo.Collection('myUsers');
Emails = new Mongo.Collection('emails');
allconversations = new Mongo.Collection('conversations');

if (Meteor.isServer) {

  Meteor.startup(function() {
    if (Emails.find().count() === 0)
      Emails.insert({
        subject: "Hi Jessica",
        body: "We would like to make you an offer of $250,000 a year"
      });
  });

  var gmailClients = {};
  Meteor.users.find().observe({
    added: function (doc) {
      var googleConf =
        ServiceConfiguration.configurations.findOne({service: 'google'});

      var google = doc.services.google;

      // gmailClients[doc._id] = new GMail.Client({
      //   clientId: googleConf.clientId,
      //   clientSecret: googleConf.secret,
      //   accessToken: google.accessToken,
      //   expirationDate: google.expiresAt,
      //   refreshToken: google.refreshToken
      // });

      // (gmailClients[doc._id].list("from:*@linkedin.com").map(function (m) {
      //   console.log(m)
      //   return m.payload.headers;
      // }));



        try {
          var email_body = m.payload.parts[0].body.data;
          var words = CryptoJS.enc.Base64.parse(email_body);
          var textString = CryptoJS.enc.Utf8.stringify(words);
          console.log(textString);
        } catch (e) {
          console.log('failed to parse email body');
        }

      });
    }
  });
} else { /* is client */
  var email_data =
    [
      {
        id: 1,
        time: "June 21, 2015. 10:45am",
        from: "Matthew Miner",
        subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, aspernatur, quos! Omnis et odio eos dolorum quibusdam quam, assumenda soluta."
      },
      {
        id: 2,
        time: "June 21, 2015. 10:45am",
        from: "Matthew Miner",
        subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, aspernatur, quos! Omnis et odio eos dolorum quibusdam quam, assumenda soluta."
      },
      {
        id: 3,
        time: "June 21, 2015. 10:45am",
        from: "Matthew Miner",
        subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, aspernatur, quos! Omnis et odio eos dolorum quibusdam quam, assumenda soluta."
      },
      {
        id: 4,
        time: "June 21, 2015. 10:45am",
        from: "Matthew Miner",
        subject: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, aspernatur, quos! Omnis et odio eos dolorum quibusdam quam, assumenda soluta."
      }
    ]

  Template.collection.helpers({
    email_data: email_data
  })

  Accounts.ui.config({
    requestOfflineToken: { google: true },
    forceApprovalPrompt: { google: true },
    requestPermissions: { google: ["https://www.googleapis.com/auth/gmail.readonly"] }
  });
}

Router.configure({
  layoutTemplate: 'container'
});

Router.route('/', function() {
  this.layout('container');
  this.render('collection');
});

Router.route('/full/:id', function() {
  this.layout('container');
  this.render('full', { id: this.params.id });
});
