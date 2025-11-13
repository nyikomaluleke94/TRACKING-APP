// Sidebar navigation - YOUR EXISTING CODE
const navItems = document.querySelectorAll(".nav li");
const pages = document.querySelectorAll(".page");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));

    item.classList.add("active");
    const target = item.getAttribute("data-page");
    document.getElementById(target).classList.add("active");
    
    // Add animation to the activated page
    const activePage = document.getElementById(target);
    activePage.classList.add('animate__animated', 'animate__fadeIn');
    setTimeout(() => {
      activePage.classList.remove('animate__animated', 'animate__fadeIn');
    }, 1000);
  });
});

// Chart.js Data - YOUR EXISTING CODE
const barCtx = document.getElementById("barChart");
const pieCtx = document.getElementById("pieChart");

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Idea", "Pilot", "Scaled"],
    datasets: [{
      label: "Ideas",
      data: [3, 2, 3],
      backgroundColor: ["#d4af37", "#c8b16a", "#072e21"],
      borderColor: ["#b8942f", "#b8a46a", "#051a14"],
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    }]
  },
  options: { 
    plugins: { 
      legend: { display: false } 
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  }
});

new Chart(pieCtx, {
  type: "doughnut",
  data: {
    labels: ["Idea", "Pilot", "Scaled"],
    datasets: [{
      data: [3, 2, 3],
      backgroundColor: ["#d4af37", "#c8b16a", "#072e21"],
      borderColor: "#ffffff",
      borderWidth: 3,
      hoverOffset: 15
    }]
  },
  options: {
    plugins: { 
      legend: { position: "bottom" }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    },
    cutout: '60%'
  }
});

// ==================== ADVANCED AI ENHANCEMENTS ====================

// Advanced AI Analysis Engine with Real-time Processing
class AdvancedAIAnalyzer {
  constructor() {
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.ideaGenerator = new AIIdeaGenerator();
    this.voiceAssistant = new VoiceAssistant();
  }

  // Comprehensive Idea Analysis
  async analyzeIdeaComprehensive(ideaText) {
    const analysis = {
      basic: this.basicIdeaAnalysis(ideaText),
      sentiment: this.sentimentAnalyzer.analyzeSentiment(ideaText),
      aiPotential: this.calculateAIPotential(ideaText),
      scalability: this.assessScalability(ideaText),
      stakeholders: await this.suggestStakeholders(ideaText),
      timeline: this.predictTimeline(ideaText),
      risks: this.identifyRisks(ideaText),
      recommendations: this.generateRecommendations(ideaText)
    };

    // Add animation to analysis result
    this.animateAnalysisResult(analysis);
    return analysis;
  }

  basicIdeaAnalysis(idea) {
    return {
      category: this.categorizeIdea(idea),
      complexity: this.assessComplexity(idea),
      resourceNeeds: this.estimateResources(idea),
      marketSize: this.estimateMarketSize(idea)
    };
  }

  categorizeIdea(text) {
    const categories = {
      'AI & Technology': ['ai', 'artificial intelligence', 'machine learning', 'algorithm', 'data', 'automation', 'tech'],
      'Funding & Finance': ['fund', 'investment', 'capital', 'money', 'financial', 'bank', 'investor'],
      'Education & Training': ['train', 'educate', 'skills', 'learning', 'capacity', 'knowledge'],
      'Market Access': ['market', 'customers', 'distribution', 'access', 'sales', 'commercial'],
      'Social Impact': ['community', 'social', 'impact', 'sustainable', 'development', 'empowerment'],
      'Infrastructure': ['infrastructure', 'system', 'platform', 'network', 'digital']
    };

    const lowerText = text.toLowerCase();
    let bestMatch = 'General Innovation';
    let maxScore = 0;

    for (const [category, keywords] of Object.entries(categories)) {
      const score = keywords.filter(keyword => lowerText.includes(keyword)).length;
      if (score > maxScore) {
        maxScore = score;
        bestMatch = category;
      }
    }

    return bestMatch;
  }

