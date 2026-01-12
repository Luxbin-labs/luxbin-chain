#!/usr/bin/env python3
"""
Check status of recent IBM Quantum jobs
"""

from qiskit_ibm_runtime import QiskitRuntimeService

def main():
    try:
        service = QiskitRuntimeService()
        print("Connected to IBM Quantum")

        # Get recent jobs
        jobs = service.jobs(limit=10)
        print(f"\nRecent {len(jobs)} jobs:")

        for job in jobs:
            print(f"Job ID: {job.job_id()}")
            print(f"  Backend: {job.backend().name if hasattr(job, 'backend') else 'N/A'}")
            print(f"  Status: {job.status()}")
            if hasattr(job, 'creation_date') and job.creation_date:
                print(f"  Created: {job.creation_date}")
            print()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()