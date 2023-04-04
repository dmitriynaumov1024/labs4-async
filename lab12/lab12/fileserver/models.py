import uuid
from django.db import models

# Create your models here.

def upload_path(instance, filename):
    return "static/uploads/{0}-{1}".format(instance.guid, filename)

class UploadFile(models.Model):
    guid = models.CharField(max_length=50, default=uuid.uuid4().hex)
    file = models.FileField(upload_to=upload_path)
    caption = models.TextField(max_length=200)
    
    def file_name(self):
        return self.file.name.split("/")[-1]
