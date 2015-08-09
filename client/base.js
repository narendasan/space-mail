AutoForm.setDefaultTemplate('materialize');
Template.tags.helpers({
  email_data: function () {
    var tagName = Router.current().params.name;
    console.log(Emails.findOne({
      tag: tagName,
      user_id: Meteor.user().services.google.id
  }));
    return Emails.find({
      tag: tagName,
      user_id: Meteor.user().services.google.id
  });
  }
});

Template.full.helpers({
  email_data: function() {
    var emailId = Router.current().params.id;
    var resultEmail = Emails.find({ id: emailId });
    return resultEmail;
  }
})

Template.notification.helpers({
  tags: function() {
    return  Tags.find({uid: Meteor.user().services.google.id}, {sort: {name: 1}});
  }
});

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};


Accounts.ui.config({
  requestOfflineToken: { google: true },
  forceApprovalPrompt: { google: true },
  requestPermissions: { google: ["https://www.googleapis.com/auth/gmail.readonly"] }
});

Schemas = {};
Template.registerHelper("Schemas", Schemas);

Schemas.outboundMail = new SimpleSchema({
    subject: {
      type: String,
      label: "Subject",
      optional: true,
      max: 200
    },
    to: {
      type: String,
      label: "To"
    },
    cc: {
      type: String,
      label: "CC",
      optional: true,
      min: 0
    },
    bcc: {
      type: String,
      label: "BCC",
      optional: true
    },
    body: {
      type: String,
      label: "",
      optional: true,
      max: 1000
    }
});

Collections = {};
Template.registerHelper("Collections", Collections);
Outbound = Outbound.Collections = new Mongo.Collection("outbound");
Outbound.attachSchema(Schema.outboundMail);

Meteor.publish(null, function () {
  return Outbound.find();
});

Outbound.allow({
  insert: function () {
    return true;
  }
});
