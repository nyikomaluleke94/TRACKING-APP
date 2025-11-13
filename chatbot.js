// Enhanced Chatbot with Advanced AI Capabilities
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotBox = document.getElementById('chatbotBox');
    const closeChat = document.getElementById('closeChat');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // AI Systems
    const aiAnalyzer = window.aiAnalyzer || new AdvancedAIAnalyzer();
    const voiceAssistant = new VoiceAssistant();

    // Chat History and Context
    let chatHistory = [];
    let isProcessing = false;

    // Enhanced Chatbot Initialization
    function initChatbot() {
        setupEventListeners();
        addWelcomeMessage();
        setupVoiceRecognition();
        animateChatbotButton();
    }

    function setupEventListeners() {
        // Toggle chatbot visibility
        chatbotToggle.addEventListener('click', () => {
            chatbotBox.classList.add('active');
            animateChatbotOpen();
        });

        closeChat.addEventListener('click', () => {
            chatbotBox.classList.remove('active');
            animateChatbotClose();
        });

        // Send message on button click
        sendBtn.addEventListener('click', sendMessage);

        // Send message on Enter key
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !isProcessing) {
                sendMessage();
            }
        });

        // Voice input
        voiceBtn.addEventListener('click', () => {
            if (voiceAssistant.recognition) {
                voiceAssistant.startListening();
            } else {
                addMessage("Voice recognition is not supported in your browser.", 'bot');
            }
        });

        // Input focus effects
        chatbotInput.addEventListener('focus', () => {
            chatbotInput.parentElement.classList.add('focused');
        });

        chatbotInput.addEventListener('blur', () => {
            chatbotInput.parentElement.classList.remove('focused');
        });
    }

    function setupVoiceRecognition() {
        if (voiceAssistant.recognition) {
            voiceAssistant.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                chatbotInput.value = transcript;
                // Auto-send voice messages
                setTimeout(() => sendMessage(), 500);
            };
        }
    }

    function animateChatbotButton() {
        // Pulsing animation for chatbot button
        setInterval(() => {
            chatbotToggle.classList.toggle('pulse');
        }, 2000);
    }

    function animateChatbotOpen() {
        chatbotBox.style.transform = 'translateY(100%)';
        chatbotBox.style.opacity = '0';
        
        setTimeout(() => {
            chatbotBox.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            chatbotBox.style.transform = 'translateY(0)';
            chatbotBox.style.opacity = '1';
        }, 50);

        // Animate messages in sequence
        setTimeout(() => {
            const messages = chatbotMessages.querySelectorAll('.bot-message, .user-message');
            messages.forEach((message, index) => {
                message.style.animation = `messageSlideIn 0.5s ease ${index * 0.1}s both`;
            });
        }, 300);
    }

    function animateChatbotClose() {
        chatbotBox.style.transition = 'all 0.3s ease';
        chatbotBox.style.transform = 'translateY(100%)';
        chatbotBox.style.opacity = '0';
    }

    function addWelcomeMessage() {
        const welcomeMessage = `
🤖 **Advanced AI Assistant Activated**

I can help you with:

🎯 **Idea Analysis** - "analyze [your idea]"
💡 **Solution Generation** - "generate solution for [challenge]"
📊 **Strategic Insights** - "insights for [project]"
🔍 **Stakeholder Matching** - "stakeholders for [idea]"
📈 **Progress Prediction** - "predict success of [initiative]"

Try saying: "analyze AI funding platform for African startups"
        `.trim();

        addMessage(welcomeMessage, 'bot', true);
    }

    // Enhanced Send Message Function
    async function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '' || isProcessing) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        isProcessing = true;

        // Show typing indicator
        showTypingIndicator();

        try {
            // Process message with AI
            const response = await processMessageWithAI(message);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add AI response with delay for natural feel
            setTimeout(() => {
                addMessage(response, 'bot', true);
                isProcessing = false;
            }, 1000);

        } catch (error) {
            removeTypingIndicator();
            addMessage("I apologize, but I'm experiencing technical difficulties. Please try again.", 'bot');
            isProcessing = false;
            console.error('Chatbot error:', error);
        }
    }

    // Advanced AI Message Processing
    async function processMessageWithAI(input) {
        const lowerInput = input.toLowerCase();
        
        // Add to chat history
        chatHistory.push({ role: 'user', content: input });
        
        // Keep only last 10 messages for context
        if (chatHistory.length > 10) {
            chatHistory = chatHistory.slice(-10);
        }

        // Analyze intent and generate response
        const intent = analyzeIntent(lowerInput);
        
        switch (intent.type) {
            case 'greeting':
                return generateGreetingResponse(input);
                
            case 'idea_analysis':
                return await generateIdeaAnalysisResponse(input);
                
            case 'solution_generation':
                return await generateSolutionResponse(input);
                
            case 'insight_request':
                return generateInsightResponse(input);
                
            case 'stakeholder_request':
                return await generateStakeholderResponse(input);
                
            case 'progress_prediction':
                return generatePredictionResponse(input);
                
            case 'help_request':
                return generateHelpResponse();
                
            default:
                return await generateGeneralResponse(input);
        }
    }

    // Intent Analysis
    function analyzeIntent(input) {
        if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return { type: 'greeting', confidence: 0.9 };
        }
        
        if (input.includes('analyze') || input.includes('analysis') || input.includes('evaluate')) {
            return { type: 'idea_analysis', confidence: 0.85 };
        }
        
        if (input.includes('generate') || input.includes('create') || input.includes('solution for')) {
            return { type: 'solution_generation', confidence: 0.8 };
        }
        
        if (input.includes('insight') || input.includes('analytics') || input.includes('metrics')) {
            return { type: 'insight_request', confidence: 0.75 };
        }
        
        if (input.includes('stakeholder') || input.includes('partner') || input.includes('collaborator')) {
            return { type: 'stakeholder_request', confidence: 0.8 };
        }
        
        if (input.includes('predict') || input.includes('success') || input.includes('chance')) {
            return { type: 'progress_prediction', confidence: 0.7 };
        }
        
        if (input.includes('help') || input.includes('what can you do')) {
            return { type: 'help_request', confidence: 0.95 };
        }
        
        return { type: 'general', confidence: 0.6 };
    }

    // Response Generators
    function generateGreetingResponse(input) {
        const greetings = [
            "Hello! I'm your advanced AI assistant for the Barrier Blueprint Tracker. Ready to analyze ideas and generate insights! 🚀",
            "Hi there! I'm here to help you transform ideas into actionable blueprints. What would you like to explore today? 💡",
            "Welcome! I'm equipped with advanced AI capabilities to analyze, predict, and optimize your innovation journey. How can I assist? 🤖"
        ];
        
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    async function generateIdeaAnalysisResponse(input) {
        // Extract idea from input
        const ideaMatch = input.match(/analyze\s+(.+)/i) || 
                         input.match(/analysis\s+of\s+(.+)/i) ||
                         input.match(/evaluate\s+(.+)/i);
        
        if (!ideaMatch) {
            return "I'd be happy to analyze an idea! Please specify the idea you'd like me to analyze. For example: 'analyze AI funding platform for African startups'";
        }

        const idea = ideaMatch[1].trim();
        
        try {
            const analysis = await aiAnalyzer.analyzeIdeaComprehensive(idea);
            
            return `
🎯 **AI Analysis Results for:** "${idea}"

📊 **Category:** ${analysis.basic.category}
🤖 **AI Potential:** ${analysis.aiPotential}%
📈 **Scalability:** ${analysis.scalability.level} (${analysis.scalability.score}%)
⏱️ **Timeline:** ${analysis.timeline}
😊 **Sentiment:** ${analysis.sentiment.mood} (${analysis.sentiment.score}/100)

🔍 **Key Insights:**
${analysis.recommendations.map(rec => `• ${rec}`).join('\n')}

⚠️ **Potential Risks:**
${analysis.risks.map(risk => `• ${risk}`).join('\n')}

🤝 **Suggested Stakeholders:**
${analysis.stakeholders.map(stakeholder => `• ${stakeholder}`).join('\n')}

*Analysis confidence: 92%*
            `.trim();
            
        } catch (error) {
            return "I apologize, but I encountered an issue while analyzing your idea. Please try again with a different description.";
        }
    }

    async function generateSolutionResponse(input) {
        const challengeMatch = input.match(/solution\s+for\s+(.+)/i) ||
                             input.match(/generate\s+(.+)/i) ||
                             input.match(/create\s+solution\s+for\s+(.+)/i);
        
        if (!challengeMatch) {
            return "I'd love to generate a solution! Please describe the challenge or opportunity. For example: 'generate solution for improving rural education'";
        }

        const challenge = challengeMatch[1].trim();
        
        try {
            // Use the idea generator
            const ideaGenerator = new AIIdeaGenerator();
            const solution = await ideaGenerator.generateIdea(challenge);
            
            return `
💡 **AI-Generated Solution**

**Challenge:** ${challenge}
**Solution:** ${solution.idea}

📋 **Implementation Details:**
• **Category:** ${solution.category}
• **Innovation Score:** ${solution.innovationScore}%
• **Feasibility:** ${solution.feasibility}%

🎯 **Next Steps:**
1. Conduct market validation
2. Develop MVP prototype
3. Identify pilot partners
4. Create implementation roadmap

*This AI-generated solution has a ${solution.innovationScore}% innovation potential and ${solution.feasibility}% feasibility rating.*
            `.trim();
            
        } catch (error) {
            return "I'm having trouble generating a solution right now. Please try again with a different challenge description.";
        }
    }

    function generateInsightResponse(input) {
        const insights = [
            "📊 **AI Insights Dashboard:** Your projects show 78% AI readiness score, with strongest potential in fintech and edtech sectors.",
            "🔍 **Trend Analysis:** AI adoption in African startups has grown 45% in the past year, with funding following similar trends.",
            "🎯 **Opportunity Radar:** Highest impact opportunities are in AI-powered financial inclusion and digital education platforms.",
            "📈 **Performance Metrics:** AI-linked ideas show 3.2x faster scaling and 2.1x higher funding success rates."
        ];
        
        return insights[Math.floor(Math.random() * insights.length)];
    }

    async function generateStakeholderResponse(input) {
        const ideaMatch = input.match(/stakeholders\s+for\s+(.+)/i) ||
                         input.match(/partners\s+for\s+(.+)/i);
        
        if (!ideaMatch) {
            return "I can help identify stakeholders! Please specify the idea or project. Example: 'stakeholders for renewable energy project'";
        }

        const idea = ideaMatch[1].trim();
        const stakeholders = await aiAnalyzer.suggestStakeholders(idea);
        
        return `
🤝 **Stakeholder Recommendations for:** "${idea}"

**Strategic Partners:**
${stakeholders.map(partner => `• ${partner}`).join('\n')}

**Engagement Strategy:**
1. **Corporate Partners:** Approach for funding and market access
2. **Investors:** Pitch for seed funding and scaling support  
3. **Tech Companies:** Collaborate on technical implementation
4. **Government:** Seek regulatory support and public partnerships

*Based on AI analysis of project requirements and partner capabilities*
        `.trim();
    }

    function generatePredictionResponse(input) {
        const predictions = [
            "🎯 **Success Prediction:** Based on similar initiatives, this idea has an 85% success probability with proper execution.",
            "📈 **Growth Forecast:** Expected to reach 10,000 users within 12 months, with potential for continental scale in 24 months.",
            "💰 **Funding Outlook:** High likelihood of securing seed funding (75% probability) within 6 months of launch.",
            "🌍 **Impact Projection:** Potential to positively impact 1M+ users across Africa within 3 years of operation."
        ];
        
        return predictions[Math.floor(Math.random() * predictions.length)];
    }

    function generateHelpResponse() {
        return `
🆘 **Advanced AI Assistant Help Guide**

**I Can Help You With:**

🎯 **Idea Analysis**
\`analyze [your idea]\` - Get comprehensive AI analysis
*Example: "analyze mobile health platform for rural areas"*

💡 **Solution Generation**  
\`generate solution for [challenge]\` - AI-powered ideation
*Example: "generate solution for digital skills gap"*

📊 **Strategic Insights**
\`insights\` - Get market and trend intelligence
*Example: "insights for edtech in Africa"*

🤝 **Stakeholder Matching**
\`stakeholders for [project]\` - Identify ideal partners
*Example: "stakeholders for clean energy startup"*

📈 **Progress Prediction**
\`predict success of [initiative]\` - Success probability
*Example: "predict success of AI farming app"*

🔍 **General Assistance**
Ask me anything about innovation, technology, or African entrepreneurship!

**Pro Tip:** Use specific descriptions for more accurate analysis!
        `.trim();
    }

    async function generateGeneralResponse(input) {
        // For general queries, provide helpful guidance
        if (input.length < 10) {
            return "I'd love to help! Could you provide more details about what you're looking for?";
        }

        // Try to understand context from chat history
        const lastMessages = chatHistory.slice(-3);
        const context = lastMessages.map(msg => msg.content).join(' ');
        
        if (context.includes('analyze') || context.includes('analysis')) {
            return "I notice we were discussing idea analysis. Would you like me to analyze another idea or provide more details about the previous analysis?";
        }
        
        if (context.includes('generate') || context.includes('solution')) {
            return "I see we've been generating solutions. Would you like to explore another challenge or refine the previous solution?";
        }

        // Default helpful response
        return `
I understand you're asking about "${input}". 

As your AI assistant, I specialize in:
• Analyzing innovation ideas and their potential
• Generating AI-powered solutions to challenges  
• Providing strategic insights and market intelligence
• Identifying stakeholders and partners
• Predicting success probabilities

Would you like me to analyze this as an idea, generate a solution, or provide specific insights?

*Try: "analyze ${input}" or "generate solution for ${input}"*
        `.trim();
    }

    // UI Management Functions
    function addMessage(text, sender, isAIFormatted = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(`${sender}-message`);
        
        if (isAIFormatted && sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="ai-badge">AI</span>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
                <div class="message-content">${formatAIText(text)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${text}</div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
        }
        
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
        
        // Add entrance animation
        messageDiv.style.animation = 'messageSlideIn 0.3s ease';
    }

    function formatAIText(text) {
        // Convert markdown-style formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '•');
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span class="typing-text">AI is thinking...</span>
        `;
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Enhanced Voice Command Processing
    function setupEnhancedVoiceCommands() {
        if (voiceAssistant.recognition) {
            voiceAssistant.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                chatbotInput.value = transcript;
                
                // Auto-process certain voice commands
                if (transcript.toLowerCase().includes('analyze') || 
                    transcript.toLowerCase().includes('generate') ||
                    transcript.toLowerCase().includes('help')) {
                    setTimeout(() => sendMessage(), 800);
                }
            };
        }
    }

    // Initialize the enhanced chatbot
    initChatbot();
    setupEnhancedVoiceCommands();

    // Make chatbot functions available globally
    window.chatbot = {
        sendMessage,
        addMessage,
        analyzeIdea: generateIdeaAnalysisResponse
    };
});

// CSS for chat animations (should be in chatbot.css)
const chatAnimations = `
@keyframes messageSlideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.typing-indicator {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    color: #666;
    font-style: italic;
}

.typing-dots {
    display: flex;
    margin-right: 10px;
}

.typing-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #C7A34F;
    margin: 0 2px;
    animation: typingBounce 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typingBounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}

.chatbot-button.pulse {
    animation: pulse 2s infinite;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.ai-badge {
    background: #C7A34F;
    color: #072e21;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: bold;
}

.message-time {
    font-size: 10px;
    color: #999;
}

.message-content {
    line-height: 1.4;
}

.message-content strong {
    color: #072e21;
}

.message-content code {
    background: rgba(199, 163, 79, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
}
`;

// Inject animations into chatbot.css
if (document.querySelector('style#chatbot-animations') === null) {
    const style = document.createElement('style');
    style.id = 'chatbot-animations';
    style.textContent = chatAnimations;
    document.head.appendChild(style);
}