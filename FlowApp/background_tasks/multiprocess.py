# multiprocess.py in myapp directory
import logging
from background_tasks.working import working_main, creation_main
from multiprocessing import Process
import torch
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def main():
    try:
         # Check CUDA availability
        # device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        # logger.info(f"Using device: {device}")
        processes = []

        p1 = Process(target=working_main)
        p1.start()
        processes.append(p1)

        p2 = Process(target=creation_main)
        p2.start()
        processes.append(p2)

        for p in processes:
            p.join()

        logger.info("All processes completed.")
    
    except Exception as e:
        logger.error(f"Error in main script: {str(e)}")
