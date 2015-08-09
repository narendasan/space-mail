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
  email_data: function () {
    return Emails.find();
  }
});

Accounts.ui.config({
  requestOfflineToken: { google: true },
  forceApprovalPrompt: { google: true },
  requestPermissions: { google: ["https://www.googleapis.com/auth/gmail.readonly"] }
});
