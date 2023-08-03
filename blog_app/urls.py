from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('load/', views.load_more, name='load'),
    path('login/', views.login_view, name="login"),
    path('signup/', views.signup, name="signup"),
    path('logout/', views.logout_view, name="logout"),
    path('blog/<int:id>', views.view_blog, name="blog"),
    path('write/', views.write, name="write"),
    path('my_blogs/', views.my_blogs, name="my_blogs"),
    path('saved_blogs/', views.saved_blogs, name="saved_blogs"),
    path('like_blog/<int:id>', views.like_blog, name="like_blog"),
    path('bookmark_blog/<int:id>', views.bookmark_blog, name="bookmark_blog"),
]
