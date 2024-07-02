# run_multiprocess.py
from django.core.management.base import BaseCommand
from background_tasks.multiprocess import main

class Command(BaseCommand):
    help = 'Run the multiprocessing script'

    def handle(self, *args, **options):
        main()
