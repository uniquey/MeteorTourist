if(Meteor.isServer){
  Meteor.publish('thePlayers',function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
  });
  console.log(PlayersList.find().fetch());
}

if(Meteor.isClient){
  Meteor.subscribe('thePlayers');
//******按一定的顺序显示数据库中的Collection里的内容
  Template.leaderboard.player = function(){
    var currentUserId = Meteor.userId();
    return PlayersList.find(
      {createdBy: currentUserId},
      {sort:{score: -1, name: 1}}
      );
    //'-1'here means to sort in descending order-
      //meaning from the highest number to the lowest
      //or from Z to A 
};
 
 //*******选中的player会有css改变,与css文件中的.selected联用
Template.leaderboard.selectedClass = function(){
  var selectedPlayer = Session.get('selectedPlayer');
  var playerId = this._id;
  if(selectedPlayer === playerId){
    return 'selected';
  }
}
}