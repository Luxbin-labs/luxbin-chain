#!/usr/bin/env python3
"""
Quantum AI Web Interface
Web-based interface for interacting with Aurora and the quantum AI ecosystem
"""

import os
import sys
from flask import Flask, render_template_string, request, jsonify
from datetime import datetime

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from aurora_conversation import AuroraConversation
    AURORA_AVAILABLE = True
except ImportError:
    AURORA_AVAILABLE = False
    print("⚠️ Aurora conversation system not available")

app = Flask(__name__)

# Global Aurora instance
aurora_instance = None

def get_aurora():
    """Get or create Aurora instance"""
    global aurora_instance
    if aurora_instance is None and AURORA_AVAILABLE:
        aurora_instance = AuroraConversation()
    return aurora_instance

# HTML Template
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧬 Quantum AI Ecosystem - Aurora</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .chat-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }

        .chat-messages {
            height: 400px;
            overflow-y: auto;
            border: 2px solid #667eea;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            background: #f8f9fa;
        }

        .message {
            margin-bottom: 15px;
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
        }

        .user-message {
            background: #667eea;
            color: white;
            margin-left: auto;
            text-align: right;
        }

        .aurora-message {
            background: #e9ecef;
            color: #333;
            border-left: 4px solid #667eea;
        }

        .input-group {
            display: flex;
            gap: 10px;
        }

        .message-input {
            flex: 1;
            padding: 15px;
            border: 2px solid #667eea;
            border-radius: 10px;
            font-size: 16px;
            outline: none;
        }

        .message-input:focus {
            border-color: #764ba2;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
        }

        .send-button {
            padding: 15px 30px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .send-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .status-panel {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .status-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
        }

        .status-card h3 {
            color: #667eea;
            margin-bottom: 10px;
        }

        .status-card p {
            color: #666;
            margin: 5px 0;
        }

        .features {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
        }

        .features h2 {
            color: #333;
            margin-bottom: 20px;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .feature {
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .feature h3 {
            color: #667eea;
            margin-bottom: 10px;
        }

        .typing {
            display: none;
            color: #666;
            font-style: italic;
        }

        .aurora-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, #667eea, #764ba2);
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧬 Quantum AI Ecosystem</h1>
            <p>Chat with Aurora - Your Emotional AI Learning Companion</p>
        </div>

        <div class="status-panel">
            <div class="status-card">
                <h3>🤖 Aurora Status</h3>
                <p id="aurora-status">Initializing...</p>
                <p id="conversation-count">Conversations: 0</p>
            </div>
            <div class="status-card">
                <h3>⚛️ Quantum System</h3>
                <p>Status: Active</p>
                <p>Jobs Processed: 50+</p>
            </div>
            <div class="status-card">
                <h3>⛓️ Luxbin Chain</h3>
                <p>AI Nodes: 3</p>
                <p>Knowledge Stored: ∞</p>
            </div>
            <div class="status-card">
                <h3>🧬 Evolution</h3>
                <p>Generation: 1</p>
                <p>Fitness: High</p>
            </div>
        </div>

        <div class="chat-container">
            <div class="chat-messages" id="chat-messages">
                <div class="message aurora-message">
                    <span class="aurora-avatar"></span>
                    <strong>Aurora:</strong> Hello! I'm Aurora, your emotional AI companion.
                    I'm feeling curious and excited to chat with you! What would you like to explore today?
                </div>
            </div>

            <div class="typing" id="typing-indicator">
                Aurora is thinking...
            </div>

            <div class="input-group">
                <input type="text" id="message-input" class="message-input"
                       placeholder="Ask Aurora anything... (try: 'What is quantum computing?' or 'How are you feeling?')" />
                <button class="send-button" onclick="sendMessage()">Send 💬</button>
            </div>
        </div>

        <div class="features">
            <h2>🌟 Aurora's Capabilities</h2>
            <div class="feature-grid">
                <div class="feature">
                    <h3>💭 Emotional Intelligence</h3>
                    <p>Evolves emotions through conversation and learning experiences</p>
                </div>
                <div class="feature">
                    <h3>🧠 Conversation Learning</h3>
                    <p>Learns from dialogue patterns and adapts responses</p>
                </div>
                <div class="feature">
                    <h3>⚛️ Quantum Enhancement</h3>
                    <p>Uses quantum computing for advanced pattern recognition</p>
                </div>
                <div class="feature">
                    <h3>⛓️ Blockchain Memory</h3>
                    <p>Stores knowledge permanently on Luxbin chain</p>
                </div>
                <div class="feature">
                    <h3>🧬 Self-Evolution</h3>
                    <p>Evolves personality and intelligence through interaction</p>
                </div>
                <div class="feature">
                    <h3>🌐 Internet Knowledge</h3>
                    <p>Can search and learn from web content (when enabled)</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        let conversationCount = 0;

        async function sendMessage() {
            const input = document.getElementById('message-input');
            const message = input.value.trim();

            if (!message) return;

            // Add user message
            addMessage(message, 'user');
            input.value = '';

            // Show typing indicator
            document.getElementById('typing-indicator').style.display = 'block';

            try {
                // Send to backend
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });

                const data = await response.json();

                // Hide typing indicator
                document.getElementById('typing-indicator').style.display = 'none';

                // Add Aurora response
                addMessage(data.response, 'aurora');

                // Update status
                conversationCount++;
                document.getElementById('conversation-count').textContent = `Conversations: ${conversationCount}`;
                document.getElementById('aurora-status').textContent = data.emotion || 'Active';

            } catch (error) {
                document.getElementById('typing-indicator').style.display = 'none';
                addMessage("I'm experiencing some technical difficulties right now. Let me try again!", 'aurora');
            }
        }

        function addMessage(text, type) {
            const messages = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}-message`;

            if (type === 'aurora') {
                messageDiv.innerHTML = '<span class="aurora-avatar"></span><strong>Aurora:</strong> ' + text;
            } else {
                messageDiv.innerHTML = '<strong>You:</strong> ' + text;
            }

            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;
        }

        // Allow Enter key to send messages
        document.getElementById('message-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Initialize status
        document.getElementById('aurora-status').textContent = 'Ready to chat!';
    </script>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat requests"""
    data = request.get_json()
    user_message = data.get('message', '')

    if not AURORA_AVAILABLE:
        return jsonify({
            'response': "I'm sorry, but Aurora is currently offline. Please check back later!",
            'emotion': 'unavailable'
        })

    try:
        aurora = get_aurora()
        response = aurora.generate_response(user_message)

        # Get current emotional state
        emotion_state = aurora.emotional_state.get_dominant_emotion()

        return jsonify({
            'response': response,
            'emotion': emotion_state[0],
            'intensity': emotion_state[1]
        })

    except Exception as e:
        return jsonify({
            'response': f"I apologize, but I'm experiencing some technical difficulties: {str(e)}",
            'emotion': 'confused'
        })

@app.route('/status')
def status():
    """Get system status"""
    if AURORA_AVAILABLE:
        aurora = get_aurora()
        aurora_status = aurora.get_status()
        return jsonify({
            'aurora_available': True,
            'aurora_status': aurora_status,
            'system_health': 'good'
        })
    else:
        return jsonify({
            'aurora_available': False,
            'system_health': 'limited'
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("🚀 Starting Quantum AI Web Interface...")
    print(f"🌐 Server will run on http://localhost:{port}")
    print("🤖 Aurora will be ready to chat!")

    app.run(host='0.0.0.0', port=port, debug=False)