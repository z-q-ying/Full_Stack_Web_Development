# 🌈 The Simon Game Challenge 🌈

## 📝 Description 📝
The Simon Game is a classic memory game 🧠. The game shows you a sequence of colors 🌈, one at a time, and your task is to remember and repeat the sequence in the same order. The sequence keeps getting longer and more challenging as you progress 📈.

## 🎮 How to Start the Game 🎮
1. Open the game and press any key to start 🎹.
2. Watch the buttons light up 💡 and listen to the sound 🔊 each button makes.
3. Repeat the pattern by clicking the buttons in the correct order ✅.
4. Each time you successfully repeat the sequence, one new color is added to the pattern 🎨.
5. Your task is to remember and repeat the entire sequence each time a new color is added 🤔.

👇 Below is a demo of a successful round (in the actual game, there will be accompanied sounds too) 🎉
![simon_game_success](https://github.com/z-q-ying/full_stack_web_development/assets/116849653/4816b42b-e7dd-4b4d-bb4c-76bfa8eead76)

👇 Below is a demo of a failed round (in the actual game, there will be accompanied sounds too) 😢
![simon_game_fail](https://github.com/z-q-ying/full_stack_web_development/assets/116849653/d7d279cb-14f7-4d6a-beaf-28b8726dca52)

## 🛠 Key Logic and Techniques Employed 🛠

**💻 Code Structure 💻**
- The **HTML** is straightforward and creates a 2x2 grid layout for the colored buttons 🌐.
- Styling for the game is done using **CSS**, providing a clean and appealing UI 🎨.
- The core game logic is implemented using **JavaScript** and **jQuery**. Key variables and functionalities include:

**🌐 Variables 🌐**
- buttonColours: An array that stores the colors 🎨.
- gamePattern: An array to keep track of the game sequence 📊.
- userClickedPattern: An array to track the user's sequence 🖱.
- level: To keep track of the game level 📈.

**🖱 Event Listeners 🖱**
- The game starts when any key is pressed ($(document).keypress() 🎹).
- Button clicks are captured and processed ($(".btn").click() 🖱).

**🎯 Functions 🎯**
- nextSequence(): Generates a new random color and adds it to gamePattern. Also handles UI updates 🔄.
- playSound(name): Plays the sound corresponding to the button pressed 🔊.
- animatePress(currentColour): Adds a brief animation when a button is clicked 🎬.
- checkAnswer(currentLevel): Compares the gamePattern array to the userClickedPattern array to see if the user's sequence is correct ✅.
- startOver(): Resets the game variables 🔄.