  calculateAIPotential(text) {
    let score = 30; // Base score
    
    const aiKeywords = [
      'ai', 'artificial intelligence', 'machine learning', 'deep learning',
      'neural network', 'algorithm', 'data analysis', 'predictive',
      'automation', 'intelligent', 'smart system'
    ];

    const techKeywords = [
      'platform', 'digital', 'mobile', 'web', 'app', 'software',
      'technology', 'innovation', 'blockchain', 'iot'
    ];

    aiKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) score += 20;
    });

    techKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) score += 10;
    });

    // Cap at 100 and ensure minimum of 30
    return Math.max(30, Math.min(score, 100));
  }

  assessScalability(text) {
    const scalableTerms = [
      'platform', 'scale', 'scalable', 'continental', 'africa', 'global',
      'digital', 'mobile', 'replicable', 'expansion', 'growth'
    ];

    const score = scalableTerms.filter(term => 
      text.toLowerCase().includes(term)
    ).length * 15;

    if (score >= 60) return { level: 'High', score: Math.min(score, 100) };
    if (score >= 30) return { level: 'Medium', score };
    return { level: 'Low', score: Math.max(score, 20) };
  }

  async suggestStakeholders(idea) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const stakeholders = {
      'Corporate': ['MTN Group', 'Vodacom', 'Safaricom', 'Dangote Group'],
      'Investors': ['African Development Bank', 'VC4Africa', 'Angel Investors Network'],
      'Tech': ['Google Africa', 'Microsoft Africa', 'Andela', 'Flutterwave'],
      'Government': ['AU Commission', 'National Governments', 'Development Agencies'],
      'NGOs': ['UNDP Africa', 'World Bank Africa', 'Tony Elumelu Foundation']
    };

    const category = this.categorizeIdea(idea);
    const suggested = [];

    // Add relevant stakeholders based on category
    switch(category) {
      case 'AI & Technology':
        suggested.push(...stakeholders.Tech, ...stakeholders.Corporate);
        break;
      case 'Funding & Finance':
        suggested.push(...stakeholders.Investors, ...stakeholders.Corporate);
        break;
      case 'Education & Training':
        suggested.push(...stakeholders.Tech, ...stakeholders.NGOs);
        break;
      default:
        suggested.push(...stakeholders.Corporate, ...stakeholders.NGOs);
    }

    return suggested.slice(0, 4); // Return top 4
  }

  predictTimeline(text) {
    const length = text.length;
    const complexity = this.assessComplexity(text);
    
    if (complexity === 'High') return '12-24 months';
    if (complexity === 'Medium') return '6-12 months';
    return '3-6 months';
  }

  assessComplexity(text) {
    const complexIndicators = [
      'platform', 'system', 'integrated', 'multiple', 'complex',
      'advanced', 'sophisticated', 'comprehensive'
    ];

    const score = complexIndicators.filter(indicator =>
      text.toLowerCase().includes(indicator)
    ).length;

    if (score >= 3) return 'High';
    if (score >= 1) return 'Medium';
    return 'Low';
  }

  identifyRisks(text) {
    const risks = [];
    
    if (text.toLowerCase().includes('fund') && !text.toLowerCase().includes('secure')) {
      risks.push('Funding uncertainty');
    }
    
    if (text.toLowerCase().includes('technology') && text.toLowerCase().includes('new')) {
      risks.push('Technology adoption risk');
    }
    
    if (text.length < 50) {
      risks.push('Underdeveloped concept');
    }

    return risks.length > 0 ? risks : ['Low risk profile'];
  }

  generateRecommendations(text) {
    const recommendations = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('ai') || lowerText.includes('artificial')) {
      recommendations.push('Implement machine learning for predictive analytics');
      recommendations.push('Use natural language processing for user interactions');
    }

    if (lowerText.includes('fund') || lowerText.includes('investment')) {
      recommendations.push('Develop detailed financial projections');
      recommendations.push('Create investor pitch deck with market analysis');
    }

    if (lowerText.includes('education') || lowerText.includes('training')) {
      recommendations.push('Incorporate adaptive learning algorithms');
      recommendations.push('Develop mobile-first learning platform');
    }

    if (recommendations.length === 0) {
      recommendations.push('Conduct market validation research');
      recommendations.push('Develop minimum viable product (MVP)');
    }

    return recommendations.slice(0, 3);
  }

  animateAnalysisResult(analysis) {
    // Create a subtle animation effect when analysis is complete
    const event = new CustomEvent('aiAnalysisComplete', { detail: analysis });
    document.dispatchEvent(event);
  }
}

