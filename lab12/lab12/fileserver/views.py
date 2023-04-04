from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import UploadFile
from .forms import UploadFileForm

# Create your views here.

def index (request):
    return render (request, "index.html")

def about (request):
    return render (request, "about.html")

def rules (request):
    return render (request, "rules.html")

def upload (request):
    return render (request, "upload.html", { "form": UploadFileForm() })

def upload_file (request):
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            filemodel = form.save()
            return HttpResponseRedirect("/image?i={0}".format(filemodel.guid))
    return upload(request)

def image (request):
    requested_file = UploadFile.objects.get(guid=request.GET["i"])
    if requested_file:
        return render (request, "image.html", { 
            "file_name": requested_file.file_name(), 
            "caption": requested_file.caption 
        })
    return render (request, "notfound.html", { 
        "filename": request.GET["i"] 
    }) 
