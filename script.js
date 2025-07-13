const lineBox = document.getElementById('line');
const getLineBtn = document.getElementById('get-line');
const copyBtn = document.getElementById('copy-line');
const copyMsg = document.getElementById('copy-msg');

// Some songs to fetch lyrics from
const songs = [
  { artist: "Ed Sheeran", title: "Perfect" },
  { artist: "Coldplay", title: "Fix You" },
  { artist: "Adele", title: "Hello" },
  { artist: "Justin Bieber", title: "Baby" },
  { artist: "Imagine Dragons", title: "Believer" }
];

async function fetchLyrics(artist, title) {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();
    if (data.lyrics) {
      const lines = data.lyrics.split('\n').filter(line => line.trim() !== '');
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      // Animate text fade
      lineBox.style.opacity = 0;
      setTimeout(() => {
        lineBox.textContent = `"${randomLine}" — ${artist}`;
        lineBox.style.opacity = 1;
      }, 200);
      copyMsg.textContent = "";
    } else {
      lineBox.textContent = "Lyrics not found. Try again.";
    }
  } catch (error) {
    lineBox.textContent = "Failed to fetch lyrics. Try again later.";
  }
}

function generateRandomSongLine() {
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  fetchLyrics(randomSong.artist, randomSong.title);
}

function copyLine() {
  const line = lineBox.textContent;
  navigator.clipboard.writeText(line)
    .then(() => {
      copyMsg.textContent = "Line copied to clipboard 🎵";
    })
    .catch(() => {
      copyMsg.textContent = "Failed to copy.";
    });
}

getLineBtn.addEventListener('click', generateRandomSongLine);
copyBtn.addEventListener('click', copyLine);












