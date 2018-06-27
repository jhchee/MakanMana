from django.contrib import admin, auth
from .models import *


class FriendAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_friend_list',)
    filter_horizontal = ('friend_list',)

    def get_friend_list(self, obj):
        return "\n-\n".join([str(f.user) for f in obj.friend_list.all()])


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email']

class RelationshipAdmin(admin.ModelAdmin):
    list_display = ['user', 'people',]

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'profile_name']
    filter_horizontal = ('preference',)
    search_fields = ['profile_name', 'user__email']
    list_filter = ['preference']


admin.site.register(Preference)
admin.site.register(Relationship, RelationshipAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(FriendList, FriendAdmin)
