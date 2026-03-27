const inputField = document.getElementById('command-input');
const historyDiv = document.getElementById('history');
const terminalBody = document.getElementById('terminal-body');

// History variables
const commandHistory = [];
let historyIndex = -1;

// Data info
const data = {
    'about': `
<span class="keyword">PROFESSIONAL PROFILE:</span>

- Cybersecurity and Software Development Technician.
- Proactive professional with extensive learning capacity and teamwork skills.
- Passionate about computer security and development.
- Specialized in offensive security with a "Security by Design" approach in software development.
- 6+ years of self-taught experience in CTFs, Hack The Box, and occasional Bug Bounty/CVEs.
- Over 5 years of practical experience in Python, and +2 years of experience in PHP and Java (POO, MVC, Laravel, Spring Boot, APIs).
- Theoretical knowledge in C, and some experience with Node.js.
- Developer of security tools: multi-threaded port scanner, privilege escalation binary scanner for Linux, and a Bash 'Hangman' game.
    `,
    'skills': `
<span class="keyword">TECHNICAL SKILLS:</span>

- <span class="keyword">Languages:</span> Python/Bash/PowerShell/Java/PHP (Advanced Level) and a little bit of C.
- <span class="keyword">Security:</span> Advanced Pentesting, Ethical Hacking, SIEM tools.
- <span class="keyword">Infrastructure:</span> Networks, Hardware (Configuration and Troubleshooting).

<span class="keyword">SOFT SKILLS:</span>

- Teamwork.
- Technical communication.
- Continuous training.

<span class="keyword">LANGUAGES:</span>

- Spanish (Native).
- English (Intermediate - Technical English: Advanced reading and writing).
    `,
    'experience': `
<span class="keyword">PROFESSIONAL EXPERIENCE (Summary):</span>

> <span class="keyword">Web Application Deployment Intern</span>
  Collaboration in web application implementation and optimization of processes.
  Technologies: Plastic, Agora, Nexus, etc.

> <span class="keyword">IT Specialist Intern (IT Support)</span>
  Technical support for users, system maintenance.
  Configuration of networks and hardware equipment.

> <span class="keyword">Administrative Intern</span>
  Document management and customer service.
    `,
    'education': `
<span class="keyword">ACADEMIC BACKGROUND:</span>

* Specialization Course in Cybersecurity.
* Advanced Vocational Training in Web Application Development.
* Higher Level Degree in Networked Information Systems Administration.
* Mid-Level Degree in Administrative Management.
    `,
    'n3': `
<span class="keyword">CYBERSECURITY & BUG BOUNTY ACHIEVEMENTS:</span>

- <span class="keyword">Experience:</span> 6 years of self-taught training (BugBounty, CTFs and Hack The Box).
- <span class="keyword">Bugcrowd Profile:</span> <a href="https://bugcrowd.com/h/n3" target="_blank">bugcrowd.com/h/n3</a>
- <span class="keyword">Vulnerabilities reported:</span> HTML Injection, XSS, RCE, Information Disclosure, Open Redirect, among others. Also accepted vulnerabilities outside BugBounty (privately).
- <span class="keyword">Acknowledgments:</span> Responsible disclosures on personal blogs, international institutional sites, and recognized companies such as: 'Victoria's Secret', 'SoundCloud', 'Tether', 'MetabullAI'.
- <span class="keyword">Content:</span> Elaboration of technical writeups documenting exploitation and vulnerability analysis processes.
    `,
    'contact': `
<span class="keyword">CONTACT:</span>

Email: <a href="mailto:n3v3rm1nd8@proton.me">n3v3rm1nd8@proton.me</a>
    `,
    'github': `
<span class="keyword">REPOSITORIES:</span>

You can view my projects and code at:
- <a href="https://github.com/prueba9865" target="_blank">github.com/prueba9865</a>
- <a href="https://github.com/n3v3rm1nd8" target="_blank">github.com/n3v3rm1nd8</a>
    `,
    'help': `
<span class="keyword">AVAILABLE COMMANDS:</span>

  <span class="keyword">about</span>       -> Who I am and my professional profile.
  <span class="keyword">skills</span>      -> My technical and soft skills.
  <span class="keyword">experience</span>  -> Work history (tasks performed).
  <span class="keyword">education</span>   -> Academic titles and certifications.
  <span class="keyword">n3</span>          -> Ethical Hacking and Bug Bounty achievements.
  <span class="keyword">github</span>      -> Links to my code repositories.
  <span class="keyword">contact</span>     -> How to contact me.
  <span class="keyword">clear</span>       -> Clear the screen.
    `
};

