window.onload = function(){
    
    
    var categories = []         // Categories Array
    var chosenCategory;         // Category Selected
    var chosenWord;             // Chosen Word
    var myLives;                // Available Lives
    var wordLength = 0;         // chosenWord length
    
    /*--- Elements ---*/
    var categoryName = document.getElementById('categoryName');
    var hold = document.getElementById('hold');
    var showLives = document.getElementById('myLives');
    var showClue = document.getElementById('clue');
    
    /*--- Button elements ---*/
    var getHint = document.getElementById('hint'); 
    var resetGame = document.getElementById('reset'); 
    
    var alphabets = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    
   
    /*--- Creating Alphabet Buttons ---*/
    var buttons = function(){
        
        var myButtons = document.getElementById('buttons');
        var letters = document.createElement('ul');               
        letters.id = 'alphabets';
        
        myButtons.appendChild(letters);
        
        for(var i = 0; i < alphabets.length; i++){
            
            var list_item = document.createElement('li');
            list_item.id = 'letter';
            list_item.innerHTML = alphabets[i];
            letters.appendChild(list_item);
            
            list_item.addEventListener('click', check);
        }
        
    }
    
    
    /*--- Selecting a Category and a Word randomly ---*/
    var selectCategory = function(){
        
        categories = [
            
            ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"]
        
        ];   
        
        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        chosenWord = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];    
        
        if(chosenCategory === categories[0]){
            
            categoryName.innerHTML = 'The Chosen Category Is Premier League Football Teams';
            
        }
        else if(chosenCategory === categories[1]){
         
            categoryName.innerHTML = 'The Chosen Category Is Films';
        }
        else{
            
            categoryName.innerHTML = 'The Chosen Category Is Cities';
        }
        
    }
    
    /*--- Word to be guessed ---*/
    var guessWord = function(){

        var revealWord = document.createElement('ul');
        revealWord.id  = 'my-word';
        hold.appendChild(revealWord);
        
        for(var i = 0; i < chosenWord.length; i++){
            
            var revealLetter = document.createElement('li');
            revealLetter.className = 'guess';
            
            if(chosenWord[i] != '-'){
               
                revealLetter.innerHTML = '_';
                wordLength++;
            
            }
            else{
                
                revealLetter.innerHTML = '-';
            }
               
            revealWord.appendChild(revealLetter);
        }
    
    }
    
    
    /*--- Checking if guessed letter is included in the chosen Word or not ---*/
    var check = function(){
        
        //this.classList.add('active');
        this.className = 'active';
        this.style.pointerEvents = 'none';
        
        var guesses = document.querySelectorAll('.guess');
        
        if(chosenWord.includes(this.innerHTML)){
            
            var str = new RegExp(this.innerHTML, "gi"); 
            var match = [...chosenWord.matchAll(str)];
            
            wordLength -= match.length;
            
            for(char of match){
                
                guesses[char.index].innerHTML = this.innerHTML;
                
            }
            
            if(wordLength == 0){
                
                status();
            }
            
        }
        else{
            
            myLives--;
            status();
            animate();
        }
        
    }
    
    /*--- Displaying game progress status ---*/
    var status = function(){
        
        if(wordLength == 0){
            
            showLives.innerHTML = "You Win!";
            
        }
        else if(myLives > 0){
            
            showLives.innerHTML = "You have " + myLives + " lives";
            
        }
        else{
            
            showLives.innerHTML = "Game Over";
            document.getElementById('alphabets').style.pointerEvents = 'none';
            getHint.style.pointerEvents = 'none';
            
        }
    }
    
    /*--- Display the relevant hint to help the user guess then corrcet word ---*/
    getHint.onclick = function(){
        
        hints = [
            
            ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
            ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
            ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
            
        ];
        
        
        var categoryIndex = categories.indexOf(chosenCategory);
        var wordIndex = chosenCategory.indexOf(chosenWord);
        showClue.innerHTML = "Clue: - " +  hints[categoryIndex][wordIndex];
        
    }
    
    /*--- Animate man ---*/
    var animate = function () {
        
        var drawMe = myLives ;
        drawArray[drawMe]();
        
    }
    
    
    /*--- Hangman Canvas ---*/
    canvas =  function(){

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        
    };
  
    /*--- Head ---*/
    head = function(){
        
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
        
    }
    
    /*--- Main draw function ---*/
    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke(); 
        
    }
    
    /*--- frame1 ---*/
    frame1 = function() {
        
        draw (0, 150, 150, 150);
       
    };
   
    /*--- frame2 ---*/
    frame2 = function() {
       
        draw (10, 0, 10, 600);
       
    };
    
    /*--- frame3 ---*/
    frame3 = function() {
       
        draw (0, 5, 70, 5);
       
    };
    
    /*--- frame4 ---*/
    frame4 = function() {
       
        draw (60, 5, 60, 15);
       
    };
    
    /*--- frame5 ---*/
    torso = function() {
        
        draw (60, 36, 60, 70);
        
    };
    
    /*--- frame6 ---*/
    rightArm = function() {
       
        draw (60, 46, 100, 50);
       
    };
  
    /*--- frame7 ---*/
    leftArm = function() {
       
        draw (60, 46, 20, 50);
       
    };
    
    /*--- frame8 ---*/
    rightLeg = function() {
       
        draw (60, 70, 100, 100);
       
    };
    
    /*--- frame9 ---*/
    leftLeg = function() {
       
        draw (60, 70, 20, 100);
       
    };
  
    drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 

    
    
    /*--- Resetting the overall game ---*/
    resetGame.onclick = function(){
        
        var alphabets = document.getElementById('alphabets');
        var revealWord = document.getElementById('my-word');
        
        alphabets.parentNode.removeChild(alphabets);
        revealWord.parentNode.removeChild(revealWord);
        getHint.style.pointerEvents = 'auto';
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
        
    }
    
    var play = function(){
        
        myLives = 10;
        
        buttons();
        selectCategory();
        guessWord();
        status();
        canvas();
    }
    
    play();
}