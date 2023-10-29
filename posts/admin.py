from django.contrib import admin
from django.apps import apps

posts_models = apps.get_app_config("posts").get_models()

for model in posts_models:
    admin.site.register(model)
