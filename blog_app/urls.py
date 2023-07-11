from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('load/', views.load_more, name='load'),
    path('login/', views.login_view, name="login"),
    path('signup/', views.signup, name="signup"),
    path('logout/', views.logout_view, name="logout"),
    path('blog/<int:id>', views.view_blog, name="blog"),
    path('write', views.write, name="write")
]
