// allusers = new Mongo.Collection('myUsers');
allconversations = new Mongo.Collection('conversations');
Emails = new Mongo.Collection('emails');
Tags = new Mongo.Collection('tags');

Router.configure({
  layoutTemplate: 'container'
});

Router.route('/', function() {
  this.layout('container');
  this.render('home');
});

Router.route('/notifications/:name', function() {
  this.layout('container');
  this.render('collection', { data: { name: this.params.name }});
});

Router.route('/full/:id', function() {
  this.layout('container');
  this.render('full', { id: this.params.id });
});
