var gmailClients = {};
Meteor.users.find().observe({
  added: function (doc) {
    var googleConf =
      ServiceConfiguration.configurations.findOne({service: 'google'});

    var google = doc.services.google;

    console.log(doc.services.google.id);

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

    var parse_base_64 = function (str) {
      try {
        return new Buffer(str, 'base64').toString('utf8');
      } catch (e) {
        console.log('failed to parse', str);
        throw e;
      }
      // var parse_dammit = function (word_array) {
      //   try {
      //     return text_string = CryptoJS.enc.Utf8.stringify(words_head);
      //   } catch (e) {
      //     return '';
      //   }
      // }
      // var ret = '';
      // try {
      //   var words = CryptoJS.enc.Base64.parse(str);
      //   for (var i=0; i<words.words.length; i++) {
      //     var words_head = CryptoJS.lib.WordArray.create(words.words.slice(i, i+1));
      //     ret += parse_dammit(words_head);
      //   }
      // } catch (e) {
      //   return ret;
      // }
      // return ret;
    }

    var extract_email_body = function (m) {
      if (!m.payload.parts && m.payload.body) {
        return parse_base_64(m.payload.body.data);
      }
      if (m.payload.parts[0].body.data) {
        return parse_base_64(m.payload.parts[0].body.data);
      }
    }

    var maybe_insert_message = function (m) {
      var email_body = extract_email_body(m);

      if (email_body && Emails.find({id: m.id}).fetch().length === 0) {
        Emails.insert({
          subject: extract_subject(m.payload.headers),
          content: extract_email_body(m),
          from: extract_sender(m.payload.headers),
          time: extract_date(m.payload.headers),
          id: m.id,
          tag: "All Mail",
          user_id: doc.services.google.id,
        });
      }
    }

    var pull_last_days = function(from, days) {

      console.log('pull_last_days', from, days);
      if (days === 0) return;

      var now = from.toISOString().slice(0, 10);
      from.setDate(from.getDate() - 1);
      var prev = from.toISOString().slice(0, 10);

      gmailClients[doc._id].list("after:" + prev + " before:" + now).forEach(maybe_insert_message);
      init_level_one();

      Meteor.setTimeout(function() {
        pull_last_days(from, days - 1);
      }, 100);
    }

    pull_last_days(new Date(), 10);
    // gmailClients[doc._id].list("after:2015/08/07").forEach(maybe_insert_message);


  },
});
