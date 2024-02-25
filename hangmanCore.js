 const words = ["javascript", "hangman", "computer", "programming", "developer"];

 // შემთხვევით იღებს ერტერტ სიტყვას მასივიდან
 let selectedWord = words[Math.floor(Math.random() * words.length)];

 //გამოყენებული სიმბოლოების მასივი
 let guessedLetters = [];

 // არასწორი მცდელობების მთვლელი
 let incorrectGuesses = 0;

 // სიტყვის შესაბამისი ტირეების დაგენერირება და გამოტანა
 let wordDisplay = [];
 for (let i = 0; i < selectedWord.length; i++) {
   wordDisplay.push("_");
 }
 document.getElementById("wordToGuess").textContent = wordDisplay.join(" ");

 // ღილაკის  ქმედება
 function guess() {
   const guessInput = document.getElementById("guessInput");
   const guess = guessInput.value.toLowerCase();

   // ამოწმებს რომ შეყვანილი სიმბოლო იყოს მხოლოდ ერთი
   if (guess.length !== 1 || !/[a-z]/.test(guess)) {
     document.getElementById("message").textContent = "Please enter a single letter.";
     return;
   }

   // ამოწმებს შეყვანილი სიმბოლო არის თუ არა გამოყენებული
   if (guessedLetters.includes(guess)) {
     document.getElementById("message").textContent = "You already guessed that letter.";
     return;
   }

   // ამატებს გამოყენებული ასოების ერეის
   guessedLetters.push(guess);

   // ამოწმებს არის თუ არა სიმბოლო სიტყვაში
   if (selectedWord.includes(guess)) {
     // ტირეებს ცვლის შესაბამისი სიმბოლოებით
     for (let i = 0; i < selectedWord.length; i++) {
       if (selectedWord[i] === guess) {
         wordDisplay[i] = guess;
       }
     }
     // გადააწერს ელემენტ თავიდან
     document.getElementById("wordToGuess").textContent = wordDisplay.join(" ");
   } else {
     // არასწორი მცდელობების მთვლელი
     incorrectGuesses++;
     document.getElementById("incorrectGuesses").textContent = incorrectGuesses;
   }

   // ამოწმებს თუ ყველა ასო გამოცნობილია და გამოაქვს გამარჯვების შეტყობინება
   if (!wordDisplay.includes("_")) {
     document.getElementById("message").textContent = "Congratulations! You won!";
     guessInput.disabled = true;
   }

   // არასწორი მცდელობების მთვლელი
   if (incorrectGuesses === 10) {
     document.getElementById("message").textContent = "Game over! The word was: " + selectedWord;
     guessInput.disabled = true;
   }

   // ყოველ ჯერზე ინფუთის გასუფთავება
   guessInput.value = "";
 }