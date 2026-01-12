#!/usr/bin/env python3
"""
Get results from recent IBM Quantum jobs
"""

from qiskit_ibm_runtime import QiskitRuntimeService
import matplotlib.pyplot as plt
from qiskit.visualization import plot_histogram

def main():
    try:
        service = QiskitRuntimeService()

        # Get recent jobs
        jobs = service.jobs(limit=10)

        print("Fetching results from recent jobs...")

        for job in jobs:
            if job.status() == 'DONE':
                print(f"\nJob ID: {job.job_id()}")
                print(f"Backend: {job.backend().name}")
                print(f"Created: {job.creation_date}")

                try:
                    result = job.result()
                    counts = result[0].data.meas.get_counts()

                    print("Measurement results:")
                    for state, count in sorted(counts.items(), key=lambda x: x[1], reverse=True)[:5]:
                        probability = count / 1024 * 100
                        print(f"  |{state}⟩: {count} times ({probability:.1f}%)")

                    # Save histogram
                    fig = plot_histogram(counts, figsize=(8, 4))
                    plt.title(f"Results for Job {job.job_id()}")
                    plt.tight_layout()
                    filename = f"quantum_results_{job.job_id()[:8]}.png"
                    plt.savefig(filename, dpi=150, bbox_inches='tight')
                    print(f"Saved histogram to: {filename}")
                    plt.close()

                except Exception as e:
                    print(f"Error getting result: {e}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()