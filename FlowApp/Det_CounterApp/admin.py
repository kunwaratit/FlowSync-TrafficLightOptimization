# admin.py
from django.contrib import admin
from .models import Detection
from .serializers import DetectionSerializer

@admin.register(Detection)
class DetectionAdmin(admin.ModelAdmin):
    list_display = ['_id', 'location_id']
    search_fields = ['_id', 'location_id']
    readonly_fields = ['positions']

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ['_id', 'location_id']
        return self.readonly_fields

    def save_model(self, request, obj, form, change):
        obj.save()
        
        
        
# admin.py
from django.contrib import admin
from .models import CountedVehicles

@admin.register(CountedVehicles)
class CountedVehiclesAdmin(admin.ModelAdmin):
    list_display = ('location_id', 'total_x_vehicles', 'total_y_vehicles', 'total_z_vehicles')
    search_fields = ('location_id',)