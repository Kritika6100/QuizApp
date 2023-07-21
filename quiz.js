//validation for the registration-form
     function validate() {
      var userName = document.getElementById('user-name').value;
      var email = document.getElementById('email').value;
      var numberOfQuestions = document.getElementById('number-question').value;
      var selectedCategory = document.querySelector('input[name="category"]:checked');
      var selectedDifficulty = document.querySelector('input[name="level"]:checked');
      var errorMessage = '';
      if (userName.trim() === '') {
        errorMessage = 'Please enter a username.';
      } else if (!isValidEmail(email) ) {
        errorMessage = 'Please enter an email.';
      }
      else if (selectedCategory === null) {
        errorMessage = 'Please select a category.';
      } else if (selectedDifficulty === null) {
        errorMessage = 'Please select a difficulty level.';
      } 

      else if (numberOfQuestions < 5) {
        errorMessage = 'Number of questions must be at least 5.';
      }

      document.getElementById('error-message').textContent = errorMessage;

      if(errorMessage === '')
      {
       
        document.getElementById("quiz-container").style.display = "block";
        document.getElementById("registration-form").style.display = "none";
        return true;
      } 
      else {
        return false;
      }
     }
     function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
    document.getElementById('registration-form')?.addEventListener('submit', function(event) {

        event.preventDefault();
        console.log(document.getElementById('number-question'));
        if(validate()){

        var numberOfQuestions = document.getElementById('number-question').value;

        var level = document.querySelector('input[name="level"]:checked').value;
        var questionCategory = document.querySelector('input[name="category"]:checked').value;
         
        

        const API_URL='https://opentdb.com/api.php?amount='+ numberOfQuestions + ' &category= ' + questionCategory + '&difficulty=' + level +'&type=' + 'multiple';
        fetch(API_URL)
        .then(function(response) {
            console.log(response);
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();

        })
        .then(function(data) {
            console.log(data);
            showQuestions(data);
        //     document.getElementById("quiz-container").style.display = "block";
        // document.getElementById("registration-form").style.display = "none";
        })

        .catch(function(error) {
            displayError(error);
        });
    }
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', submitQuiz);

    });
    var currentQuestionIndex = 0;
    var isTimerPaused = false;
var score = 0;

var timer;

var data1;
var isQuizSubmitted = false;

