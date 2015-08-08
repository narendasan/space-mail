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

      console.log('2015/08/08', gmailClients[doc._id].list("after:2015/08/07").map(function (m) {
        return m.snippet;
      }));

      console.log('2015/08/07', gmailClients[doc._id].list("after:2015/08/07 before:2015/08/08").map(function (m) {
        return m.snippet;
      }));

      console.log('2015/08/06', gmailClients[doc._id].list("after:2015/08/06 before:2015/08/07").map(function (m) {
        return m.snippet;
      }));

    }
  });
} else { /* is client */
  Accounts.ui.config({
    requestOfflineToken: { google: true },
    forceApprovalPrompt: { google: true },
    requestPermissions: { google: ["https://www.googleapis.com/auth/gmail.readonly"] }
  });
}

