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
    # return the list of friends of an user
    path('friendlist/', views.FriendListView.as_view(), name='friend-list'),

]


