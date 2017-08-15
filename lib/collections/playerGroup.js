// Definition of the links collection

// import { Mongo } from 'meteor/mongo';

// export const Links = new Mongo.Collection('links');

PlayerGroup = new Mongo.Collection('playerGroup');

Meteor.methods({
  'playerGroup.update'(id, playerId) {
    check(id, String);
    check(playerId, String);
     
    PlayerGroup.update(
      {_id:id},
      { $set: {updateAt: new Date()} }     
    );
    return PlayerGroup.update(
      {_id:id},
      { $pull: { playerId: { $in: [ playerId ] }} }     
    );
  },
});


if (Meteor.isClient) {

}

if (Meteor.isServer) {
  // fixtures
  Meteor.startup(() => {
    // if the PlayerGroup collection is empty
    if (PlayerGroup.find().count() === 0) {
      const data = [
        {
          name: 'Group 01',
          playerId:  [],
          createdAt: new Date(),
          updateAt: new Date(),
        },
        {
          name: 'Group 02',
          playerId:  [],
          createdAt: new Date(),
          updateAt: new Date(),
        },
      ];
      data.forEach(playerGroup => PlayerGroup.insert(playerGroup));
    }
  });

  Meteor.publish('playerGroup.all', function () {
    return PlayerGroup.find();
  });
}
