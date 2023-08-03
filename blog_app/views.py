from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .forms import QuillFieldForm
from .models import Blog
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.urls import reverse

# Create your views here.

def home(request):
    all_blogs = Blog.objects.all()[::-1]
    total_blogs = Blog.objects.count()
    blogs = all_blogs[0:6]
    featured = Blog.objects.filter(title="A productivity system to help you get shit done").first()
    return render(request, "index.html", context= {"blogs": blogs, "total_blogs": total_blogs, "featured": featured})

def load_more(request):
    total_item = int(request.GET.get('total_item'))
    limit = 3
    all_blogs = list(Blog.objects.values()[::-1])
    blogs = all_blogs[total_item:total_item+limit]
    for blog in blogs:
        user = list(User.objects.filter(id=blog['user_id']).values())
        blog['user'] = user
    data = {
        'blogs': blogs
    }
    return JsonResponse(data=data)
    

def login_view(request):
    if request.user.is_authenticated:
        return redirect(home)
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect(home)
    return render(request, "login.html")

def signup(request):
    if request.user.is_authenticated:
        return redirect(home)
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        user = User.objects.create_user(username=email, email=email, password=password, first_name=first_name, last_name=last_name)
        user.save()
        return redirect(login_view)
    return render(request, "signup.html")

def logout_view(request):
    logout(request)
    return redirect(home)

def view_blog(request, id):
    if id:
        blog = Blog.objects.get(pk=id)
        likes = list(blog.likes.all())
        bookmarks = list(blog.bookmarks.all())
        liked = request.user in likes
        bookmarked = request.user in bookmarks
        return render(request, "blog.html", context={"blog": blog, "liked": liked, 'bookmarked': bookmarked, "likes": blog.total_likes()})
    
@login_required(login_url='/login')
def my_blogs(request):
    blogs = Blog.objects.filter(user=request.user)[::-1]
    return render(request, "my_blogs.html", context= {"blogs": blogs,})

@login_required(login_url='/login')
def saved_blogs(request):
    all_blogs = Blog.objects.all()[::-1]
    blogs = []
    for blog in all_blogs:
        bookmarks = list(blog.bookmarks.all())
        if request.user in bookmarks:
            blogs.append(blog)
    return render(request, "saved_blogs.html", context= {"blogs": blogs,})

@login_required(login_url='/login')
def write(request):
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        image = request.FILES['image']
        user = request.user
        blog = Blog(title=title, content=content, image=image, user=user)
        blog.save()
        return redirect(home)
    form = QuillFieldForm()
    return render(request, "write.html", context= {"form": form})

@login_required(login_url='/login')
def like_blog(request, id):
    blog = get_object_or_404(Blog, id=id)
    likes = list(blog.likes.all())
    if request.user in likes:
        blog.likes.remove(request.user)
    else:
        blog.likes.add(request.user)
    return HttpResponseRedirect(reverse('blog', args=[str(id)]))

@login_required(login_url='/login')
def bookmark_blog(request, id):
    blog = get_object_or_404(Blog, id=id)
    bookmarks = list(blog.bookmarks.all())
    if request.user in bookmarks:
        blog.bookmarks.remove(request.user)
    else:
        blog.bookmarks.add(request.user)
    return HttpResponseRedirect(reverse('blog', args=[str(id)]))
    

# handle login wrong password/ user does not exist
# handle likes
# handle bookmark
# handle categories
# handle my blogs and saved blogs page