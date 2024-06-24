# working.py
import logging
from working import working_main, creation_main
from multiprocessing import Process, Queue
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def main():
    try:
        # Start working_main and creation_main in separate processes
        processes = []

        # Start working_main in a separate process
        p1 = Process(target=working_main)
        p1.start()
        processes.append(p1)

        # Start creation_main in a separate process
        p2 = Process(target=creation_main)
        p2.start()
        processes.append(p2)

        # Wait for all processes to complete
        for p in processes:
            p.join()

        logger.info("All processes completed.")
    
    except Exception as e:
        logger.error(f"Error in main script: {str(e)}")

if __name__ == "__main__":
    main()
