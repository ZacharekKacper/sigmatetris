
// let leaderboardData;
// $('#submit-button').click(function(e) {
//     e.preventDefault(); // zapobiega domyślnemu zachowaniu przycisku Submit
//     const playerName = $('#PlayerName').val();
//     if(!alreadySend && playerName != ""){
//       alreadySend = true;
//       const finalTime = $('#finalTimeNumber').html();
//       $.ajax({
//         type: 'POST',
//         url: '/save-data',
//         data: JSON.stringify({ playerName, score, finalTime, level}),
//         contentType: 'application/json',
//         success: function(response) {
//           console.log(response);
//           // Aktualizacja interfejsu użytkownika po pomyślnym zapisaniu danych
//         },
//         error: function(xhr, status, error) {
//           console.error(error);
//           // Obsługa błędów
//         }
//       });
//       setTimeout(() => getLeaderboard(), 200);
//     }
//   });
//   function getLeaderboard(){
//     const xhr = new XMLHttpRequest();
//         xhr.open('GET', '/data', true);
//         xhr.onreadystatechange = function () {
//           if (xhr.readyState === 4 && xhr.status === 200) {
//             leaderboardData = JSON.parse(xhr.responseText);
//             console.log(leaderboardData);
//             document.querySelector("#leaderboard-table").innerHTML="<tr><th>Place</th><th>Name</th><th>Level</th><th>Score</th><th>Time</th></tr>";
//             place = 1;
//             leaderboardData.forEach(element => {
//               document.querySelector("#leaderboard-table").innerHTML+=`<tr><td>${place}</td><td>${element.player}</td><td>${element.level}</td><td>${element.score.toLocaleString("en-US")}</td><td>${element.time}</td></tr>`
//               place++;
//             });
//           }
//         };
//         leaderboardData = "";
//         xhr.send();
//   }
//   getLeaderboard();
let tablicaWynikow = [];

function createCookie(name, value, days) {
  var expires;
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
  }
  else {
      expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
              c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
      }
  }
  return "";
}
$('#submit-button').click(function(e) {
  e.preventDefault();
  const playerName = $('#PlayerName').val();
  
  if(!alreadySend && playerName != ""){
    alreadySend = true;
    const finalTime = $('#finalTimeNumber').html();
    tablicaWynikow.push([score, playerName, finalTime, level]);
    tablicaWynikow.sort(sortFunction);
    let json_str = JSON.stringify(tablicaWynikow);
    createCookie("leaderboard",json_str);
  }
  setTimeout(() => getLeaderboard(), 200);
  
})


function getLeaderboard(){
  let json_str = getCookie("leaderboard");
  tablicaWynikow = JSON.parse(json_str);
  $('#leaderboard-table').html("<tr><th>Place</th><th>Name</th><th>Level</th><th>Score</th><th>Time</th></tr>");
  place = 1
  tablicaWynikow.forEach(element => {
    $('#leaderboard-table').append(`<tr><td>${place++}</td><td>${element[1]}</td><td>${element[3]}</td><td>${element[0].toLocaleString("en-US")}</td><td>${element[2]}</td></tr>`)
  });
}


function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}
getLeaderboard()