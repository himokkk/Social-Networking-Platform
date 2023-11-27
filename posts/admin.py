from django.apps import apps
from django.contrib import admin

posts_models = apps.get_app_config("posts").get_models()

for model in posts_models:
    admin.site.register(model)
