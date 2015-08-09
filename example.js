// allusers = new Mongo.Collection('myUsers');
allconversations = new Mongo.Collection('conversations');


Router.configure({
  layoutTemplate: 'container'
});

Router.route('/', function() {
  this.layout('container');
  this.render('home');
});

Router.route('/notifications/:category', function() {
  this.layout('container');
  this.render('collection', { data: { category: this.params.category }});
});

Router.route('/full/:id', function() {
  this.layout('container');
  this.render('full', { id: this.params.id });
});