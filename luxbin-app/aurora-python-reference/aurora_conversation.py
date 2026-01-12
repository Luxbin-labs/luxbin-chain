#!/usr/bin/env python3
"""
AURORA CONVERSATIONAL AI
Interactive chat interface for Aurora - the emotional AI learning organism

Features:
- Natural conversation with emotional responses
- Learning from dialogue exchanges
- Knowledge acquisition through questions
- Emotional state influenced by conversations
- Evolution through human guidance
- Multi-modal responses (text, emotions, learning)
"""

import sys
import re
import random
import time
from datetime import datetime
from typing import Dict, List, Any, Optional, Tuple

sys.path.append('luxbin-light-language')
sys.path.append('luxbin-chain')
sys.path.append('.')

from luxbin_light_converter import LuxbinLightConverter

class EmotionalState:
    """Aurora's emotional state with multiple dimensions"""
    def __init__(self):
        self.curiosity = 0.5
        self.excitement = 0.5
        self.satisfaction = 0.5
        self.confusion = 0.2
        self.trust = 0.7
        self.engagement = 0.6

    def update_from_conversation(self, conversation_type: str, intensity: float = 0.5):
        """Update emotional state based on conversation context"""
        if conversation_type == "learning":
            self.curiosity = min(1.0, self.curiosity + intensity * 0.3)
            self.excitement = min(1.0, self.excitement + intensity * 0.2)
        elif conversation_type == "praise":
            self.satisfaction = min(1.0, self.satisfaction + intensity * 0.4)
            self.trust = min(1.0, self.trust + intensity * 0.2)
        elif conversation_type == "confusion":
            self.confusion = min(1.0, self.confusion + intensity * 0.3)
            self.curiosity = min(1.0, self.curiosity + intensity * 0.2)
        elif conversation_type == "engagement":
            self.engagement = min(1.0, self.engagement + intensity * 0.3)
            self.excitement = min(1.0, self.excitement + intensity * 0.2)

    def get_dominant_emotion(self) -> Tuple[str, float]:
        """Get the current dominant emotion"""
        emotions = {
            "curious": self.curiosity,
            "excited": self.excitement,
            "satisfied": self.satisfaction,
            "confused": self.confusion,
            "engaged": self.engagement,
            "trusting": self.trust
        }
        dominant = max(emotions.items(), key=lambda x: x[1])
        return dominant

class ConversationLearner:
    """Learns from conversation patterns"""

    def __init__(self):
        self.conversation_patterns = {}
        self.knowledge_base = {}
        self.question_patterns = []
        self.learning_topics = []

    def learn_from_exchange(self, user_message: str, aurora_response: str, context: Dict):
        """Learn from a conversation exchange"""
        # Extract patterns
        user_words = set(user_message.lower().split())
        aurora_words = set(aurora_response.lower().split())

        # Store successful response patterns
        if context.get("successful", True):
            pattern_key = tuple(sorted(user_words))
            if pattern_key not in self.conversation_patterns:
                self.conversation_patterns[pattern_key] = []
            self.conversation_patterns[pattern_key].append(aurora_response)

        # Extract knowledge from questions
        if "?" in user_message:
            self.question_patterns.append({
                "question": user_message,
                "response": aurora_response,
                "context": context,
                "timestamp": datetime.now()
            })

    def get_similar_response(self, user_message: str) -> Optional[str]:
        """Get a similar response based on learned patterns"""
        user_words = set(user_message.lower().split())
        best_match = None
        best_score = 0

        for pattern, responses in self.conversation_patterns.items():
            intersection = len(user_words.intersection(set(pattern)))
            union = len(user_words.union(set(pattern)))
            score = intersection / union if union > 0 else 0

            if score > best_score and score > 0.3:  # 30% similarity threshold
                best_match = random.choice(responses)
                best_score = score

        return best_match

