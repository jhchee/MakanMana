from django.urls import path
from . import views
from knox import views as knox_views

app_name = 'User_base'
urlpatterns = [
    path('auth/login/', views.LoginView.as_view(), name='knox_login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),

    path('user/create/', views.UserCreateView.as_view(), name='user-create'),
    path('user/list/', views.UserCreateView.as_view(), name='user-list'),
    path('user/detail/<pk>', views.UserDetailView.as_view(), name='user-detail'),

    path('profile/create/', views.ProfileCreateView.as_view(), name='profile-create'),
    path('profile/list/', views.ProfileListView.as_view(), name='profile-list'),
    path('profile/detail/<pk>', views.ProfileDetailView.as_view(), name='profile-detail'),

    path('friend/create/', views.FriendCreateView.as_view(), name='friend-create'),
    path('friend/list/', views.FriendListView.as_view(), name='friend-list'),
    path('friend/detail/<pk>', views.FriendDetailView.as_view(), name='friend-detail'),

    path('preference/create/', views.PreferenceCreateView.as_view(), name='preference-create'),
    path('preference/list/', views.PreferenceListView.as_view(), name='preference-list'),
    path('preference/detail/<pk>', views.PreferenceDetailView.as_view(), name='preference-detail'),


    path('relationship/list', views.RelationshipListView.as_view(), name='relationship-list'),

]
