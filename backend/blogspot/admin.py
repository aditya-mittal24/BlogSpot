from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Blog)
admin.site.register(Tag)
admin.site.register(Bookmark)
admin.site.register(Collection)
admin.site.register(Like)
