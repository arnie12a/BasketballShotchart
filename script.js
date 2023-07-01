var count = 0
var points = 0
document.addEventListener("click", myFunction);

function myFunction(e) {
  var xPos = e.clientX;
  var yPos = e.clientY;

  if(xPos > 10 & xPos < 532 & yPos < 490 & yPos > 25){
    //document.getElementById("demo").innerHTML = "Shot recorded";
    if(document.getElementById('made-shot').checked) {
        //Made shot radio button is checked
        //document.getElementById("message").innerHTML = "Shot was made!"
        createMadeDiv(xPos, yPos, count);
        count = count + 1
        //document.getElementById("points").innerHTML = "Pts: " + count
    }else if(document.getElementById('missed-shot').checked) {
        //Missed shot radio button is checked
        //document.getElementById("message").innerHTML = "Shot was missed!"
        createMissedDiv(xPos, yPos, count);
        count = count + 1
        //document.getElementById("points").innerHTML = "Pts: " + count
    }
  }
  else{
    //document.getElementById("demo").innerHTML = "Please select a valid shot on the court!";
    document.getElementById("message").innerHTML = ""
  }
  var shots = countMakes(count)
  let result = (shots[0]*3)+((shots[1])*2)
  document.getElementById("points").innerHTML = "Pts: " + result

}


function createMadeDiv(xPosition, yPosition, count){
    let div = document.createElement('div');
    div.style.position = "absolute";
    div.style.zIndex = "4";
    div.style.top = (yPosition - 30) + "px";
    div.style.left = (xPosition-10) + "px";
    div.style.innerHTML = "O"
    div.style.fontSize = "30px"
    div.innerHTML = "O"
    div.style.opacity = "0.8"
    div.className = "shot-made"
    div.id = "id" + count
    document.body.appendChild(div);
    
}

function createMissedDiv(xPosition, yPosition, count){
    let div = document.createElement('div');
    div.style.position = "absolute";
    div.style.zIndex = "4";
    div.style.top = (yPosition-15) + "px";
    div.style.left = (xPosition-10) + "px";
    div.style.innerHTML = "X"
    div.style.fontSize = "30px"
    div.style.opacity = "0.8"
    div.innerHTML = "X"
    div.className = "shot-missed"
    div.id = "id" + count
    document.body.appendChild(div);
}


function countMakes(count){
  /*
  center of hoop is at (275, 35) 
left side is at (32,35)
right side is at (512, 35)
*/
  var shots = []
  let twoPointTotal = 0
  let twoPointMade = 0
  let threePointTotal = 0
  let threePointMade = 0
  for (let i = 0; i < count; i++) {
    var identifier = "id" + i
    var node = document.getElementById(identifier)
    Xcoordinate = node.style.left.slice(0, -2)
    Ycoordinate = node.style.top.slice(0, -2)
    let hoopXcoordinate = 260
    let hoopYcoordinate = 8
    let x = Xcoordinate - hoopXcoordinate
    let y = Ycoordinate - hoopYcoordinate
    let distance = Math.sqrt(x*x + y*y)
    if(distance <= 240){
      if(node.className=="shot-missed"){
        twoPointTotal = twoPointTotal+1
      }
      else{
        twoPointMade = twoPointMade + 1
        twoPointTotal = twoPointTotal+1
      }
    }
    else {
      if(node.className=="shot-missed"){
        threePointTotal = threePointTotal + 1
      }
      else {
        threePointMade = threePointMade + 1
        threePointTotal = threePointTotal + 1
      }
    }
  }
  var fieldGoalPercentage = Math.round((twoPointMade+threePointMade)/(twoPointTotal+threePointTotal)*100, 2)
  var threePointPercentage = Math.round((threePointMade)/(threePointTotal)*100, 2)

  //var finalMessage = "FG: " + (twoPointMade+threePointMade) + "/" + (twoPointTotal+threePointTotal) + "<br>3PT: " + threePointMade + "/" + threePointTotal
  var finalMessage = "FG: " + (twoPointMade+threePointMade) + "/" + (twoPointTotal+threePointTotal) + " (" + fieldGoalPercentage + "%)<br>3PT: " + threePointMade + "/" + threePointTotal + " (" + threePointPercentage + "%)"
  if(!fieldGoalPercentage || !threePointPercentage){
    document.getElementById("data").innerHTML = ""
  }
  else{
    document.getElementById("data").innerHTML = finalMessage
  }
  shots.push(threePointMade)
  shots.push(twoPointMade)
  return shots;
}
