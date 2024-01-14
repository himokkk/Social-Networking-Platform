from django.db.models import Count, Q
from django.db.models.query import QuerySet
from django.utils import timezone
from django.views import View
from rest_framework.pagination import CursorPagination
from rest_framework.request import Request


class ExploreFeedPagination(CursorPagination):
    page_size = 50
    cursor_query_param = "c"
    ordering = ["-likes_last_hour", "-comments_last_hour", "-timestamp"]

    def paginate_queryset(
        self, queryset: QuerySet, request: Request, view: View | None = None
    ) -> list | None:
        last_hour = timezone.now() - timezone.timedelta(hours=1)

        queryset = queryset.annotate(
            likes_last_hour=Count(
                "postlike", filter=Q(postlike__timestamp__gte=last_hour), distinct=True
            ),
            comments_last_hour=Count(
                "postcomment",
                filter=Q(postcomment__timestamp__gte=last_hour),
                distinct=True,
            ),
        )
        return super().paginate_queryset(queryset, request, view)


class DefaultFeedPagination(CursorPagination):
    page_size = 50
    cursor_query_param = "c"
    ordering = "-timestamp"