// Sentiment Analysis Engine
class SentimentAnalyzer {
  analyzeSentiment(text) {
    const positiveWords = [
      'innovative', 'transform', 'scale', 'impact', 'sustainable', 'growth',
      'opportunity', 'success', 'breakthrough', 'revolutionary', 'empower',
      'progress', 'advance', 'solution', 'positive', 'benefit'
    ];

    const negativeWords = [
      'challenge', 'barrier', 'limited', 'constraint', 'difficult', 'problem',
      'risk', 'issue', 'concern', 'obstacle', 'limitation', 'hardship'
    ];

    const lowerText = text.toLowerCase();
    const positive = positiveWords.filter(word => lowerText.includes(word)).length;
    const negative = negativeWords.filter(word => lowerText.includes(word)).length;
    const total = positive + negative;

    if (total === 0) return { score: 50, mood: 'neutral', confidence: 'low' };

    const score = ((positive - negative) / total) * 50 + 50; // Scale to 0-100
    let mood, confidence;

    if (score >= 70) {
      mood = 'positive';
      confidence = total >= 3 ? 'high' : 'medium';
    } else if (score <= 30) {
      mood = 'negative';
      confidence = total >= 2 ? 'high' : 'medium';
    } else {
      mood = 'neutral';
      confidence = 'medium';
    }

    return { score: Math.round(score), mood, confidence };
  }
}

// AI Idea Generator
class AIIdeaGenerator {
  constructor() {
    this.templates = [
      "AI-powered platform for {sector} that {benefit}",
      "Blockchain solution to {problem} in {industry}",
      "Mobile app that uses {technology} to {outcome}",
      "Sustainable {product} for {market} that {impact}",
      "Digital marketplace connecting {stakeholders} for {purpose}"
    ];

    this.sectors = ['education', 'healthcare', 'agriculture', 'finance', 'energy', 'transportation'];
    this.technologies = ['machine learning', 'blockchain', 'IoT', 'AR/VR', 'big data analytics'];
  }

  async generateIdea(prompt) {
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 2000));

    const template = this.templates[Math.floor(Math.random() * this.templates.length)];
    const sector = this.sectors[Math.floor(Math.random() * this.sectors.length)];
    const tech = this.technologies[Math.floor(Math.random() * this.technologies.length)];

    const idea = template
      .replace('{sector}', sector)
      .replace('{benefit}', `increases efficiency by 40%`)
      .replace('{problem}', `transparency issues`)
      .replace('{industry}', `African ${sector}`)
      .replace('{technology}', tech)
      .replace('{outcome}', `reduce costs by 30%`)
      .replace('{product}', `smart device`)
      .replace('{market}', `local communities`)
      .replace('{impact}', `creates sustainable jobs`)
      .replace('{stakeholders}', `local producers and global buyers`)
      .replace('{purpose}', `fair trade`);

    return {
      idea,
      category: this.categorizeGeneratedIdea(idea),
      innovationScore: Math.floor(Math.random() * 30) + 70, // 70-100
      feasibility: Math.floor(Math.random() * 40) + 60 // 60-100
    };
  }

  categorizeGeneratedIdea(idea) {
    if (idea.includes('AI') || idea.includes('machine learning')) return 'AI & Technology';
    if (idea.includes('blockchain')) return 'Fintech & Blockchain';
    if (idea.includes('sustainable') || idea.includes('green')) return 'Sustainability';
    return 'General Innovation';
  }
}

