let data1 = "";
let data2 = "";

const cors = require('cors');
app.use(cors);

function getData(data1, name, number) {
	let count = 0;
    let found = false;
    while (count < data1.length && found == false){
        if (data1[count].name.toLowerCase() == name.toLowerCase()){
            found = true;
        } else{
            count++;
        }
    }
    if (found == false){
        if(number == 1){
            $("#resultName").html("Player not found"); 
        } else {
            $("#resultName2").html("Player not found"); 
        }
    } else {
        if(number == 1){
            $("#resultName").html(name); 
        } else {
            $("#resultName2").html(name); 
        }
        let id = data1[count].playerId;
        let url = "https://api-web.nhle.com/v1/player/" + id + "/landing"
        $.get(url, function(data){
            console.log(data);
            displayData(data, number);
        });
    }
}

function displayData(data, number){
    if (number == 1){
        if(data.position != "G"){
            if (data.isActive == true){
                $("#resultTeam").html(data.fullTeamName.default);
                $("#resultNationanality").html(data.birthCountry);
                $("#resultGames").html(data.careerTotals.regularSeason.gamesPlayed);
                $("#resultCareerGoals").html(data.careerTotals.regularSeason.goals);
                $("#resultCareerAssists").html(data.careerTotals.regularSeason.assists);
                $("#resultCareerPoints").html(data.careerTotals.regularSeason.points);
                $("#resultCareerPer").html(data.careerTotals.regularSeason.shootingPctg);
                $("#resultGoals").html(data.careerTotals.regularSeason.goals / data.careerTotals.regularSeason.gamesPlayed);
                $("#resultPoints").html(data.careerTotals.regularSeason.points / data.careerTotals.regularSeason.gamesPlayed);
                let ratingImageURL = data.headshot;
                $("#ratingImg").attr("src", ratingImageURL);
            } else {
                $("#resultTeam").html("Not Active");
                $("#resultNationanality").html(data.birthCountry);
                $("#resultGames").html(data.careerTotals.regularSeason.gamesPlayed);
                $("#resultCareerGoals").html(data.careerTotals.regularSeason.goals);
                $("#resultCareerAssists").html(data.careerTotals.regularSeason.assists);
                $("#resultCareerPoints").html(data.careerTotals.regularSeason.points);
                $("#resultCareerPer").html(data.careerTotals.regularSeason.shootingPctg);
                $("#resultGoals").html(data.careerTotals.regularSeason.goals / data.careerTotals.regularSeason.gamesPlayed);
                $("#resultPoints").html(data.careerTotals.regularSeason.points / data.careerTotals.regularSeason.gamesPlayed);
                let ratingImageURL = data.headshot;
                $("#ratingImg").attr("src", ratingImageURL);
            }
        } else {
            $("#resultTeam").html("Goalies not supported");
            $("#resultNationanality").html("");
            $("#resultGames").html("");
            $("#resultCareerGoals").html("");
            $("#resultCareerAssists").html("");
            $("#resultCareerPoints").html("");
            $("#resultCareerPer").html("");
            $("#resultGoals").html("");
            $("#resultPoints").html("");
            let ratingImageURL = data.headshot;
            $("#ratingImg").attr("src", ratingImageURL);
        }
        data1 = data;
    } else {
        if(data.position != "G"){
            if (data.isActive == true){
                $("#resultTeam2").html(data.fullTeamName.default);
                $("#resultNationanality2").html(data.birthCountry);
                $("#resultGames2").html(data.careerTotals.regularSeason.gamesPlayed);
                $("#resultCareerGoals2").html(data.careerTotals.regularSeason.goals);
                $("#resultCareerAssists2").html(data.careerTotals.regularSeason.assists);
                $("#resultCareerPoints2").html(data.careerTotals.regularSeason.points);
                $("#resultCareerPer2").html(data.careerTotals.regularSeason.shootingPctg);
                $("#resultGoals2").html(data.careerTotals.regularSeason.goals / data.careerTotals.regularSeason.gamesPlayed);
                $("#resultPoints2").html(data.careerTotals.regularSeason.points / data.careerTotals.regularSeason.gamesPlayed);
                let ratingImageURL = data.headshot;
                $("#ratingImg2").attr("src", ratingImageURL);
            } else {
                $("#resultTeam2").html("Not Active");
                $("#resultNationanality2").html(data.birthCountry);
                $("#resultGames2").html(data.careerTotals.regularSeason.gamesPlayed);
                $("#resultCareerGoals2").html(data.careerTotals.regularSeason.goals);
                $("#resultCareerAssists2").html(data.careerTotals.regularSeason.assists);
                $("#resultCareerPoints2").html(data.careerTotals.regularSeason.points);
                $("#resultCareerPer2").html(data.careerTotals.regularSeason.shootingPctg);
                $("#resultGoals2").html(data.careerTotals.regularSeason.goals / data.careerTotals.regularSeason.gamesPlayed);
                $("#resultPoints2").html(data.careerTotals.regularSeason.points / data.careerTotals.regularSeason.gamesPlayed);
                let ratingImageURL = data.headshot;
                $("#ratingImg2").attr("src", ratingImageURL);
            }
        } else {
            $("#resultTeam2").html("Goalies not supported");
            $("#resultNationanality2").html("");
            $("#resultGames2").html("");
            $("#resultCareerGoals2").html("");
            $("#resultCareerAssists2").html("");
            $("#resultCareerPoints2").html("");
            $("#resultCareerPer2").html("");
            $("#resultGoals2").html("");
            $("#resultPoints2").html("");
            let ratingImageURL = data.headshot;
            $("#ratingImg2").attr("src", ratingImageURL);
        }
        data2 = data;
    }
}

