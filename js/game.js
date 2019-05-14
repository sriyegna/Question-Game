 /* Script to ask user 5 questions by modifying html page
 * 
 * I, Srinath Natarajan, 000770411 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
 */ 

$(window).load(function() {
	
	 //When the page has loaded.
	$(document).ready(function() {
		/*
		 * The current correct answer
		 *
		 * @type String
		 */ 
		var answer;
		/*
		 * The current question number
		 *
		 * @type int
		 */
		var questionAttempt = 0;
		/*
		 * The current score of the player
		 *
		 * @type int
		 */
		var score = 0;
		/*
		 * The array of string questions
		 *
		 * @type String[]
		 */
		var questions = ["What is 2 * 4?", "What is 5 * 10?", "Who is the president of the USA?", "What is 5 * 2", "What is 6 * 8?"];
		/*
		 * The array of string answers
		 *
		 * @type String[]
		 */	var answers = [8, 50, "donald trump", 10, 48];
		
		//Hide the answer menu until game is started
		$(".answer").hide(); 
		
		/**
		* Generates a random number from 0-100 other than the value given
		*
		* @param {answer} the current answer value
		* @returns {int} a random int that isnt the answer value
		*/
		function generateRandom(answer) {
			var num = parseInt(Math.floor(Math.random() * (100 - 0 + 1)));
			return (num == answer) ? generateRandom() : num;
		}
		
		function radioQuestion() {
			var num1 = parseInt((Math.random() * 10) + 1);
			var num2 = parseInt((Math.random() * 10) + 1);
			answer = num1 * num2;
			
			var a1 = generateRandom(answer);
			var a2 = generateRandom(answer);
			var a3 = generateRandom(answer);
			
			//Prep first answer
			var appendText = "<label class ='label1' for='answer'>" + a1 + "</label";
			$(".answer1").prepend(appendText);
			$(".answer").attr("type", "radio");
			$(".answer").attr("value", a1);
			$(".answer1").attr('width', '100px');
			
			//Prep second answer
			appendText = "<td class='td2'><label class ='label2' for='answer2'>" + a2 + "</label><input class='answer2' type='radio' value=" + a2 + "></td>";
			$(".answerrow").append(appendText);
			$(".a2").attr("value", a2);
			$(".td2").width('100px');
					
			//Prep third answer
			appendText = "<td class='td3'><label class ='label3' for='answer3'>" + a3 + "</label><input class='answer3' type='radio' value=" + a3 + "></td>";
			$(".answerrow").append(appendText);
			$(".a3").attr("value", a3);
			$(".td3").width('100px');
			
			
			//Prep question
			var question = "What is " + num1 + " * " + num2 + "?";
			$(".question").attr("colspan", 3);
			$(".question").text(question);
			
			
			var answerSpot = parseInt((Math.random() * 3) + 1);
			if (answerSpot == 1) {
				$(".answer").attr("value", answer);
				$(".label1").text(answer);
			}
			else if (answerSpot == 2) {
				$(".answer2").attr("value", answer);
				$(".label2").text(answer);
			}
			else {
				$(".answer3").attr("value", answer);
				$(".label3").text(answer);
			}
		}
		
		/**
		* Shows graphic for incorrect result with flashing red text
		*/
		function incorrectAnswer() {
			$(".result").text("Incorrect!");
			$(".result").css("background-color", "red");
			$(".result").fadeOut(1000);
		}
		
		/**
		* Shows graphic for correct result with flashing red text
		*/
		function correctAnswer() {
			$(".result").text("Correct!");
			$(".result").css("background-color", "green");
			$(".result").fadeOut(1000);
			score = score + 2;
			$(".score").text(score);
		}
		
		/**
		* When user presses submit button, we give them a question, wait for their answer, and then continue to the next
		* question until we ask all 5 questions, then we give them their result
		*/
		$(".submit").on("click", function() {
			$(".result").fadeIn();
			$(".result").val('');
			//When game has not started, if the user presses start, we load the game
			if (questionAttempt == 0) {
				$("table").show(0);
				$(".game").fadeOut(0);
				$(".game").fadeIn(500);
				$(".answer").show();
				$(".question").text(questions[0]);
				$(".submit").attr("value", "Submit answer");
			}
			//For the next 3 questions, ask a question and check the answer
			else if (questionAttempt >= 1 && questionAttempt <= 4) {
				$(".game").fadeOut(0);
				$(".game").fadeIn(500);
				//Checking if answer is right or wrong
				if (answers[questionAttempt - 1] == $(".answer").val()) {
					correctAnswer();
				}
				else {
					incorrectAnswer();
				}
				$(".question").text(questions[questionAttempt]);
				$(".answer").val('');
				//If weve asked 4 questions, ask a radio question
				if (questionAttempt == 4) {
					radioQuestion();
				}
			}
			//If on the 5th question
			else if (questionAttempt == 5) {
				$(".game").fadeOut(0);
				$(".game").fadeIn(500);
				//Checking radiobox answer and showing correct or incorrect
				if (($(".answer").is(':checked') && $(".answer").attr("value") == answer)
					|| ($(".answer2").is(':checked') && $(".answer2").attr("value") == answer)
					|| ($(".answer3").is(':checked') && $(".answer3").attr("value") == answer)) {
					correctAnswer();
				}
				else {
					incorrectAnswer();					
				}
				//Outputting user result
				var wordResult = "Excellent";
				if (score == 0) {
					wordResult = "very bad";
					$(".gameresult").css("color", "red");
				}
				if (score == 2) {
					wordResult = "bad";
					$(".gameresult").css("color", "orange");
				}
				if (score == 4) {
					wordResult = "okay";
					$(".gameresult").css("color", "yellow");
				}
				if (score == 6) {
					wordResult = "great";
					$(".gameresult").css("color", "green");
				}
				if (score == 8) {
					wordResult = "excellent";
					$(".gameresult").css("color", "lightgreen");
				}
				if (score == 10) {
					wordResult = "perfect";
					$(".gameresult").css("color", "gold");
					
				}
				//Hiding non essential information and showing result
				$("table").hide(500);
				$(".submit").hide(0);
				$(".brs").hide(0);
				$(".gameresult").text("You did " + wordResult + "! You had a score of " + score + ".");
			}
			questionAttempt = questionAttempt + 1;
		});
		$("table").hide(0);
		//Code to make answer blink
		var f = document.getElementById('gameresult');
		setInterval(function() {
			f.style.display = (f.style.display == 'none' ? '' : 'none');
		}, 1000);
	});
});