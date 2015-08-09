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

      var count = 0
      gmailClients[doc._id].list("after:2015/08/07 subject:hithere").map(function(m) {
        console.log(m.payload.parts[0].body.data);
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

