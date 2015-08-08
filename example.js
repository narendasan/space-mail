if (Meteor.isServer) {
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

      var count = 0;
      gmailClients[doc._id].onNewEmail('subject:hi', function (message) {
        console.log(count, message.subject);
        count += 1;
        // console.log(message.snippet, message.to, message.from, message.subject);
      });
    }
  });
} else { /* is client */
  Accounts.ui.config({
    requestOfflineToken: { google: true },
    forceApprovalPrompt: { google: true },
    requestPermissions: { google: ["https://www.googleapis.com/auth/gmail.readonly"] }
  });
}

