from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import SafeText
from django.contrib import admin
from rest_framework.request import Request

from .models import Post, PostReport


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass


@admin.register(PostReport)
class PostReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post_link', 'description', 'timestamp')
    actions = ['delete_selected_posts']

    def post_link(self, obj: PostReport) -> SafeText:
        url = reverse("admin:posts_post_change", args=[obj.post.id])  # type: ignore
        return format_html('<a href="{}">{}</a>', url, obj.post.id)  # type: ignore

    post_link.short_description = 'Post ID'

    def delete_selected_posts(self, request: Request, queryset: QuerySet) -> None:
        for obj in queryset:
            obj.post.delete()

    delete_selected_posts.short_description = 'Delete selected posts'
