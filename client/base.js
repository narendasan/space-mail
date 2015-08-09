Template.collection.helpers({
  email_data: function () {
    var tagName = Router.current().params.name;
    console.log(tagName);
    return Emails.find();
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
    return Tags.find();
  }
})

Accounts.ui.config({
  requestOfflineToken: { google: true },
  forceApprovalPrompt: { google: true },
  requestPermissions: { google: ["https://www.googleapis.com/auth/gmail.readonly"] }
});
