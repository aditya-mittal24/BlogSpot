from django.db import models
from django.contrib.auth.models import User
from django_quill.fields import QuillField

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = QuillField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name='blog_posts', default=None)
    bookmarks = models.ManyToManyField(User, related_name='bookmarked_blogs', default=None)
    
    def total_likes(self):
        return self.likes.count()
    
    def __str__(self):
        return self.title + ' | ' + self.user.first_name