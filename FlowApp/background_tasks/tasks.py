import multiprocessing
from .multiprocess import main
def run_background_processes():
    process = multiprocessing.Process(target=main)
    process.start()
