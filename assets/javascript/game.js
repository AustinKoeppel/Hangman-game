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

var words = ["Zoidberg","Fry","bender","leela"];
var word = "";
var score = 0;
var wrongGuesses = 0;
var letterArray = [];

function pickWord()
{
    word = words[Math.floor(Math.random()*3)]
    wrongGuesses = word.length;
    console.log(wrongGuesses);
    console.log(word);
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
    var clear = "";
    for(var i = 0; i < word.length; i++)
    {
        clear = clear + "_";
    }
    document.getElementById("dashes").innerHTML = clear;
}

function showInstances(x)
{
    var dashes = document.getElementById("dashes");
    var dashesInner = dashes.innerHTML;
    
    for(var i = 0; i < word.length; i++)
    {
        if(word.charAt(i) == x)
        {
            console.log("dashesInner" + dashesInner);
            var firstSlice = dashesInner.slice(0,i);
            console.log("First slice:" + firstSlice);
            var secondSlice = dashesInner.slice(i+1,word.length);
            console.log("Second slice:" +secondSlice);
            dashesInner = dashesInner.slice(0,i) + x + dashesInner.slice(i+1,word.length);
        }
    }
    console.log(dashesInner);
    document.getElementById("dashes").innerHTML = dashesInner;
}

window.onload = function()
{
    pickWord();
    addElement();
}

document.onkeyup = function(x)
{
    var keyPressed = x.key;
    
    if(letterArray.includes(keyPressed))
    {
        //Do nothing?
    }
    else if(word.includes(keyPressed))
    {
        showInstances(keyPressed);

    }
    else
    {
        wrongGuesses--;
    }
    if(wrongGuesses <= 0)
    {
        alert("GAME OVER!");
        reset();
    }
    letterArray.push(keyPressed);
}