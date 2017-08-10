
Template.upload.onCreated(function () {
  Meteor.subscribe('files.images.all');
});

Template.file.helpers({
  file() {
    return Images.findOne();
  }
});

// Template.upload.events({
//   'click button'() {
//     Meteor.logout();
//   },
// });