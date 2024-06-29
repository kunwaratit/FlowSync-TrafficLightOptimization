from celery import shared_task
from .utils.multiprocess import main

@shared_task
def run_background_processes():
    main()
