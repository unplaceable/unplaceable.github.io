var loggedIn = 0;

$(document).ready(function ()
{
  populateProjects();

});


function populateProjects(projectsData){

  preProjects = `{
                      "projects": [
                        {
                          "Title": "Pathfinding Algorithm",
                          "Link": "github.com/euanacampbell/Pathfinding-Algorithm",
                          "Text": "Starting as a side-track from a university group project, this pathfinding algorithm uses methods from Dijkstra's Algorithm and A-Star as a method for determining a route. Results are promising, showing improvements in efficiency."
                        },
                        {
                          "Title": "Personal Portfolio",
                          "Link": "github.com/euanacampbell/Personal-Portfolio",
                          "Text": "Text Here"
                        }
                      ]
                    }`;

  projectsData = JSON.parse(preProjects);
  counter = 50;

  projectsData.projects.forEach(function(project){

      counter++;
      $clone = $("#projectThumb").clone();

      $clone.find("#thumbTitle").text(project.Title);
      $clone.find("#thumbLink").text(project.Link);
      $clone.find("#thumbText").text(project.Text);

      $clone.find("projectCollapse").setAttribute('href', "http://facebook.com");

      $("#projectContainer").append($clone);
  });

  $("#projectThumb").hide();

  return false;
}


function populateEndorsements(endorseData){
  endorseData.forEach(function(info){

      $clone = $("#endorsePanel").clone();

      $clone.find("#endorsement").text(info.Caption);
      $clone.find("#endNum").text(info.Endorsed);

      $("#endorseContainer").append($clone);
      console.log(1);

  });

  $("#endorsePanel").hide();

    return false;
}

function populateDropDown(data){

  for (i = 0; i < data.length; i++){
    $clone = $("#toDelUser").clone();
    $clone.text( data[i] );
    $("#delDropDown").append($clone);
  }

}

function loginAttempt(){
  event.preventDefault();
  var data ={};
  $("#loginForm").serializeArray().map(function(x){data[x.name] = x.value;});

  console.log("ACTION: Login Attempt");

  loggedInUser = data.inputusername;

  $.ajax({
      url: 'http://localhost:8080/user/login',
      type: 'post',
      dataType: 'json',
      success: function (data) {
          $("#loginResult").html("<p style='color:green;'>login success.</p>");
          postLogin();
          clearLogin();
          console.log("RESULT: Login successful");
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        $("#loginResult").html("<p style='color:red;'>username or password incorrect");
        console.log("RESULT: Login failed");
      },
      data: data
  });
return false;
}
