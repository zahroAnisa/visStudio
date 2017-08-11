
Template.test.onCreated(function() {
  // counter starts at 0
  // this.roleUser = new ReactiveVar(false);
});

Template.test.helpers({
  menus : [
    {url: '/test/login', title: 'login'},
    {url: '/test/upload', title: 'Upload file'},
    {url: '/test/sortable', title: 'Sortable list'},
    {url: '/test/group', title: 'Player/Group'},
  ]
});

Template.test.events({
  'click button'(event, instance) {

  },
});