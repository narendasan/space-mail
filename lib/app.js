// allusers = new Mongo.Collection('myUsers');
allconversations = new Mongo.Collection('conversations');
Emails = new Mongo.Collection('emails');
Tags = new Mongo.Collection('tags');
SubTags = new Mongo.Collection('subTags');


Router.configure({
  layoutTemplate: 'container'
});

Router.route('/', function() {
  this.layout('container');
  this.render('home');
});

Router.route('/newmail', function() {
  this.layout('container');
  this.render('sender', { data: { to: this.params.name }});
});

Router.route('/notifications/:name', function() {
  this.layout('container');
  this.render('tags', { data: { name: this.params.name }});
});

Router.route('/full/:id', function() {
  this.layout('container');
  this.render('full', { data: { id: this.params.id }});
});
