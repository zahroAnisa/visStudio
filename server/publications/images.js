Images.denyClient();
Images.collection.attachSchema(Images.schema);

if (!Images.find().count()) {
  Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
    fileName: 'logo.png',
    meta: {}
  });
}

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});