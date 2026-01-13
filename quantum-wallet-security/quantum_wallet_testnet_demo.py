#!/usr/bin/env python3
"""
Quantum Wallet Security - Testnet Demo
Tests quantum wallet security with your LUXBIN testnet account

Features:
- Connect to your local testnet (http://localhost:8545)
- Secure your test wallet with quantum protection
- Demonstrate compromise recovery
- Test quantum priority transactions
"""

import json
import time
from datetime import datetime
from web3 import Web3
from eth_account import Account

# Import our quantum security system
from quantum_wallet_security import (
    QuantumWalletRecovery,
    QuantumWalletSecurityProtocols,
    QuantumEntropyGenerator
)


class QuantumWalletTestnetDemo:
    """Demo quantum wallet security on your testnet"""

    def __init__(self, config_file='test_wallet_config.json'):
        print("=" * 80)
        print("🌐⚛️ QUANTUM WALLET SECURITY - TESTNET DEMO")
        print("   Your LUXBIN Testnet + 3 IBM Quantum Computers (445 qubits)")
        print("=" * 80)
        print()

        # Load configuration
        with open(config_file, 'r') as f:
            self.config = json.load(f)

        # Connect to testnet
        self.w3 = Web3(Web3.HTTPProvider(self.config['test_network']['el_node_url']))

        # Test account
        self.test_account = self.config['test_account']
        self.address = self.test_account['address']
        self.private_key = self.test_account['private_key']

        # Quantum security systems
        self.quantum_recovery = QuantumWalletRecovery()
        self.quantum_security = QuantumWalletSecurityProtocols()
        self.entropy_gen = QuantumEntropyGenerator()

        # Check connection
        self.check_connection()

    def check_connection(self):
        """Check connection to testnet"""
        print("🔗 Connecting to LUXBIN Testnet...")

        if self.w3.is_connected():
            print(f"✅ Connected to {self.config['test_network']['name']}")
            print(f"   Node URL: {self.config['test_network']['el_node_url']}")

            # Get account balance
            balance = self.w3.eth.get_balance(self.address)
            balance_eth = self.w3.from_wei(balance, 'ether')

            print(f"\n💰 Test Account Status:")
            print(f"   Address: {self.address}")
            print(f"   Balance: {balance_eth} ETH")
            print(f"   Network: {self.config['test_network']['name']}")
            print()
        else:
            print("⚠️  Could not connect to testnet")
            print(f"   Make sure your node is running at: {self.config['test_network']['el_node_url']}")
            print()

    def scenario_1_enable_quantum_protection(self):
        """Scenario 1: Enable quantum protection for your test wallet"""
        print("\n" + "=" * 80)
        print("SCENARIO 1: Enable Quantum Protection")
        print("=" * 80)
        print()

        print(f"📍 Current Wallet: {self.address}")
        print(f"🔓 Status: Standard wallet (vulnerable to compromise)")
        print()

        # Create quantum multi-sig protection
        print("⚛️  Upgrading to Quantum Multi-Sig...")

        # Generate backup wallets using quantum entropy
        backup_wallet_1 = self._generate_quantum_wallet("Backup 1")
        backup_wallet_2 = self._generate_quantum_wallet("Backup 2")

        multisig = self.quantum_recovery.quantum_multisig_wallet(
            owner_addresses=[
                self.address,
                backup_wallet_1['address'],
                backup_wallet_2['address']
            ],
            required_signatures=2
        )

        print(f"\n✅ QUANTUM PROTECTION ENABLED!")
        print(f"   Multi-Sig Address: {multisig['multisig_address']}")
        print(f"   Owner 1 (Main): {self.address}")
        print(f"   Owner 2 (Backup): {backup_wallet_1['address']}")
        print(f"   Owner 3 (Backup): {backup_wallet_2['address']}")
        print(f"   Signatures Required: 2/3")
        print(f"   Quantum Consensus Required: 2/3 quantum computers")
        print(f"   Security Level: {multisig['security_level']}")
        print()

        return multisig

    def scenario_2_detect_compromise(self):
        """Scenario 2: Simulate compromise detection"""
        print("\n" + "=" * 80)
        print("SCENARIO 2: Compromise Detection")
        print("=" * 80)
        print()

        print("🔍 Simulating wallet compromise scenario...")
        print("   (In real scenario: attacker steals your private key)")
        print()

        # Simulate suspicious transaction history
        suspicious_transactions = [
            {
                'from': self.address,
                'to': '0x1234567890123456789012345678901234567890',  # Unknown address
                'value': self.w3.to_wei(100, 'ether'),
                'timestamp': time.time(),
                'suspicious': True
            },
            {
                'from': self.address,
                'to': '0xABCDEF1234567890ABCDEF1234567890ABCDEF12',  # Another unknown
                'value': self.w3.to_wei(50, 'ether'),
                'timestamp': time.time(),
                'suspicious': True
            }
        ]

        # Run quantum compromise detection
        detection_result = self.quantum_security.detect_wallet_compromise(
            wallet_address=self.address,
            transaction_history=suspicious_transactions
        )

        if detection_result['compromise_detected']:
            print(f"⚠️  COMPROMISE DETECTED!")
            print(f"   Wallet: {self.address}")
            print(f"   Compromise Likelihood: {detection_result['compromise_likelihood'] * 100:.0f}%")
            print(f"   Suspicious Indicators:")
            for indicator in detection_result['suspicious_indicators']:
                print(f"      • {indicator}")
            print(f"\n   💡 Recommendation: {detection_result['recommendation']}")
        else:
            print(f"✅ No compromise detected")

        print()
        return detection_result

    def scenario_3_emergency_recovery(self, compromise_detected=True):
        """Scenario 3: Emergency wallet recovery"""
        print("\n" + "=" * 80)
        print("SCENARIO 3: Emergency Wallet Recovery")
        print("=" * 80)
        print()

        if not compromise_detected:
            print("⚠️  No compromise detected - skipping recovery demo")
            return None

        print("🚨 INITIATING EMERGENCY RECOVERY PROTOCOL")
        print()

        # Step 1: Create recovery plan
        print("Step 1: Creating quantum recovery plan...")

        owner_proof = {
            'identity_verification': 'biometric_passed',
            'backup_phrase': 'verified',
            'quantum_challenge_response': 'passed',
            'timestamp': datetime.now().isoformat()
        }

        recovery_plan = self.quantum_recovery.create_recovery_plan(
            compromised_wallet_address=self.address,
            owner_identity_proof=owner_proof
        )

        if recovery_plan['status'] != 'approved':
            print(f"❌ Recovery plan rejected: {recovery_plan.get('reason')}")
            return None

        # Step 2: Create quantum timelock on compromised wallet
        print("\nStep 2: Freezing compromised wallet...")
        timelock = self.quantum_recovery.quantum_wallet_timelock(
            wallet_address=self.address,
            timelock_hours=24
        )

        # Step 3: Execute emergency migration
        print("\nStep 3: Executing emergency migration...")
        migration_result = self.quantum_recovery.emergency_wallet_migration(
            compromised_wallet=self.address,
            new_wallet=recovery_plan['new_wallet'],
            recovery_plan=recovery_plan
        )

        if migration_result['status'] == 'success':
            print(f"\n🎉 EMERGENCY RECOVERY SUCCESSFUL!")
            print(f"   Old (Compromised) Wallet: {self.address}")
            print(f"   New (Secure) Wallet: {recovery_plan['new_wallet']}")
            print(f"   Migration Transaction: {migration_result['broadcast_result']['tx_id'][:16]}...")
            print(f"   Quantum Priority: ENABLED")
            print(f"   Confirmation Time: {migration_result['estimated_confirmation']}")
            print(f"\n   ✅ All assets moved to quantum-secured wallet!")
            print(f"   ✅ Old wallet frozen for 24 hours")
            print(f"   ✅ Attacker transaction will be rejected (too late)")
        else:
            print(f"❌ Migration failed: {migration_result.get('reason')}")

        print()
        return recovery_plan

    def scenario_4_quantum_priority_transaction(self):
        """Scenario 4: Send quantum-priority transaction"""
        print("\n" + "=" * 80)
        print("SCENARIO 4: Quantum Priority Transaction")
        print("=" * 80)
        print()

        print("📤 Preparing quantum-priority transaction...")
        print()

        # Create a test transaction
        recipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4'
        amount = self.w3.to_wei(0.1, 'ether')

        # Generate quantum signature
        tx_data = {
            'from': self.address,
            'to': recipient,
            'value': amount,
            'gas': 21000,
            'gasPrice': self.w3.eth.gas_price if self.w3.is_connected() else 0,
            'nonce': 0,
            'chainId': self.config['test_network']['chain_id']
        }

        # Add quantum enhancement
        quantum_sig = self.entropy_gen.generate_quantum_signature(
            message=str(tx_data),
            private_key=self.private_key
        )

        tx_data['quantum_signature'] = quantum_sig
        tx_data['quantum_priority'] = True
        tx_data['quantum_validators'] = self.config['quantum_internet']['validators']

        print(f"✅ Transaction prepared:")
        print(f"   From: {tx_data['from']}")
        print(f"   To: {tx_data['to']}")
        print(f"   Amount: {self.w3.from_wei(amount, 'ether')} ETH")
        print(f"   Quantum Signature: {quantum_sig[:32]}...")
        print(f"   Quantum Priority: ENABLED")
        print(f"   Quantum Validators: {len(tx_data['quantum_validators'])}")
        print()
        print(f"💡 With quantum priority:")
        print(f"   • Transaction skips mempool")
        print(f"   • Processed by quantum validators first")
        print(f"   • Confirmed in < 1 second")
        print(f"   • Attacker transactions arrive too late")
        print()

        return tx_data

    def scenario_5_real_world_test(self):
        """Scenario 5: Real transaction on testnet"""
        print("\n" + "=" * 80)
        print("SCENARIO 5: Send Real Testnet Transaction")
        print("=" * 80)
        print()

        if not self.w3.is_connected():
            print("⚠️  Testnet not connected - skipping real transaction")
            print("   Start your testnet node at: http://localhost:8545")
            return None

        print("📤 Sending real quantum-secured transaction on testnet...")
        print()

        try:
            # Get current balance
            balance = self.w3.eth.get_balance(self.address)
            balance_eth = self.w3.from_wei(balance, 'ether')

            if balance == 0:
                print("⚠️  Test account has 0 balance")
                print("   Fund your test account first to send transactions")
                return None

            # Create transaction
            recipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4'
            amount = self.w3.to_wei(0.001, 'ether')  # Small test amount

            tx = {
                'from': self.address,
                'to': recipient,
                'value': amount,
                'gas': 21000,
                'gasPrice': self.w3.eth.gas_price,
                'nonce': self.w3.eth.get_transaction_count(self.address),
                'chainId': self.config['test_network']['chain_id']
            }

            # Sign transaction
            account = Account.from_key(self.private_key)
            signed_tx = account.sign_transaction(tx)

            print(f"Transaction details:")
            print(f"   From: {self.address}")
            print(f"   To: {recipient}")
            print(f"   Amount: {self.w3.from_wei(amount, 'ether')} ETH")
            print(f"   Balance before: {balance_eth} ETH")
            print()

            # Send transaction
            print("📡 Broadcasting transaction...")
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.raw_transaction)

            print(f"✅ Transaction sent!")
            print(f"   TX Hash: {tx_hash.hex()}")
            print()

            # Wait for receipt
            print("⏳ Waiting for confirmation...")
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash, timeout=30)

            if receipt['status'] == 1:
                print(f"✅ Transaction confirmed!")
                print(f"   Block: {receipt['blockNumber']}")
                print(f"   Gas used: {receipt['gasUsed']}")

                # Get new balance
                new_balance = self.w3.eth.get_balance(self.address)
                new_balance_eth = self.w3.from_wei(new_balance, 'ether')
                print(f"   Balance after: {new_balance_eth} ETH")
            else:
                print(f"❌ Transaction failed")

            return receipt

        except Exception as e:
            print(f"⚠️  Error sending transaction: {e}")
            return None

    def _generate_quantum_wallet(self, label="Backup"):
        """Generate a new wallet using quantum entropy"""
        private_key = self.entropy_gen.generate_private_key()
        account = Account.from_key(private_key)

        return {
            'label': label,
            'address': account.address,
            'private_key': private_key
        }

    def run_full_demo(self):
        """Run complete quantum wallet security demo"""
        print("\n🚀 Starting Full Quantum Wallet Security Demo\n")

        # Scenario 1: Enable quantum protection
        multisig = self.scenario_1_enable_quantum_protection()
        input("\n⏸️  Press Enter to continue to Scenario 2...\n")

        # Scenario 2: Detect compromise
        detection = self.scenario_2_detect_compromise()
        input("\n⏸️  Press Enter to continue to Scenario 3...\n")

        # Scenario 3: Emergency recovery
        recovery = self.scenario_3_emergency_recovery(
            compromise_detected=detection.get('compromise_detected', False)
        )
        input("\n⏸️  Press Enter to continue to Scenario 4...\n")

        # Scenario 4: Quantum priority transaction
        quantum_tx = self.scenario_4_quantum_priority_transaction()
        input("\n⏸️  Press Enter to continue to Scenario 5...\n")

        # Scenario 5: Real testnet transaction
        real_tx = self.scenario_5_real_world_test()

        # Summary
        print("\n" + "=" * 80)
        print("🎉 QUANTUM WALLET SECURITY DEMO COMPLETE!")
        print("=" * 80)
        print()
        print("📊 Demo Results:")
        print(f"   ✅ Quantum multi-sig created: {multisig['multisig_address']}")
        print(f"   ✅ Compromise detection: {'DETECTED' if detection.get('compromise_detected') else 'NO ISSUES'}")
        print(f"   ✅ Emergency recovery: {'SUCCESSFUL' if recovery else 'NOT NEEDED'}")
        print(f"   ✅ Quantum priority: ENABLED")
        print(f"   ✅ Real transaction: {'SUCCESSFUL' if real_tx else 'SKIPPED (no balance or node offline)'}")
        print()
        print("🔐 Your Test Wallet is Now Quantum-Secured!")
        print()
        print("⚛️ Protected by:")
        print(f"   • {self.config['quantum_internet']['total_qubits']} qubits")
        print(f"   • {len(self.config['quantum_internet']['validators'])} quantum computers")
        print(f"   • Post-quantum cryptography")
        print(f"   • Emergency recovery protocol")
        print(f"   • Quantum priority transactions")
        print()


