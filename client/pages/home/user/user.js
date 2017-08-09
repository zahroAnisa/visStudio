
// Template.user.onCreated(function () {
//   Meteor.subscribe('roles');
// });

Template.user.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.roleUser = new ReactiveVar(false);
});

Template.user.helpers({
  roleUser() {
    return Template.instance().roleUser.get();
  },
});

Template.user.events({
  'click button'(event, instance) {
    const userId = Meteor.userId()
    var role = Roles.userIsInRole(userId, ['test3','test'], 'new-group')
    instance.roleUser.set(role); 
    // console.log('instance', instance.roleUser)
  },
});