function compare(){
    if(data2.careerTotals.regularSeason.points == null || data1.careerTotals.regularSeason.points == null){
        $("#comparator").show();
        $("#resultCompare").html("insufficient data :(");
    } else {
        // goals
        if(data1.careerTotals.regularSeason.goals > data2.careerTotals.regularSeason.goals){
            $("#compareGoals").html(">");
            $("#resultCareerGoals").css('background-color', 'green');
            $("#resultCareerGoals2").css('background-color', 'red');
        } else if(data1.careerTotals.regularSeason.goals < data2.careerTotals.regularSeason.goals){
            $("#compareGoals").html("<");
            $("#resultCareerGoals2").css('background-color', 'green');
            $("#resultCareerGoals").css('background-color', 'red');
        } else {
            $("#compareGoals").html("=");
        }

        //points
        if(data1.careerTotals.regularSeason.points > data2.careerTotals.regularSeason.points){
            $("#comparePoints").html(">");
            $("#resultCareerPoints").css('background-color', 'green');
            $("#resultCareerPoints2").css('background-color', 'red');
        } else if(data1.careerTotals.regularSeason.points < data2.careerTotals.regularSeason.points){
            $("#comparePoints").html("<");
            $("#resultCareerPoints2").css('background-color', 'green');
            $("#resultCareerPoints").css('background-color', 'red');
        } else {
            $("#comparePoints").html("=");
        }


        //assists
        if(data1.careerTotals.regularSeason.assists > data2.careerTotals.regularSeason.assists){
            $("#compareAssists").html(">");
            $("#resultCareerAssists").css('background-color', 'green');
            $("#resultCareerAssists2").css('background-color', 'red');
        } else if(data1.careerTotals.regularSeason.assists < data2.careerTotals.regularSeason.assists){
            $("#compareAssists").html("<");
            $("#resultCareerAssists2").css('background-color', 'green');
            $("#resultCareerAssists").css('background-color', 'red');
        } else {
            $("#compareAssists").html("=");
        }

        //shooting per
        if(data1.careerTotals.regularSeason.shootingPctg > data2.careerTotals.regularSeason.shootingPctg){
            $("#comparePer").html(">");
            $("#resultCareerPer").css('background-color', 'green');
            $("#resultCareerPer2").css('background-color', 'red');
        } else if(data1.careerTotals.regularSeason.shootingPctg < data2.careerTotals.regularSeason.shootingPctg){
            $("#comparePer").html("<");
            $("#resultCareerPer2").css('background-color', 'green');
            $("#resultCareerPer").css('background-color', 'red');
        } else {
            $("#comparePer").html("=");
        }

        //goal per
        if(data1.careerTotals.regularSeason.goals / data1.careerTotals.regularSeason.gamesPlayed > data2.careerTotals.regularSeason.goals / data2.careerTotals.regularSeason.gamesPlayed){
            $("#compareGoalsPer").html(">");
            $("#resultGoals").css('background-color', 'green');
            $("#resultGoals2").css('background-color', 'red');
        } else if(data1.careerTotals.regularSeason.goals / data1.careerTotals.regularSeason.gamesPlayed < data2.careerTotals.regularSeason.goals / data2.careerTotals.regularSeason.gamesPlayed){
            $("#compareGoalsPer").html("<");
            $("#resultGoals2").css('background-color', 'green');
            $("#resultGoals").css('background-color', 'red');
        } else {
            $("#compareGoalsPer").html("=");
        }

        //point per
        if(data1.careerTotals.regularSeason.points / data1.careerTotals.regularSeason.gamesPlayed > data2.careerTotals.regularSeason.points / data2.careerTotals.regularSeason.gamesPlayed){
            $("#compareAssistsPer").html(">");
            $("#resultPoints").css('background-color', 'green');
            $("#resultPoints2").css('background-color', 'red');
        } else if(data1.careerTotals.regularSeason.points / data1.careerTotals.regularSeason.gamesPlayed < data2.careerTotals.regularSeason.points / data2.careerTotals.regularSeason.gamesPlayed){
            $("#compareAssistsPer").html("<");
            $("#resultPoints2").css('background-color', 'green');
            $("#resultPoints").css('background-color', 'red');
        } else {
            $("#compareAssistsPer").html("=");
        }

        //games played
        if(data1.careerTotals.regularSeason.gamesPlayed > data2.careerTotals.regularSeason.gamesPlayed){
            $("#compareGames").html(">");
            $("#resultGames").css('background-color', 'green');
            $("#resultGames2").css('background-color', 'red');
        } else if(data1.careerTotals.regularSeason.gamesPlayed < data2.careerTotals.regularSeason.gamesPlayed){
            $("#compareGames").html("<");
            $("#resultGames2").css('background-color', 'green');
            $("#resultGames").css('background-color', 'red');
        } else {
            $("#compareGames").html("=");
        }
    }
}

