from django.urls import path
from . import views
from knox import views as knox_views

app_name = 'User_base'
urlpatterns = [
    path('login/', views.LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),

    # return an user's details
    path('user/<pk>', views.UserDetailsView.as_view(), name='user-detail'),
    # return (one/multiple)user's profile with related name entered
    path('userlist/', views.UserProfileListView.as_view(), name='user-list'),
    # create user by "posting" header:token , body: email,password
    path('usercreate', views.UserCreateView.as_view(), name='user-create'),
    # create user by "posting" header:token , body: username
    path('profilecreate/', views.ProfileCreateView.as_view(), name='profile-create'),
    # return the list of friends of an user and put to change friend list
    path('friendlist/<pk>', views.FriendListDetailsView.as_view(), name='friend-list-detail'),
    # put other user profile into friend list
    path('friendlistcreate/', views.FriendListCreateView.as_view(), name='friend-list-create'),

    # return preference detail
    path('preference/<pk>', views.PreferenceView.as_view(), name='preference-detail'),

]


