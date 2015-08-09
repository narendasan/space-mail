var gmailClients = {};
Meteor.users.find().observe({
  added: function (doc) {
    var googleConf =
      ServiceConfiguration.configurations.findOne({service: 'google'});

    var google = doc.services.google;

    gmailClients[doc._id] = new GMail.Client({
      clientId: googleConf.clientId,
      clientSecret: googleConf.secret,
      accessToken: google.accessToken,
      expirationDate: google.expiresAt,
      refreshToken: google.refreshToken
    });

    gmailClients[doc._id].list("after:2015/08/07").map(function (m) {
      try {
        var email_body = m.payload.parts[0].body.data;
        var words = CryptoJS.enc.Base64.parse(email_body);
        var textString = CryptoJS.enc.Utf8.stringify(words);

        Emails.insert({
          subject: 'subject here',
          content: textString,
          from: 'test@me.com',
          time: "June 21, 2015. 10:45am",
        });

      } catch (e) {
        console.log('failed to parse');
      }
    });



    try {
      var email_body = m.payload.parts[0].body.data;
      var words = CryptoJS.enc.Base64.parse(email_body);
      var textString = CryptoJS.enc.Utf8.stringify(words);
      console.log(textString);
    } catch (e) {
      console.log('failed to parse email body');
    }
  },
});
