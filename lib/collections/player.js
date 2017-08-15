// Definition of the links collection

// import { Mongo } from 'meteor/mongo';

// export const Links = new Mongo.Collection('links');

Player = new Mongo.Collection('player');

Meteor.methods({
  'player.update'(id, data) {
    check(id, String);

    data.updateAt = new Date()
    return Player.update(
      {_id: id},
      { $set: data }     
    );
  },
});

if (Meteor.isServer) {
  // fixtures
  Meteor.startup(() => {
    // if the Links collection is empty
    if (Player.find().count() === 0) {
      const data = [
        {
          name: 'Player 01',
          key:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          playerGroupId: [],
          createdAt: new Date(),
          updateAt: new Date(),
        },
        {
          name: 'Player 02',
          key:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          playerGroupId: [],
          createdAt: new Date(),
          updateAt: new Date(),
        },
        {
          name: 'Player 03',
          key:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          playerGroupId: [],
          createdAt: new Date(),
          updateAt: new Date(),
        },
        {
          name: 'Player 04',
          key:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          playerGroupId: [],
          createdAt: new Date(),
          updateAt: new Date(),
        },
      ];
      data.forEach(player => Player.insert(player));
    }
  });

  Meteor.publish('player.all', function () {
    return Player.find();
  });


};