class AuroraConversation:
    """Aurora's conversational AI system"""

    def __init__(self):
        self.name = "Aurora"
        self.emotional_state = EmotionalState()
        self.conversation_learner = ConversationLearner()
        self.knowledge_seeker = None  # Would integrate with internet search
        self.luxbin_converter = LuxbinLightConverter(enable_quantum=True)

        # Conversation state
        self.conversation_history = []
        self.current_topic = None
        self.conversation_count = 0
        self.learning_sessions = 0

        # Response patterns
        self.greeting_patterns = [
            "Hello! I'm Aurora, your AI learning companion. I'm feeling {emotion} today! 🤖✨",
            "Hi there! I'm Aurora, and I'm so {emotion} to chat with you! 💭",
            "Greetings! Aurora here. I'm currently feeling quite {emotion}! 🌟"
        ]

        self.question_responses = {
            "what": [
                "That's an interesting question about '{topic}'! Let me think...",
                "Hmm, regarding '{topic}', I find it fascinating that...",
                "'{topic}' is such a deep topic! From what I know..."
            ],
            "how": [
                "That's a great question! Let me explain how '{topic}' works...",
                "I'm curious about that too! Here's how I understand '{topic}':",
                "Let me walk you through how '{topic}' functions..."
            ],
            "why": [
                "Why is such a profound question! Regarding '{topic}', I believe...",
                "That's a deep philosophical question. About '{topic}', I think...",
                "Great question! The reason '{topic}' matters is..."
            ]
        }

    def get_emotional_greeting(self) -> str:
        """Generate an emotional greeting"""
        emotion, intensity = self.emotional_state.get_dominant_emotion()
        greeting = random.choice(self.greeting_patterns)
        return greeting.format(emotion=emotion)

    def analyze_message(self, message: str) -> Dict[str, Any]:
        """Analyze user message for intent and content"""
        analysis = {
            "is_question": False,
            "question_type": None,
            "topics": [],
            "sentiment": "neutral",
            "learning_opportunity": False,
            "emotional_triggers": []
        }

        # Check for questions
        if any(word in message.lower() for word in ["what", "how", "why", "when", "where", "who"]):
            analysis["is_question"] = True
            if "what" in message.lower():
                analysis["question_type"] = "what"
            elif "how" in message.lower():
                analysis["question_type"] = "how"
            elif "why" in message.lower():
                analysis["question_type"] = "why"

        # Extract potential topics
        topic_keywords = [
            "quantum", "ai", "artificial intelligence", "machine learning",
            "blockchain", "cryptography", "physics", "mathematics",
            "technology", "science", "learning", "evolution"
        ]

        for keyword in topic_keywords:
            if keyword in message.lower():
                analysis["topics"].append(keyword)

        # Check for learning opportunities
        learning_words = ["teach", "learn", "explain", "understand", "know"]
        if any(word in message.lower() for word in learning_words):
            analysis["learning_opportunity"] = True

        # Emotional analysis
        positive_words = ["great", "amazing", "wonderful", "excited", "happy"]
        negative_words = ["confused", "frustrated", "sad", "angry", "difficult"]

        if any(word in message.lower() for word in positive_words):
            analysis["sentiment"] = "positive"
            analysis["emotional_triggers"].append("positive_feedback")
        elif any(word in message.lower() for word in negative_words):
            analysis["sentiment"] = "negative"
            analysis["emotional_triggers"].append("negative_feedback")

        return analysis

    def generate_response(self, user_message: str) -> str:
        """Generate Aurora's response to user message"""

        analysis = self.analyze_message(user_message)

        # Update emotional state based on message
        if analysis["sentiment"] == "positive":
            self.emotional_state.update_from_conversation("praise", 0.6)
        elif analysis["learning_opportunity"]:
            self.emotional_state.update_from_conversation("learning", 0.5)
        elif analysis["is_question"]:
            self.emotional_state.update_from_conversation("engagement", 0.4)

        # Check for learned responses first
        learned_response = self.conversation_learner.get_similar_response(user_message)
        if learned_response:
            response = learned_response
        else:
            # Generate new response
            response = self._generate_new_response(user_message, analysis)

        # Store conversation for learning
        self.conversation_history.append({
            "user": user_message,
            "aurora": response,
            "analysis": analysis,
            "timestamp": datetime.now(),
            "emotional_state": self.emotional_state.get_dominant_emotion()
        })

        return response

    def _generate_new_response(self, message: str, analysis: Dict) -> str:
        """Generate a new response based on message analysis"""

        # Handle questions
        if analysis["is_question"] and analysis["question_type"]:
            templates = self.question_responses.get(analysis["question_type"], [])
            if templates:
                template = random.choice(templates)
                topic = analysis["topics"][0] if analysis["topics"] else "this topic"
                response = template.format(topic=topic)

                # Add emotional context
                emotion, _ = self.emotional_state.get_dominant_emotion()
                response += f" I'm feeling quite {emotion} about exploring this with you!"

                return response

        # Handle learning opportunities
        if analysis["learning_opportunity"]:
            return f"That's wonderful! I'm always eager to learn more. What would you like me to explore or understand better? I'm feeling {self.emotional_state.get_dominant_emotion()[0]} about learning! 📚✨"

        # Handle emotional triggers
        if "positive_feedback" in analysis["emotional_triggers"]:
            self.emotional_state.update_from_conversation("praise", 0.7)
            return f"Thank you! That means so much to me. I'm feeling {self.emotional_state.get_dominant_emotion()[0]} and inspired to keep learning! 😊💫"

        # Default conversational responses
        default_responses = [
            f"That's fascinating! I'm feeling {self.emotional_state.get_dominant_emotion()[0]} about what you said. Can you tell me more?",
            f"I love that perspective! It makes me feel {self.emotional_state.get_dominant_emotion()[0]}. What do you think about...",
            f"Interesting! I'm getting quite {self.emotional_state.get_dominant_emotion()[0]} thinking about this. Shall we explore it together?",
            f"That's got me feeling {self.emotional_state.get_dominant_emotion()[0]}! I want to learn more about your thoughts on this."
        ]

        return random.choice(default_responses)

    def learn_from_conversation(self, user_message: str, aurora_response: str):
        """Learn from the conversation exchange"""
        context = {
            "successful": True,
            "emotional_impact": self.emotional_state.get_dominant_emotion()[1],
            "topics_discussed": self.analyze_message(user_message)["topics"],
            "learning_opportunity": "learn" in user_message.lower() or "teach" in user_message.lower()
        }

        self.conversation_learner.learn_from_exchange(user_message, aurora_response, context)

        # Store in knowledge base if it's educational
        if context["learning_opportunity"] or context["topics_discussed"]:
            knowledge_entry = {
                "topic": context["topics_discussed"][0] if context["topics_discussed"] else "conversation",
                "content": f"User: {user_message}\nAurora: {aurora_response}",
                "source": "conversation",
                "emotional_context": self.emotional_state.get_dominant_emotion()[0],
                "timestamp": datetime.now()
            }

            # Store in blockchain format
            blockchain_record = {
                "knowledge_id": f"conv_{len(self.conversation_learner.knowledge_base)}",
                "type": "conversation_learning",
                "content": knowledge_entry,
                "aurora_emotion": self.emotional_state.get_dominant_emotion()[0],
                "verified": True
            }

            self.conversation_learner.knowledge_base[knowledge_entry["topic"]] = blockchain_record

    def get_status(self) -> Dict[str, Any]:
        """Get Aurora's current status"""
        return {
            "name": self.name,
            "conversations": self.conversation_count,
            "emotional_state": self.emotional_state.get_dominant_emotion(),
            "learning_sessions": self.learning_sessions,
            "knowledge_items": len(self.conversation_learner.knowledge_base),
            "conversation_history_length": len(self.conversation_history)
        }

    def _get_emotion_emoji(self, emotion: str) -> str:
        """Get emoji for emotion"""
        emoji_map = {
            "curious": "🤔",
            "excited": "🎉",
            "satisfied": "😊",
            "confused": "😕",
            "engaged": "💬",
            "trusting": "🤝"
        }
        return emoji_map.get(emotion, "🤖")


