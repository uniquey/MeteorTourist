PlayersList = new Meteor.Collection('players')



if(Meteor.isClient){
  //******按一定的顺序显示数据库中的Collection里的内容
  Template.leaderboard.player = function(){
    return PlayersList.find({},{sort:{score: -1}});
    //'-1'here means to sort in descending order-
      //meaning from the highest number to the lowest
      //or from Z to A 
  };
  
  
  Template.leaderboard.events({
      //*******点击列表有'player'class的li里的内容时在console中显示其Id
    'click li.player' : function(){
      var playerId = this._id;
      Session.set('selectedPlayer',playerId);
      var selectedPlayer = Session.get('selectedPlayer'); 
      console.log(selectedPlayer);
    },
    
//*******点击列Id为increment的东西时增加1分(score:1)
    'click #increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(
        {_id: selectedPlayer},
        {$inc: {score:1}}
        //pay attention that the '$set'or'$inc'must be here ,
	  //or the score one will instead the _id:selectedPlayer 
      );
    }
  });

  
  //*******在showSelectedPlayer这个Template中返回选中的Player,
    //以前面的event为前提
  Template.leaderboard.showSelectedPlayer = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  }

  Template.addPlayerForm.events({
    'submit form': function(theEvent, theTemplate){
      //If an Id needed here, add like this: submit form#Id name
      theEvent.preventDefault();
      var playerNameVar = theTemplate.find('#playerName').value
      PlayersList.insert({
        name: playerNameVar,
        score: 0
      })
    }
  })
  

  
   //*******选中的player会有css改变,与css文件中的.selected联用
  Template.leaderboard.selectedClass = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    var playerId = this._id;
    if(selectedPlayer === playerId){
      return 'selected';
    }
  }
}