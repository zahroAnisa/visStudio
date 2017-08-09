// var postSignUp = function(userId, info) {
//   console.log('postSignUp', userId, info)
// }

// AccountsTemplates.configure({
//   // client can create user
//   forbidClientAccountCreation: true,
//   // [callback with your actions post full user creation goes here]
//   postSignUpHook: postSignUp

// })

Accounts.onCreateUser(function (options, user) {
  user.roles = {}
  user.roles[user._id] = ['admin'] 
  Roles.setUserRoles(user._id, ['admin'], user._id);
  // console.log('onCreateUser', options, user)
  return user
})
