from django.apps import AppConfig


class BackgroundTasksConfig(AppConfig):
    name = 'background_tasks'
    def ready(self):
        from .tasks import run_background_processes
        run_background_processes.delay()