// Voice Assistant for Search
class VoiceAssistant {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.setupRecognition();
    }
  }

  setupRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.updateUI('listening');
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.handleVoiceCommand(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      this.isListening = false;
      this.updateUI('error');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.updateUI('ready');
    };
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
    }
  }

  handleVoiceCommand(transcript) {
    const searchInput = document.getElementById('aiSearch');
    if (searchInput) {
      searchInput.value = transcript;
      searchInput.focus();
      
      // Trigger search
      const event = new Event('input', { bubbles: true });
      searchInput.dispatchEvent(event);
    }
  }

  updateUI(state) {
    const voiceBtn = document.getElementById('voiceSearch');
    if (!voiceBtn) return;

    switch(state) {
      case 'listening':
        voiceBtn.innerHTML = '🔴';
        voiceBtn.style.animation = 'pulse 1s infinite';
        break;
      case 'error':
        voiceBtn.innerHTML = '❌';
        voiceBtn.style.animation = 'none';
        setTimeout(() => {
          voiceBtn.innerHTML = '🎤';
        }, 2000);
        break;
      default:
        voiceBtn.innerHTML = '🎤';
        voiceBtn.style.animation = 'none';
    }
  }
}

// Advanced Search with AI
class AdvancedAISearch {
  constructor() {
    this.ideas = [];
    this.filters = {
      category: 'all',
      aiScore: 0,
      scalability: 'all'
    };
  }

  async searchIdeas(query) {
    if (!query.trim()) return this.getAllIdeas();

    // Simulate AI-powered search
    await new Promise(resolve => setTimeout(resolve, 500));

    const results = this.ideas.filter(idea =>
      idea.title.toLowerCase().includes(query.toLowerCase()) ||
      idea.description.toLowerCase().includes(query.toLowerCase()) ||
      this.calculateRelevance(idea, query) > 0.3
    );

    return this.sortByRelevance(results, query);
  }

  calculateRelevance(idea, query) {
    const queryWords = query.toLowerCase().split(' ');
    let score = 0;

    queryWords.forEach(word => {
      if (idea.title.toLowerCase().includes(word)) score += 0.5;
      if (idea.description.toLowerCase().includes(word)) score += 0.3;
      if (idea.tags.includes(word)) score += 0.2;
    });

    return score / queryWords.length;
  }

  sortByRelevance(ideas, query) {
    return ideas.sort((a, b) => {
      const aScore = this.calculateRelevance(a, query);
      const bScore = this.calculateRelevance(b, query);
      return bScore - aScore;
    });
  }

  getAllIdeas() {
    return this.ideas;
  }
}

// Animation Controller
class AnimationController {
  static init() {
    this.animateOnScroll();
    this.animateStats();
    this.initializeGSAP();
  }

