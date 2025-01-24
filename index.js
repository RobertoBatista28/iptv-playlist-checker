// Autor: RobertoBatista28
// GitHub: https://github.com/RobertoBatista28
// This script checks the status of IPTV playlists and verifies if they contain the desired channels.

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');
const { exec } = require('child_process');

// Copy a text to the clipboard
function copyToClipboard(text) {
  const platform = process.platform;
  let command = '';

  if (platform === 'win32') {
    command = 'clip';
  } else if (platform === 'darwin') {
    command = 'pbcopy';
  } else {
    command = 'xclip -selection clipboard';
  }

  console.log(chalk.bgGray('Link copied to clipboard ✅ '));
  const proc = exec(command);
  proc.stdin.write(text);
  proc.stdin.end();
}

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userWantsToSkip = false;

// Listen for keypress events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'n') {
    userWantsToSkip = true;
    console.log(chalk.gray('\nSkipping to the next link... ⏳'));
  } else if (key.ctrl && key.name === 'c') {
    rl.close();
    process.exit();
  }
});

// Check the status of the playlists
async function checkPlaylists(playlistUrls) {
  try {
    const validLinks = [];

    for (const playlistUrl of playlistUrls) {
      userWantsToSkip = false; 

      let secondsElapsed = 0;
      const updateTimer = setInterval(() => {
        if (userWantsToSkip) return; 
        secondsElapsed++;
        const formattedSeconds = Math.floor(secondsElapsed / 4);
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`\r${chalk.blue(`Checking playlist: ${playlistUrl}`)} | Elapsed time: ${chalk.yellow(`${formattedSeconds}s`)}`);
      }, 250);

      try {
        const response = await axios.get(playlistUrl, { timeout: 10000 });

        if (userWantsToSkip) {
          clearInterval(updateTimer);
          copyToClipboard(playlistUrl);
          process.stdout.write('\n');
          continue; 
        }

        clearInterval(updateTimer);

        const playlistString = response.data;
        const playlistLines = playlistString.split('\n');

        let linkIsValid = false;

        // Verify if the playlist contains valid links
        for (const line of playlistLines) {
          if (line.startsWith('http')) {
            try {
              if (userWantsToSkip) break;
              await axios.head(line, { timeout: 10000 });
              linkIsValid = true;
              break;
            } catch (error) {
              // Go to the next playlist URL
            }
          }
        }

        // If the user wants to skip to the next URL, copy the current URL to the clipboard
        if (userWantsToSkip) {
          clearInterval(updateTimer);
          copyToClipboard(playlistUrl);
          process.stdout.write('\n'); 
          continue;
        }

        // Print the status of the playlist
        if (linkIsValid) {
          console.log(chalk.white(`\nLink: ${playlistUrl},`), chalk.green(`Status: Active`));
        } else {
          console.log(chalk.white(`\nLink: ${playlistUrl},`), chalk.red(`Status: Inactive`));
        }

        // Channels to check  &&  Check if the playlist contains the desired channels
        const desiredChannel = ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5'];
        if (hasChannel(playlistLines, desiredChannel)) {
          console.log(chalk.green(`The playlist contains the desired channels.`));
          validLinks.push(playlistUrl);
        } else if (linkIsValid) {
          console.log(chalk.yellow(`Active playlist but does NOT contain any of the desired channels.`));
        }

        console.log(chalk.magenta('--------------------------------------------------------------------------------------------------------------------------------------------------------------------------'));
      } catch (error) {
        if (!userWantsToSkip) {
          console.error(chalk.red(`\nError checking playlist: ${error.message}`));
        }
      } finally {
        clearInterval(updateTimer); 
      }

      // If the user wants to skip to the next URL, copy the current URL to the clipboard
      if (userWantsToSkip) {
        clearInterval(updateTimer);
        copyToClipboard(playlistUrl); 
        continue; 
      }
    }

    // Save valid links to a file
    if (validLinks.length > 0) {
      const filePath = path.join(__dirname, 'valid_playlists.txt');
      const watermark = `# Valid playlists checked by RobertoBatista28 on ${new Date().toLocaleString()}\n\n`;
      fs.writeFileSync(filePath, watermark + validLinks.join('\n'), 'utf8');
      console.log(chalk.green(`Valid links saved in ${filePath}`));
      console.log("The playlist's were verified by RobertoBatista28 script.");
    } else {
      console.log(chalk.red('No valid links found.'));
    }
  } catch (error) {
    console.error(chalk.red(`Error checking playlists: ${error.message}`));
  } finally {
    rl.close();
  }
}

// Verify if the playlist contains the desired channels
function hasChannel(playlistLines, desiredChannels) {
  for (const line of playlistLines) {
    for (const channel of desiredChannels) {
      if (line.includes(channel)) {
        return true;
      }
    }
  }
  return false;
}

// List of playlist URLs to check
const playlistUrls = [
  "http://playlist.example.com/playlist.m3u",
  "http://playlist.example.com/playlist2.m3u",
  "http://playlist.example.com/playlist3.m3u",
  "http://playlist.example.com/playlist4.m3u",
];

checkPlaylists(playlistUrls);
