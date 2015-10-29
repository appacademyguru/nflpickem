"use strict";
///////////////////////////////////////////////////
Template.registerHelper("checkMaster", function(){
    var currentUserId = Meteor.userId(),
                currentUserName = Meteor.user().username;
            if (currentUserName === "master") {
                Router.go('/gameMaster');
                
            }});
////////////////////////////////////////////////////
    Template.homePage.helpers({
        'picks': function () {
            var currentUserId = Meteor.userId(),
                picks = UsersPicks.find({pickedBy: currentUserId}, {}),
                printPicks = "";
            picks.forEach(function (pick) {
                printPicks += pick.team + " " + pick.week + "<br>";
            });
            console.log(printPicks);
            return printPicks;
        },
        'userScore': function () {
            var currentUserId = Meteor.userId(),
                currentUsersPicks = UsersPicks.find({pickedBy: {$in: [currentUserId]}}),
                winningTeams = WinningTeams.find({}),
                games = Games.find({}),
                userScore = 0;
            currentUsersPicks.forEach(function (pick) {
                games.forEach(function (game) {
                    winningTeams.forEach(function (team) {
                        if (pick.team === team.team === game.team && pick.week === team.week === game.week) {
                            userScore += 1;
                        }
                    });
                });
            });
            return userScore;
        },
        'game': function () {
            return Games.find({});
        }
    });
///////////////////////////////////////////////////////
    Template.gameMaster.helpers({
        'checkMaster': function () {
            var currentUserId = Meteor.userId(),
                currentUserName = Meteor.user().username;
            if (currentUserName === "master") {
                Router.go('/gameMaster');
            }
        },
        'getWeeks': function(){
            Games.find({}, {sort: {week: 1}});
        }
    });
///////////////////////////////////////////////////////
    Template.weeklyResults.helpers({
        
    });
    