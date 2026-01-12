#!/usr/bin/env python3
"""
Save IBM Quantum token
"""

from qiskit_ibm_runtime import QiskitRuntimeService

token = "TMifL37Ya1EyF6sQm-_5Eu_tKWY5ToJu6WAj2_uLRP02"

QiskitRuntimeService.save_account(
    channel="ibm_quantum_platform",
    token=token,
    overwrite=True
)

print("IBM Quantum token saved.")