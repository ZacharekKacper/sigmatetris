
let leaderboardData;
$('#submit-button').click(function(e) {
    e.preventDefault(); // zapobiega domyślnemu zachowaniu przycisku Submit
    const playerName = $('#PlayerName').val();

    if(!alreadySend && playerName != ""){
      alreadySend = true;
      const finalTime = $('#finalTimeNumber').html();
      $.ajax({
        type: 'POST',
        url: '/save-data',
        data: JSON.stringify({ playerName, score, finalTime, level}),
        contentType: 'application/json',
        success: function(response) {
          console.log(response);
          // Aktualizacja interfejsu użytkownika po pomyślnym zapisaniu danych
        },
        error: function(xhr, status, error) {
          console.error(error);
          // Obsługa błędów
        }
      });
      setTimeout(() => getLeaderboard(), 200);
    }
  });
  function getLeaderboard(){
    const xhr = new XMLHttpRequest();
        xhr.open('GET', '/data', true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            leaderboardData = JSON.parse(xhr.responseText);
            console.log(leaderboardData);
            document.querySelector("#leaderboard-table").innerHTML="<tr><th>Place</th><th>Name</th><th>Level</th><th>Score</th><th>Time</th></tr>";
            place = 1;
            leaderboardData.forEach(element => {
              document.querySelector("#leaderboard-table").innerHTML+=`<tr><td>${place}</td><td>${element.player}</td><td>${element.level}</td><td>${element.score.toLocaleString("en-US")}</td><td>${element.time}</td></tr>`
              place++;
            });
          }
        };
        leaderboardData = "";
        xhr.send();
  }
  getLeaderboard();