"use strict";
/////////////////////////////////////////////////////
var UsersList = Meteor.users;
var UsersPicks = new Mongo.Collection('userPicks');
var WinningTeams = new Mongo.Collection('winningTeams');
var Games = new Mongo.Collection('games');
//////////////////////////////////////////////////////////////
if (Meteor.isClient) {
    Session.setDefault('userName', "");

    Router.route('/', function () { this.render('mainPage'); });
    
    Router.route('/homePage', function () { this.render('homePage'); });
    
    Router.route('/yourPicks', function(){ this.render('yourPicks'); });
    
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
    
    Template.homePage.events({
        'click input': function (event) {
            var currentUserId = Meteor.userId();
            var teamName = $("#giants").val();
            console.log(teamName);
            var weekNum = $("class" select, [event]).val();
            UsersPicks.insert({
                pickedBy: currentUserId,
                team: teamName,
                week: weekNum
            });
        },
        'click #yourPicks': function (){
            Router.go('/yourPicks');
        }
    });
    
    Template.homePage.helpers({
        'picks': function(){
            var currentUserId = Meteor.userId();
            var picks = UsersPicks.find({pickedBy: currentUserId},{});
            var printPicks = "";
            picks.forEach(function(pick){
                printPicks += pick.team + " " + pick.week + "<br>";
            });
            console.log(printPicks);
            return printPicks;
        },
        'userScore': function(){
            var currentUserId = Meteor.userId();
            var currentUsersPicks = UsersPicks.find({pickedBy: {$in: [currentUserId]}});
            var winningTeams = WinningTeams.find({});
            var games = Games.find({});
            var userScore = 0;
            currentUsersPicks.forEach(function(pick){
                games.forEach(function(game){
                    winningTeams.forEach(function(team){
                        if(pick.team == team.team == game.team && pick.week == team.week == game.week){
                            userScore++;
                        }
                    });
                });
            });
            return userScore;
        },
        'checkMaster': function(){
            var currentUserId = Meteor.userId();
            var currentUserName = Meteor.user().username;
            if(currentUserName == "master"){
                Router.go('/gameMaster');
            }
        },
        'game': function(){
            
        }
    });
    
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        
    });
}
