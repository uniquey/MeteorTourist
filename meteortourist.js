PlayersList = new Meteor.Collection('players')


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
    },
      
    //*******点击Id为remove的东西时,从Collection中移除该信息
    'click #remove' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    },

    //*********点击Id为decrement的东西时,减去1分
    'click #decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(
        {_id:selectedPlayer},
        {$inc:{score: -1}}
        );
    }
  });

  
  //*******在showSelectedPlayer这个Template中返回选中的Player,
    //以前面的event为前提
  Template.leaderboard.showSelectedPlayer = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  }

  
  //按type为submit的东西或回车时,在Collection中增加一个新的元素
  Template.addPlayerForm.events({
    'submit form': function(theEvent, theTemplate){
      //If an Id needed here, add like this: submit form#Id name
      theEvent.preventDefault();
      var playerNameVar = theTemplate.find('#playerName').value
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
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