Template.collection.helpers({
  email_data: function () {
    var tagName = Router.current().params.name;
    console.log(tagName);
    return Emails.find();
  }
});

Template.notification.helpers({
  tags: function() {
    return ["Github", "LinkedIn", "Facebook", "Twitter"]
  }
})

Accounts.ui.config({
  requestOfflineToken: { google: true },
  forceApprovalPrompt: { google: true },
  requestPermissions: { google: ["https://www.googleapis.com/auth/gmail.readonly"] }
});
