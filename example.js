// allusers = new Mongo.Collection('myUsers');
Emails = new Mongo.Collection('emails');
allconversations = new Mongo.Collection('conversations');


Router.configure({
  layoutTemplate: 'container'
});

Router.route('/', function() {
  this.layout('container');
  this.render('collection');
});

Router.route('/full/:id', function() {
  this.layout('container');
  this.render('full', { id: this.params.id });
});