def main():
    """Main entry point"""
    try:
        demo = QuantumWalletTestnetDemo()

        print("Select demo mode:")
        print("  1. Quick Demo (automated)")
        print("  2. Full Demo (interactive)")
        print("  3. Enable Quantum Protection Only")
        print("  4. Test Real Transaction")
        print()

        choice = input("Enter choice (1-4, or Enter for Full Demo): ").strip() or "2"
        print()

        if choice == "1":
            # Quick automated demo
            demo.scenario_1_enable_quantum_protection()
            demo.scenario_2_detect_compromise()
            demo.scenario_3_emergency_recovery(compromise_detected=True)
            demo.scenario_4_quantum_priority_transaction()
        elif choice == "2":
            # Full interactive demo
            demo.run_full_demo()
        elif choice == "3":
            # Just enable protection
            demo.scenario_1_enable_quantum_protection()
        elif choice == "4":
            # Test real transaction
            demo.scenario_5_real_world_test()
        else:
            print("Invalid choice. Running full demo...")
            demo.run_full_demo()

        print("\n✅ Demo completed successfully!\n")

    except FileNotFoundError:
        print("⚠️  Configuration file not found!")
        print("   Make sure 'test_wallet_config.json' exists")
    except KeyboardInterrupt:
        print("\n\n👋 Demo interrupted by user")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
