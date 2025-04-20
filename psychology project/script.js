// Define the word sets with 7 words each
const wordSets = [
    ["apple", "banana", "cherry", "date", "fig", "grape", "kiwi"],
    ["orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "vanilla"],
    ["avocado", "blueberry", "cantaloupe", "dragonfruit", "elderberry", "guava", "honeydew"],
    ["lime", "melon", "nectar", "olive", "peach", "pear", "plum"],
    ["coconut", "eggplant", "fennel", "grapefruit", "jalapeno", "kale", "leek"]
];

// Define distraction words with 7 words each
const distractionWords = [
    ["car", "house", "tree", "computer", "phone", "bottle", "shoe"],
    ["dog", "cat", "fish", "bird", "hamster", "turtle", "rabbit"],
    ["book", "pen", "pencil", "notebook", "paper", "folder", "stapler"],
    ["shirt", "pants", "hat", "shoes", "belt", "jacket", "socks"],
    ["coffee", "tea", "juice", "water", "soda", "milk", "wine"]
];

// Game variables
let currentSet = [];
let score = 0;

// Function to start the game
function startGame() {
    score = 0;
    document.getElementById('start-button').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    nextSet();
}

// Function to get a random set of words
function getRandomSet() {
    const randomIndex = Math.floor(Math.random() * wordSets.length);
    return wordSets[randomIndex];
}

// Function to display the next set of words
function nextSet() {
    // Get a random set of words
    currentSet = getRandomSet();
    
    // Display the words to the user
    const wordSetElement = document.getElementById('word-set');
    wordSetElement.textContent = currentSet.join(', ');
    
    // Show the word set for 10 seconds
    setTimeout(() => {
        wordSetElement.textContent = '';
        showDistractionWords();
    }, 10000); // 10 seconds
}

// Function to show distraction words
function showDistractionWords() {
    const distractionSet = getRandomDistractionSet();
    const wordSetElement = document.getElementById('word-set');
    wordSetElement.textContent = distractionSet.join(', ');
    
    // Show distraction words for 10 seconds, then prompt for recall
    setTimeout(() => {
        document.getElementById('recall-container').classList.remove('hidden');
        document.getElementById('game-container').classList.add('hidden');
    }, 10000); // 10 seconds
}

// Function to get a random distraction set
function getRandomDistractionSet() {
    const randomIndex = Math.floor(Math.random() * distractionWords.length);
    return distractionWords[randomIndex];
}

// Function to handle user input submission
function handleSubmit() {
    const recallInput = document.getElementById('recall-input').value;
    const userWords = recallInput.split(',').map(word => word.trim());
    
    // Check how many words the user recalled correctly
    score = currentSet.filter(word => userWords.includes(word)).length;
    
    // Show the result
    showResult();
}

// Function to show the result
function showResult() {
    const resultText = document.getElementById('result-text');
    resultText.textContent = `You recalled ${score} out of ${currentSet.length} words correctly!`;
    
    document.getElementById('recall-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
}

    // Function to replay the game
    function replayGame() {
        document.getElementById('result-container').classList.add('hidden');
        document.getElementById('start-button').classList.remove('hidden');
    }

    // Event listeners
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('next-button').addEventListener('click', nextSet);
    document.getElementById('submit-button').addEventListener('click', handleSubmit);
    document.getElementById('replay-button').addEventListener('click', replayGame);