"use strict";

if (Meteor.isClient) {
    Session.setDefault('userName', "");

    Router.route('/', function () { this.render('mainPage'); });
    
    Router.route('/homePage', function () { this.render('homePage'); });
    
    Router.route('/yourPicks', function () { this.render('yourPicks'); });
    
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
    
    Template.homePage.events({
        'click input': function (event) {
            var currentUserId = Meteor.userId(),
                teamName = event.currentTarget.defaultValue,
                weekNum = event.currentTarget.className;
            UsersPicks.insert({
                pickedBy: currentUserId,
                team: teamName,
                week: weekNum
            });
        },
        'click #yourPicks': function () {
            Router.go('/yourPicks');
        }
    });
    

    Template.gameMaster.events({
        'submit form': function(event){
            event.preventDefault();
            Games.insert({
                team1: event.target.team1,
                team2: event.target.team2,
                week: event.target.week
            });
        }
    });

    
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if(!UsersList.find({username: "master"})){
           UsersList.insert({
            username: "master",
            password: "master"
           });
        }
    });
}