function submit() {
	$("#output").show();
    $("#output").show();
    $("#resultPoints2").css('background-color', 'rgb(240, 240, 255)');
    $("#resultPoints").css('background-color', 'rgb(240, 240, 255)');
    $("#resultGoals2").css('background-color', 'rgb(240, 240, 255)');
    $("#resultGoals").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerPer").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerPer2").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerPoints").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerPoints2").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerAssists").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerAssists2").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerGoals").css('background-color', 'rgb(240, 240, 255)');
    $("#resultCareerGoals2").css('background-color', 'rgb(240, 240, 255)');
    $("#compareGoals").html("");
    $("#compareAssists").html("");
    $("#comparePoints").html("");
    $("#comparePer").html("");
    $("#compareGoalsPer").html("");
    $("#compareAssistsPer").html("");
    /* https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=200&q=mcdavid */
    let PlayerName1 = document.getElementById("playerName1").value;
    let PlayerName2 = document.getElementById("playerName2").value;
    let url1 = "https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=200&q=";
    let playerSplit1 = PlayerName1.split(" ");
    url1 = url1 + playerSplit1[1];
    let url2 = "https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=200&q=";
    let playerSplit2 = PlayerName2.split(" ");
    url2 = url2 + playerSplit2[1];
    $.get(url1, function(data){
        console.log(data);
        getData(data, PlayerName1, 1);
    });
    $.get(url2, function(data){
        console.log(data);
        getData(data, PlayerName2, 2);
    });

}