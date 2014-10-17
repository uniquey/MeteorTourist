PlayersList = new Meteor.Collection('players')

if(Meteor.isClient){
  Template.leaderboard.player = function(){
    return PlayersList.find();
  };
  Template.leaderboard.events({
    'dblclick li.player' : function(){
      console.log("You double-clicked player's list item")},
    'focus input' :  function(){
      console.log("You focus to the input")},
    'blur input' :  function(){
      console.log("You leave off the input")},
    'change #addPlayerName' : function(){
      console.log("You are inputing something")},
    'mousedown' : function(){
      console.log("Your mouse key is down")},
    'keyup' : function(){
      console.log("You are keying down")},
    'submit' : function(){
      console.log("Submit the input")},
  });
};