var Emails = new Mongo.Collection('emails');

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

    var extract_subject = function (headers) {
      var matching_headers = headers.filter(function(header) {
        return header.name === 'Subject';
      });
      if (matching_headers.length === 0) return null;
      return matching_headers[0].value;
    }

    var extract_date = function (headers) {
      var matching_headers = headers.filter(function(header) {
        return header.name === 'Date';
      });
      if (matching_headers.length === 0) return null;
      return matching_headers[0].value;
    }

    var extract_sender = function (headers) {
      var matching_headers = headers.filter(function(header) {
        return header.name === 'From';
      });
      if (matching_headers.length === 0) return null;
      return matching_headers[0].value;
    }

    var extract_email_body = function (m) {
      try {
        var email_body = m.payload.parts[0].body.data;
        var words = CryptoJS.enc.Base64.parse(email_body);
        var text_string = CryptoJS.enc.Utf8.stringify(words);

        return text_string;
      } catch (e) {
        console.log('extract_email_body failed: ', e);
        return null;
      }
    }

    gmailClients[doc._id].list("after:2015/08/07").map(function (m) {

      var email_body = extract_email_body(m);

      if (email_body) {
        Emails.insert({
          subject: extract_subject(m.payload.headers),
          content: extract_email_body(m),
          from: extract_sender(m.payload.headers),
          time: extract_date(m.payload.headers),
        });
      }

    });

  },
});
