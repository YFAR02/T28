from django.urls import path
from . import views

urlpatterns = [
    path('noteList/', views.NoteListView.as_view(), name='noteList'),
    path('chat/', views.ChatView.as_view(), name='chat'),
]
