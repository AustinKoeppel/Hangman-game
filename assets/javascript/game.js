var car = {
    make: "Honda",
    model: "Fit",
    color: "Blue Raspberry",
    mileage: 3000,
    isWorking: true,

    driveToWork: function() {

        alert("Old Mileage: " + this.mileage);

        this.mileage = this.mileage + 8;

        alert("New mileage: " + this.mileage);
    },

    driveAroundWorld: function() {

        alert("Old Mileage: " + this.mileage);

        this.mileage = this.mileage + 24000;

        alert("New Mileage: " + this.mileage);
        alert("Car needs a tuneup!");

        this.isWorking = false;
    },

    getTuneUp: function() {
        alert("Car is ready to go!");
        this.isWorking = true;
    },

    honk: function() {
        alert("Honk! Honk!");
    }
};

var words = ["Zoidberg","Fry","Bender","Leela"];
var word = "";
var score = 0;
var wrongGuesses = 0;
var rightGuess = 0;
var letterArray = [];

function pickWord()
{
    letterArray = [];
    if(words.length > 0){
    //console.log(words);
    word = words[Math.floor(Math.random()*(words.length-1))]
    words.splice(words.indexOf(word),1);
    //console.log(words);
    wrongGuesses = word.length;
    rightGuess = 0;
    var clear = "";
    for(var i = 0; i < word.length; i++)
    {
        clear = clear + "_";
    }
    document.getElementById("dashes").innerHTML = clear;
    console.log(wrongGuesses);
    console.log(word);
    }
    else {
        alert("YOU WIN");
    }
}

function addElement () { 
    // create a new div element 
    var newDiv = document.createElement("div"); 
    // and give it some content 
    var dashes = "";
    for(var i = 0; i < word.length; i++)
    {
        dashes = dashes + "_";
    }
    var newContent = document.createTextNode(dashes); 
    // add the text node to the newly created div
    newDiv.appendChild(newContent);  
    //give it an id
    newDiv.setAttribute("id", "dashes")
    // add the newly created element and its content into the DOM 
    var currentDiv = document.getElementById("div1"); 
    document.body.insertBefore(newDiv, currentDiv);
}

function reset()
{
    pickWord();
    score = 0;
    rightGuess = 0;
    setScore();
    setGuesses();
}

function setScore()
{
    document.getElementById("score").innerHTML = "Score: " + score;
}

function setGuesses()
{
    document.getElementById("guesses").innerHTML = "Remaining Guesses: " + wrongGuesses;
}

function showInstances(x)
{
    var dashes = document.getElementById("dashes");
    var dashesInner = dashes.innerHTML;
    
    for(var i = 0; i < word.length; i++)
    {
        if(word.charAt(i).toLowerCase() == x)
        {
            rightGuess++;
            var firstSlice = dashesInner.slice(0,i);
            var secondSlice = dashesInner.slice(i+1,word.length);
            dashesInner = dashesInner.slice(0,i) + word.charAt(i) + dashesInner.slice(i+1,word.length);
        }
    }
    console.log(dashesInner);
    document.getElementById("dashes").innerHTML = dashesInner;
}

window.onload = function()
{
    reset();
}

document.onkeyup = function(x)
{
    var keyPressed = x.key.toLowerCase();
    
    if(letterArray.includes(keyPressed))
    {
        //Do nothing?
    }
    else if(word.toLowerCase().includes(keyPressed))
    {
        showInstances(keyPressed);
        letterArray.push(keyPressed);
    }
    else
    {
        wrongGuesses--;
        setGuesses();
        letterArray.push(keyPressed);
    }
    if(wrongGuesses <= 0)
    {
        alert("GAME OVER!");
        reset();
    }
    else if(rightGuess >= word.length)
    {
        score++;
        setScore();
        pickWord();
        setGuesses();
    }
    
}