inputField.addEventListener('keydown', function(event) {
    // Detect ArrowUp key for history navigation
    if (event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent cursor movement
        if (commandHistory.length === 0) return;

        // Move one step back in history
        historyIndex = Math.max(0, historyIndex - 1);
        inputField.value = commandHistory[historyIndex] || '';

        return;
    }

    // Detect ArrowDown key for history navigation
    if (event.key === 'ArrowDown') {
        event.preventDefault(); // Prevent cursor movement
        if (commandHistory.length === 0) return;

        // Move one step forward in history
        historyIndex = Math.min(commandHistory.length, historyIndex + 1);

        if (historyIndex === commandHistory.length) {
            inputField.value = ''; // Clear input if navigating past the last command
        } else {
            inputField.value = commandHistory[historyIndex];
        }
        
        return;
    }
    
    // Detect Ctrl + L (or Cmd + L on Mac)
    if ((event.ctrlKey || event.metaKey) && (event.key === 'l' || event.key === 'L')) {
        event.preventDefault(); // Prevent default browser action
        
        historyDiv.innerHTML = ''; // Simulate 'clear'
        
        // Show welcome message again
        const welcomeMsg = document.querySelector('.welcome-msg').cloneNode(true);
        historyDiv.appendChild(welcomeMsg);

        // Force scroll
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
    }

    if (event.key === 'Enter') {
        // Delete spaces and more here for proper command recognition
        const input = inputField.value.trim();
        const lowerCaseInput = input;
        processCommand(input, lowerCaseInput);
        inputField.value = '';
        
        // Reset history index to the end after execution
        historyIndex = commandHistory.length;
    }
});

// Keep focus on the input field
document.addEventListener('click', function() {
    inputField.focus();
});

function processCommand(cmd, lowerCaseCmd) {
    // Save non-empty, non-clear commands to history
    if (lowerCaseCmd !== '' && lowerCaseCmd !== 'clear') {
        // Only add if it's different from the last command to avoid duplicates
        if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== lowerCaseCmd) {
            commandHistory.push(lowerCaseCmd);
        }
    }
    
    // Create line for the command typed by the user (using original case for display)
    const cmdLine = document.createElement('div');
    cmdLine.className = 'output-line';
    cmdLine.innerHTML = `<span class="prompt">guest@n3v3rm1nd8:~$</span> ${cmd}`;
    historyDiv.appendChild(cmdLine);

    // Process response
    if (lowerCaseCmd === 'clear') {
        // If command is 'clear', clear history
        historyDiv.innerHTML = '';
        
        // Show welcome message again
        const welcomeMsg = document.querySelector('.welcome-msg').cloneNode(true);
        historyDiv.appendChild(welcomeMsg);
        
    } else if (data[lowerCaseCmd]) {
        const response = document.createElement('div');
        response.className = 'command-output';
        response.innerHTML = data[lowerCaseCmd];
        historyDiv.appendChild(response);
    } else if (cmd === '') {
        // Do nothing if empty
    } else {
        const error = document.createElement('div');
        error.className = 'command-output';
        error.style.color = '#ff5555';
        error.textContent = `Command not found: ${cmd}. Type 'help' to see the list.`;
        historyDiv.appendChild(error);
    }

    // Automatic scroll to the bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// On load, move welcome message to history and remove from main body
document.addEventListener('DOMContentLoaded', function() {
    const welcomeMsg = document.querySelector('.welcome-msg');
    const welcomeClone = welcomeMsg.cloneNode(true);
    welcomeMsg.remove();
    historyDiv.appendChild(welcomeClone);
});