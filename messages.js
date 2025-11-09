// Message Management
let messageWindowOpen = false;
let agentReplying = false;
let userReplying = false;
let bossTyping = false; // Track if Sarah is currently typing
let agentModeActive = false; // Track if agent is handling the conversation
let pendingCalendarUpdate = false;
let messageHistory = [];
let conversationQueue = []; // Queue for sequential message flow

// Make variables accessible globally for AI chat
window.messageHistory = messageHistory;
window.pendingCalendarUpdate = pendingCalendarUpdate;

function showBossMessage() {
    const messageWindow = document.getElementById('messageWindow');
    const messageContent = document.getElementById('messageContent');
    
    // Show message window
    messageWindow.classList.add('active');
    messageWindowOpen = true;
    
    // Add initial boss message WITHOUT typing animation (first message)
    const bossMessage = "Hi, I need you to prepare for an urgent trip to Switzerland for a banking consortium meeting. Can you handle the travel arrangements?";
    addBossMessage(bossMessage);
    
    // Enable reply buttons after first message
    enableReplyButtons();
    
    showNotification('💬 New message from Boss - Sarah Mitchell');
}

// Make function globally accessible
window.showBossMessage = showBossMessage;

function showBossTyping(text) {
    const messageContent = document.getElementById('messageContent');
    
    // Set boss typing flag and disable buttons
    bossTyping = true;
    disableReplyButtons();
    
    // Create typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'bossTypingIndicator';
    typingIndicator.innerHTML = `
        <span>Sarah is typing</span>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    messageContent.appendChild(typingIndicator);
    messageContent.scrollTop = messageContent.scrollHeight;
    
    // Calculate typing duration based on message length (3-10 seconds)
    const minDuration = 3000; // 3 seconds
    const maxDuration = 10000; // 10 seconds
    const baseSpeed = 50; // milliseconds per character
    const calculatedDuration = Math.min(Math.max(text.length * baseSpeed, minDuration), maxDuration);
    
    // Remove typing indicator and show message after typing duration
    setTimeout(() => {
        const indicator = document.getElementById('bossTypingIndicator');
        if (indicator) {
            indicator.remove();
        }
        addBossMessage(text);
        
        // Enable reply buttons after message is complete
        bossTyping = false;
        
        // If agent mode is active, continue with conversation queue
        if (agentModeActive && !agentReplying) {
            // Wait a moment, then process next message in queue
            setTimeout(() => {
                processNextMessage();
            }, 1500);
        } else {
            enableReplyButtons();
        }
    }, calculatedDuration);
}

function addBossMessage(text) {
    const messageContent = document.getElementById('messageContent');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble boss';
    messageDiv.textContent = text;
    messageContent.appendChild(messageDiv);
    messageContent.scrollTop = messageContent.scrollHeight;
    
    messageHistory.push({ sender: 'boss', text: text });
    window.messageHistory = messageHistory;
}

function closeMessageWindow() {
    const messageWindow = document.getElementById('messageWindow');
    messageWindow.classList.remove('active');
    messageWindowOpen = false;
    
    // Hide reply input if open
    const inputArea = document.getElementById('messageInputArea');
    inputArea.classList.remove('active');
    userReplying = false;
}

function showReplyInput() {
    // Don't allow reply if Sarah is typing or agent mode is active
    if (bossTyping || agentModeActive) return;
    
    const inputArea = document.getElementById('messageInputArea');
    const input = document.getElementById('messageInput');
    
    if (userReplying) {
        // Hide if already showing
        inputArea.classList.remove('active');
        userReplying = false;
    } else {
        // Show input
        inputArea.classList.add('active');
        userReplying = true;
        input.focus();
    }
}

function handleMessageInput(event) {
    if (event.key === 'Enter') {
        sendUserReply();
    }
}

function sendUserReply() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    input.value = '';
    
    // Hide input area
    const inputArea = document.getElementById('messageInputArea');
    inputArea.classList.remove('active');
    userReplying = false;
    
    // Boss replies after a delay with typing animation
    // Disable buttons while waiting for boss reply
    disableReplyButtons();
    setTimeout(() => {
        const bossReply = "Great! Also, please make sure the hotel is near the conference center in Zurich.";
        showBossTyping(bossReply);
    }, 2000);
}

function addUserMessage(text) {
    const messageContent = document.getElementById('messageContent');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble agent';
    messageDiv.textContent = text;
    messageContent.appendChild(messageDiv);
    messageContent.scrollTop = messageContent.scrollHeight;
    
    messageHistory.push({ sender: 'user', text: text });
    window.messageHistory = messageHistory;
}

function askAgentToReply() {
    // Don't allow agent reply if Sarah is typing or agent is already replying
    if (agentReplying || bossTyping) return;
    
    // Activate agent mode for the entire conversation
    agentModeActive = true;
    
    const askAgentBtn = document.getElementById('askAgentBtn');
    const replyBtn = document.getElementById('replyBtn');
    
    // Disable both buttons and show agent is handling
    askAgentBtn.disabled = true;
    replyBtn.disabled = true;
    askAgentBtn.textContent = '🤖 Agent Handling Conversation';
    
    // Initialize conversation queue with 4-5 exchanges
    conversationQueue = [
        { type: 'agent', text: "Of course! I'll take care of the travel arrangements for your Switzerland trip. Let me handle the flight bookings, hotel reservations, and itinerary. I'll send you all the details shortly." },
        { type: 'boss', text: "Great! Also, please make sure the hotel is near the conference center in Zurich." },
        { type: 'agent', text: "Absolutely! I'll make sure to book a hotel near the conference center in Zurich. I'll prioritize locations within walking distance or a short commute." },
        { type: 'boss', text: "Perfect! And can you also arrange transportation from the airport to the hotel?" },
        { type: 'agent', text: "Of course! I'll arrange a private car service for airport pickup and drop-off. I'll make sure it's ready when you arrive." },
        { type: 'boss', text: "Excellent! One more thing - please make sure the flights are business class." },
        { type: 'agent', text: "Absolutely! I'll book business class flights for maximum comfort on your trip. I'll send you the flight options shortly." },
        { type: 'boss', text: "Perfect, thank you! Let me know once everything is confirmed." },
        { type: 'agent', text: "You're welcome! I'll keep you updated as I finalize all the arrangements. Everything should be confirmed shortly." }
    ];
    
    // Start the conversation flow
    processNextMessage();
}

function processNextMessage() {
    // If queue is empty, end conversation
    if (conversationQueue.length === 0) {
        setTimeout(() => {
            completeConversation();
        }, 2000);
        return;
    }
    
    const nextMessage = conversationQueue.shift();
    
    if (nextMessage.type === 'agent') {
        // Agent replies
        agentReplying = true;
        typeAgentMessage(nextMessage.text, () => {
            agentReplying = false;
            
            // Wait a moment before next message
            setTimeout(() => {
                processNextMessage();
            }, 2000);
        });
    } else if (nextMessage.type === 'boss') {
        // Boss sends message with typing animation
        showBossTyping(nextMessage.text);
        // processNextMessage will be called after boss message completes
    }
}

function disableReplyButtons() {
    const askAgentBtn = document.getElementById('askAgentBtn');
    const replyBtn = document.getElementById('replyBtn');
    if (askAgentBtn) askAgentBtn.disabled = true;
    if (replyBtn) replyBtn.disabled = true;
}

function enableReplyButtons() {
    // Only enable if agent is not currently replying and agent mode is not active
    if (agentReplying || agentModeActive) return;
    
    const askAgentBtn = document.getElementById('askAgentBtn');
    const replyBtn = document.getElementById('replyBtn');
    if (askAgentBtn) {
        askAgentBtn.disabled = false;
        askAgentBtn.textContent = '🤖 Ask Agent to Reply';
    }
    if (replyBtn) replyBtn.disabled = false;
}


function completeConversation() {
    // Show notification that conversation is done
    if (typeof showNotification === 'function') {
        showNotification('✅ Conversation completed successfully!');
    }
    
    // Wait a moment, then close the message window
    setTimeout(() => {
        closeMessageWindow();
        
        // Reset conversation state
        agentModeActive = false;
        agentReplying = false;
        bossTyping = false;
        messageHistory = [];
        conversationQueue = [];
        window.messageHistory = messageHistory;
        
        // Reset button text
        const askAgentBtn = document.getElementById('askAgentBtn');
        if (askAgentBtn) {
            askAgentBtn.textContent = '🤖 Ask Agent to Reply';
        }
        
        // Mark conversation as complete for half sidebar behavior
        window.conversationComplete = true;
        
        // Reset post-conversation handled flag when new conversation completes
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('postConversationHandled', 'false');
        }
    }, 1500);
}

function typeAgentMessage(text, callback) {
    const messageContent = document.getElementById('messageContent');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-bubble agent';
    messageContent.appendChild(messageDiv);
    
    let index = 0;
    const typingSpeed = 30 + Math.random() * 20; // Human-like typing speed (30-50ms per character)
    
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            messageDiv.textContent = text.substring(0, index + 1);
            messageContent.scrollTop = messageContent.scrollHeight;
            index++;
        } else {
            clearInterval(typingInterval);
            messageHistory.push({ sender: 'agent', text: text });
            window.messageHistory = messageHistory;
            if (callback) callback();
        }
    }, typingSpeed);
}

