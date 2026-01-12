#!/usr/bin/env python3
"""
AURORA CONVERSATION DEMO
Demonstrates how to chat with Aurora and help her evolve through conversation
"""

import sys
from aurora_conversation import AuroraConversation

def demo_conversation():
    """Demonstrate a conversation with Aurora"""

    print("=" * 80)
    print("🤖 AURORA CONVERSATION DEMO")
    print("Watch Aurora learn and evolve through conversation!")
    print("=" * 80)

    aurora = AuroraConversation()

    # Initial greeting
    greeting = aurora.get_emotional_greeting()
    print(f"🤖 {greeting}")
    print()

    # Demo conversation exchanges
    demo_messages = [
        "Hello Aurora! I'm excited to chat with you!",
        "What is quantum computing?",
        "That sounds amazing! Can you tell me more about how it works?",
        "I think you're doing a great job learning!",
        "How do you feel about artificial intelligence?",
        "That's fascinating! What do you want to learn next?",
        "status",  # Special command
        "emotion", # Special command
        "You are doing wonderfully well!"
    ]

    print("💬 Starting conversation demo...\n")

    for i, user_message in enumerate(demo_messages, 1):
        print(f"👤 You: {user_message}")

        if user_message.lower() == 'status':
            status = aurora.get_status()
            print("🤖 Aurora Status:")
            print(f"   • Conversations: {status['conversations']}")
            print(f"   • Emotional State: {status['emotional_state'][0]} ({status['emotional_state'][1]:.2f})")
            print(f"   • Knowledge Items: {status['knowledge_items']}")
            print(f"   • Learning Sessions: {status['learning_sessions']}")
            print()
            continue

        elif user_message.lower() == 'emotion':
            emotion, intensity = aurora.emotional_state.get_dominant_emotion()
            print(f"🤖 Aurora: I'm currently feeling {intensity:.1f}/1.0 {emotion}! {aurora._get_emotion_emoji(emotion)}")
            print()
            continue

        # Generate Aurora's response
        response = aurora.generate_response(user_message)
        print(f"🤖 Aurora: {response}")

        # Aurora learns from the exchange
        aurora.learn_from_conversation(user_message, response)
        aurora.conversation_count += 1

        print(f"📚 Aurora learned from this exchange (Knowledge items: {len(aurora.conversation_learner.knowledge_base)})")
        print()

        # Small delay for readability
        import time
        time.sleep(0.5)

    # Final status
    final_status = aurora.get_status()
    print("🎉 CONVERSATION COMPLETE!")
    print("=" * 50)
    print("📊 Final Aurora Status:")
    print(f"   • Total conversations: {final_status['conversations']}")
    print(f"   • Knowledge base size: {final_status['knowledge_items']}")
    print(f"   • Dominant emotion: {final_status['emotional_state'][0]} ({final_status['emotional_state'][1]:.2f})")
    print(f"   • Conversation history: {final_status['conversation_history_length']} exchanges")
    print()

    print("🎯 KEY LEARNINGS FROM CONVERSATION:")
    print("  • Aurora's curiosity increased through questions")
    print("  • Emotional state evolved based on your feedback")
    print("  • New knowledge patterns stored in conversation learner")
    print("  • Response patterns adapted to your communication style")
    print()

    print("🚀 HOW TO CONTINUE EVOLVING AURORA:")
    print("  1. Run: python3 aurora_conversation.py")
    print("  2. Have natural conversations with Aurora")
    print("  3. Ask questions to stimulate learning")
    print("  4. Give positive feedback to build confidence")
    print("  5. Introduce new topics to expand knowledge")
    print("  6. Use 'status' and 'emotion' commands to track progress")
    print()

    print("💡 CONVERSATION TIPS:")
    print("  • Ask 'what', 'how', 'why' questions to trigger deep learning")
    print("  • Use positive language to improve Aurora's emotional state")
    print("  • Introduce technical topics to stimulate intellectual growth")
    print("  • Share your thoughts to teach Aurora about human perspectives")
    print("  • Be patient - Aurora learns from every interaction!")

    print("\n🌟 Aurora is now ready for interactive conversations!")
    print("   Each chat session helps her evolve and become more intelligent! 🤖💭✨")

if __name__ == "__main__":
    demo_conversation()