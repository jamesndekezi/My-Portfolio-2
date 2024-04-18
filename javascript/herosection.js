const trackText = document.getElementById("track-text");
const trackDescription = document.getElementById("track-description");
const trackImage = document.getElementById("track-image");

const texts = [
  "RUKUNDO Soleil",
  "A FullStack Software </br> Engineer",
  "Junior Smart Contract </br> Developer",
];

// const images = [
//   "../images/me.png",
//   "../images/roadmap.jpg",
//   "../images/stacks/solidity.png",
// ];

let index = 0;

const loadWord = () => {
  const currentWord = texts[index];
  let charIndex = 0;

  // trackImage.src = images[index];

  const typeInterval = setInterval(() => {
    trackText.innerHTML = currentWord.substring(0, charIndex);
    charIndex++;

    if (charIndex > currentWord.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        deleteWord(currentWord);
      }, 1000);
    }
  }, 100);
};

const deleteWord = (word) => {
  let charIndex = word.length;
  const deleteInterval = setInterval(() => {
    trackText.innerHTML = word.substring(0, charIndex);
    charIndex--;

    if (charIndex < 0) {
      clearInterval(deleteInterval);
      index++;
      if (index >= texts.length) {
        index = 0;
      }
      setTimeout(loadWord, 1000);
    }
  }, 100);
};

loadWord();