  static animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.ai-metric-item, .idea-item, .prediction-card').forEach(el => {
      observer.observe(el);
    });
  }

  static animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }

  static initializeGSAP() {
    if (typeof gsap !== 'undefined') {
      // Animate floating shapes
      gsap.to('.shape-1', {
        y: 20,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.to('.shape-2', {
        y: -15,
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  }
}

// Initialize Everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AI Systems
  const aiAnalyzer = new AdvancedAIAnalyzer();
  const ideaGenerator = new AIIdeaGenerator();
  const voiceAssistant = new VoiceAssistant();
  const aiSearch = new AdvancedAISearch();

  // Initialize Animations
  AnimationController.init();

  // Enhanced Idea Repository with AI Analysis
  function enhanceIdeaRepository() {
    const ideaItems = document.querySelectorAll('.idea-item');
    
    ideaItems.forEach((item, index) => {
      // Add staggered animation
      item.style.animationDelay = `${index * 0.1}s`;
      
      const title = item.querySelector('h3').textContent;
      const analysis = aiAnalyzer.analyzeIdeaComprehensive(title);
      
      // Update metrics with actual analysis
      const metrics = item.querySelector('.idea-metrics');
      if (metrics) {
        const aiPotentialBar = metrics.querySelector('.score-bar .fill:nth-child(1)');
        const impactBar = metrics.querySelector('.score-bar .fill:nth-child(2)');
        
        if (aiPotentialBar) {
          aiPotentialBar.style.width = `${analysis.aiPotential}%`;
        }
        if (impactBar) {
          impactBar.style.width = `${analysis.scalability.score}%`;
        }
      }
    });
  }

  // AI Idea Generator Functionality
  function setupIdeaGenerator() {
    const generateBtn = document.getElementById('generateIdea');
    const ideaPrompt = document.getElementById('ideaPrompt');
    const ideasContainer = document.getElementById('aiGeneratedIdeas');

    if (generateBtn && ideaPrompt) {
      generateBtn.addEventListener('click', async () => {
        const prompt = ideaPrompt.value.trim();
        if (!prompt) {
          alert('Please describe a challenge or opportunity first!');
          return;
        }

        // Show loading state
        generateBtn.disabled = true;
        generateBtn.querySelector('.btn-text').textContent = 'Generating...';
        ideasContainer.innerHTML = '<div class="loading-idea">🤖 AI is brainstorming creative solutions...</div>';
        ideasContainer.classList.add('filled');

        try {
          const generatedIdea = await ideaGenerator.generateIdea(prompt);
          
          // Display the generated idea
          ideasContainer.innerHTML = `
            <div class="generated-idea-card">
              <h4>✨ AI-Generated Solution</h4>
              <p class="idea-text">${generatedIdea.idea}</p>
              <div class="idea-metrics">
                <span class="idea-category">${generatedIdea.category}</span>
                <span class="innovation-score">Innovation: ${generatedIdea.innovationScore}%</span>
                <span class="feasibility-score">Feasibility: ${generatedIdea.feasibility}%</span>
              </div>
            </div>
          `;

        } catch (error) {
          ideasContainer.innerHTML = '<div class="error-message">❌ Failed to generate idea. Please try again.</div>';
        } finally {
          generateBtn.disabled = false;
          generateBtn.querySelector('.btn-text').textContent = 'Generate AI Solution';
        }
      });
    }
  }

  // Voice Search Setup
  function setupVoiceSearch() {
    const voiceBtn = document.getElementById('voiceSearch');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        voiceAssistant.startListening();
      });
    }
  }

  // AI Search Functionality
  function setupAISearch() {
    const searchInput = document.getElementById('aiSearch');
    const suggestions = document.querySelectorAll('.suggestion');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length > 2) {
          // Simulate AI search with slight delay
          setTimeout(() => {
            highlightRelevantIdeas(query);
          }, 300);
        }
      });
    }

    // Setup suggestion clicks
    suggestions.forEach(suggestion => {
      suggestion.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = suggestion.textContent;
          const event = new Event('input', { bubbles: true });
          searchInput.dispatchEvent(event);
        }
      });
    });
  }

  function highlightRelevantIdeas(query) {
    const ideaItems = document.querySelectorAll('.idea-item');
    ideaItems.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      if (title.includes(query.toLowerCase())) {
        item.style.border = '2px solid #C7A34F';
        item.style.transform = 'scale(1.05)';
      } else {
        item.style.border = '';
        item.style.transform = '';
      }
    });
  }

  // Enhanced Dashboard Metrics
  function enhanceDashboard() {
    // Add AI metric card animation
    const aiMetricCard = document.querySelector('.stat-card.ai-metric');
    if (aiMetricCard) {
      setInterval(() => {
        aiMetricCard.classList.toggle('pulse-glow');
      }, 3000);
    }

    // Animate progress bars
    const progressBars = document.querySelectorAll('.ai-progress-fill, .meter-fill');
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 500);
    });
  }

  // Initialize all enhancements
  enhanceIdeaRepository();
  setupIdeaGenerator();
  setupVoiceSearch();
  setupAISearch();
  enhanceDashboard();

  // Make AI Analyzer globally available for chatbot
  window.aiAnalyzer = aiAnalyzer;
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AdvancedAIAnalyzer, AIIdeaGenerator, VoiceAssistant };
}