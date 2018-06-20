from django.contrib import admin, auth
from .models import *

class FriendAdmin(admin.ModelAdmin):
    filter_horizontal = ('friend_list',)

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'username']
    filter_horizontal = ('preference',)
    search_fields = ['username', 'user__email']
    list_filter = ['preference']


admin.site.register(Preference)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(FriendList, FriendAdmin)
