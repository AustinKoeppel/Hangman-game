var words = ["Zoidberg","Fry","Bender","Leela"];
var word = "";
var score = 0;
var wrongGuesses = 0;
var rightGuess = 0;
var letterArray = [];
var pause = false;
var block = false;

function pickWord()
{
    letterArray = [];
    pause = false;
    document.getElementById("space").style.display = "none";
    if(words.length > 0)
    {
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
    else
    {
        block = true;
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
    clearLetters();
}

function setScore()
{
    document.getElementById("score").innerHTML = "Score: " + score;
}

function setGuesses()
{
    document.getElementById("guesses").innerHTML = "Remaining Guesses: " + wrongGuesses;
}

function clearLetters()
{
    document.getElementById("letters").innerHTML = "";
}

function updateLetters(keyPressed)
{
    if(letterArray.length < 1)
    {
        var lettersSoFar = document.getElementById("letters").innerHTML;
        lettersSoFar = keyPressed;
        document.getElementById("letters").innerHTML = lettersSoFar;
    }
    else
    {
        var lettersSoFar = document.getElementById("letters").innerHTML;
        lettersSoFar = lettersSoFar + ", " + keyPressed;
        document.getElementById("letters").innerHTML = lettersSoFar;
    }
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
    if(block)
    {
        document.getElementById("space").textContent = "GAME OVER YOU'VE WON";
        document.getElementById("space").style.display = "block";
    }
    else{
            
        if(pause)
        {
            if(wrongGuesses >= 0 && words.length > 0)
            {
                document.getElementById("space").textContent = "Press Any Key To Keep Playing!";
                reset();
            }
            else
            {
                pickWord();
                setGuesses();
                clearLetters();   
            }
        }
        else
        {
            if(letterArray.includes(keyPressed)
                || x.keyCode < 65
                    || x.keyCode > 90)
            {
                //Do nothing?
            }
            else if(word.toLowerCase().includes(keyPressed))
            {
                showInstances(keyPressed);
                updateLetters(keyPressed);
                letterArray.push(keyPressed);
            }
            else
            {
                wrongGuesses--;
                setGuesses();
                updateLetters(keyPressed);
                letterArray.push(keyPressed);
            }
            if(wrongGuesses <= 0)
            {
                document.getElementById("space").textContent = "GAME OVER!\nANSWER WAS: " + word + "\nPress any key to keep playing";
                document.getElementById("space").style.lineHeight = "50px";
                document.getElementById("space").style.display = "block";
                words = ["Zoidberg","Fry","Bender","Leela"];
                pause=true;
            }
            else if(rightGuess >= word.length)
            {
                score++;
                pause=true;
                setScore();
                document.getElementById("space").style.display = "block";
            }
        }
    }
}