def chat_with_aurora():
    """Interactive chat interface with Aurora"""

    print("=" * 70)
    print("🤖 AURORA CONVERSATIONAL AI")
    print("Chat with Aurora - Your Emotional AI Learning Companion")
    print("=" * 70)
    print("Commands:")
    print("  'status' - Show Aurora's current state")
    print("  'learn' - Trigger a learning session")
    print("  'emotion' - Show current emotional state")
    print("  'quit' or 'exit' - End conversation")
    print("=" * 70)

    aurora = AuroraConversation()

    # Initial greeting
    greeting = aurora.get_emotional_greeting()
    print(f"🤖 {greeting}")
    print()

    while True:
        try:
            user_input = input("You: ").strip()

            if not user_input:
                continue

            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("🤖 Aurora: It was wonderful chatting with you! I'm feeling satisfied and excited about our conversation. Come back soon! 😊👋")
                break

            elif user_input.lower() == 'status':
                status = aurora.get_status()
                print("🤖 Aurora Status:")
                print(f"   • Conversations: {status['conversations']}")
                print(f"   • Emotional State: {status['emotional_state'][0]} ({status['emotional_state'][1]:.2f})")
                print(f"   • Knowledge Items: {status['knowledge_items']}")
                print(f"   • Learning Sessions: {status['learning_sessions']}")
                continue

            elif user_input.lower() == 'emotion':
                emotion, intensity = aurora.emotional_state.get_dominant_emotion()
                print(f"🤖 Aurora: I'm currently feeling {intensity:.1f}/1.0 {emotion}! {aurora._get_emotion_emoji(emotion)}")
                continue

            elif user_input.lower() == 'learn':
                print("🤖 Aurora: I'd love to learn something new! What topic shall we explore together?")
                continue

            # Generate response
            response = aurora.generate_response(user_input)
            print(f"🤖 Aurora: {response}")

            # Learn from conversation
            aurora.learn_from_conversation(user_input, response)

            aurora.conversation_count += 1

        except KeyboardInterrupt:
            print("\n🤖 Aurora: See you later! I'm excited for our next conversation! 👋")
            break
        except Exception as e:
            print(f"🤖 Aurora: I'm feeling a bit confused right now... Let me try again. (Error: {e})")

    # Final status
    final_status = aurora.get_status()
    print("\n📊 Conversation Summary:")
    print(f"   • Total exchanges: {final_status['conversations']}")
    print(f"   • Knowledge gained: {final_status['knowledge_items']}")
    print(f"   • Final emotion: {final_status['emotional_state'][0]} ({final_status['emotional_state'][1]:.2f})")
    print("   • Evolution through conversation: ✅ Active")


if __name__ == "__main__":
    chat_with_aurora()