var i;
    var questionElement = document.getElementById('questionID');

    var option_0Element = document.getElementById('option_0');
    
    var option_1Element = document.getElementById('option_1');
    
    var option_2Element = document.getElementById('option_2');
    
    var option_corrElement = document.getElementById('option_corr');
    
    var nextButton = document.getElementById('nextButton');
    
    var timerElement = document.getElementById('timer')
    
     
    
    function showQuestions(data) {
    
        data1=data;
    
        
    
        currentQuestionIndex = data.results.length;
    
        i=0;
      // updateQuestionCount();
        helper(i);
        startTimer(20);
  //       
      
    
        
        const nextButton = document.getElementById('nextButton');
        nextButton.style.display = 'block';
      
        const errorBlock = document.getElementById('error-block');
        errorBlock.innerHTML = '';

       // const questionContainer = document.getElementById('question-container');
       // questionContainer.innerHTML += '<div id="timer">Time Left: <span id="timer-countdown"></span> seconds</div>';
       const timerElement = document.getElementById('timer-countdown');
       timerElement.textContent = '20'; 
        //submitElement.innerHTML = '<button type="submit"> next </button>';    
        const submitButton = document.getElementById('submitButton');
        
        //submitButton.addEventListener("click", handleNextButtonClick);
        
        document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('registration-form').style.display = 'none';
//   var submitButton = document.getElementById('submitButton');
// submitButton.setAttribute('data-question-index', i);
submitButton.removeEventListener('click', submitQuiz); // Attach the event listener to the submit button

// Reset the result message
var resultMessageElement = document.getElementById('resultMessage');
resultMessageElement.textContent = '';


    }
    
     
    
    //let currentIndex = 0;
    
    function helper(i)
    
    {
    
        // console.log("helper declaration")
    
        // var show = data1.results[i].question;
    
        // var choice_0 =data1.results[i].incorrect_answers[0];
    
        // var choice_1 =data1.results[i].incorrect_answers[1];
    
        // var choice_2 =data1.results[i].incorrect_answers[2];
    
        // var choice_corr = data1.results[i].correct_answer;
    
        // console.log(choice_corr)
        var show = data1.results[i].question;
  var choices = data1.results[i].incorrect_answers;
  choices.push(data1.results[i].correct_answer);
 choices=shuffle(choices);
  var optionsHTML = '';
  for (var j = 0; j < choices.length; j++) {
    var choice = choices[j];
    optionsHTML += '<input type="radio" name="answer" id="option_' + j + '" value="' + choice + '">';
    optionsHTML += '<label for="option_' + j + '">' + choice + '</label><br>';
//     optionsHTML += '<input type="radio" name="answer" value="' + choice + '">';
// optionsHTML += '<label>' + choice + '</label><br>';

  }
    
  var questionElement = document.getElementById('questionID');
  questionElement.innerHTML = show;

  var optionsElement = document.getElementById('optionsContainer');
  optionsElement.innerHTML = optionsHTML;
    
  var resultMessageElement = document.getElementById('resultMessage');
  resultMessageElement.textContent = ''; // Clear the result message

        // const questionElement = document.getElementById('quiz-container');
    
        // questionElement.innerHTML = '<p>' + show + '</p><br> <input type="radio"> <label>' + choice_0 + '</label><br> <input type="radio"> <label>' + choice_1 + '</label><br> <input type="radio"> <label>' + choice_2 + '</label><br> <input type="radio"> <label>' + choice_corr + '</label><br>'
    
    }
    
    function handleNextButtonClick() {
    
        
       nextButton.disabled=true;
        // Add any other actions you want to perform when the "Next" button is clicked.
      clearInterval(timerInterval);
        var selectedAnswer = document.querySelector('input[name="answer"]:checked');
        var correctAnswer = data1.results[i];
        if (isQuizSubmitted) {
          // Re-enable the submit button for the next question
          var submitButton = document.getElementById('submitButton');
          submitButton.disabled = false;
        } 

  if (selectedAnswer && correctAnswer && correctAnswer.correct_answer) {
    var correctAnswer = correctAnswer.correct_answer;
        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
          score++;
        }
        i++;
        if (i < currentQuestionIndex) {
          helper(i);
          startTimer(20); 
          //updateQuestionCount();// Restart the timer for the next question
        } else {
          // Quiz is finished
          // Perform any final actions, such as calculating the score
          // You can also display the score or show a summary of the quiz
          // Here, we'll just display an alert with the score
         //showScore();
          alert('Quiz finished! Your score is: ' + score);
        }
      }
      else {
        // Move to the next question even if the user hasn't selected an answer
        i++;
        if (i < currentQuestionIndex) {
          helper(i);
          startTimer(20); // Restart the timer for the next question
        } else {
          // Quiz is finished
          // Perform any final actions, such as calculating the score
          // You can also display the score or show a summary of the quiz
          // Here, we'll just display an alert with the score
    
          alert('Quiz finished! Your score is: ' + score);
        }
        if (timerElement.textContent <= 0) {
          clearInterval(timerInterval);
        }
        
      }
    }
      function startTimer() {
        var timeLeft = 20;
        var timerElement = document.getElementById('timer-countdown');
        timerElement.textContent = timeLeft;
        clearInterval(timer);
      
        timerInterval = setInterval(function() {
          timeLeft--;
          timerElement.textContent = timeLeft;
      
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
          
            handleNextButtonClick();
           //return;
          
        }
        
          //timerElement.textContent=timeLeft;
          
        }, 1000);
      }
     
      function submitQuiz() {
        var questionIndex = i; // Assuming `i` is the current question index
        var selectedAnswer = document.querySelector('input[name="answer"]:checked');
      
        if (!selectedAnswer) {
          // No answer selected
          return;
        }
      
        var userAnswer = selectedAnswer.value;
        var correctAnswer = data1.results[questionIndex].correct_answer;
      
        var resultMessage = "";
        if (userAnswer === correctAnswer) {
          resultMessage = "Your answer is correct!";
          document.getElementById('resultMessage').classList.add('correct');
    document.getElementById('resultMessage').classList.remove('incorrect');
         
        } else {
          resultMessage = "Your answer is incorrect. The correct answer is: " + correctAnswer;
          document.getElementById('resultMessage').classList.add('incorrect');
          document.getElementById('resultMessage').classList.remove('correct');
        
        }
      
        // Display the result message
        var resultElement = document.getElementById('resultMessage');
        resultElement.textContent = resultMessage;
        
      
        // Show the next button
        var nextButton = document.getElementById('nextButton');
        nextButton.style.display = 'block';
        //submitButton.style.display='none';
      
        // Disable the submit button
       var submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;
        isQuizSubmitted= true;
        //document.getElementById('submitButton').addEventListener('click', submitQuiz);
        clearInterval(timerInterval);
        nextButton.disabled=false;
        
      }
      var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', submitQuiz);
      //document.getElementById('submitButton').addEventListener('click', submitQuiz);
      

      
      
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    
     
    
    function displayError(error) {
    
        var questionElement = document.getElementById('error-block');
    
        console.log(questionElement)
    
        questionElement.innerHTML = '<p>Error: ' + error.message + '</p>';
    
    }
 

