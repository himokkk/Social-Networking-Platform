from rest_framework.pagination import CursorPagination


class ExploreFeedPagination(CursorPagination):
    page_size = 50
    cursor_query_param = 'c'
    ordering = '-id'


class FollowingFeedPagination(CursorPagination):
    page_size = 50
    cursor_query_param = 'c'
    ordering = '-timestamp'
