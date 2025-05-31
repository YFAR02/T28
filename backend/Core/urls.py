from django.urls import path
from . import views
from .views import NoteUploadView, UserNotesListView

urlpatterns = [
    path('noteList/', views.NoteListView.as_view(), name='noteList'),
    path('chatQuiz/', views.ChatViewQuiz.as_view(), name='chatQuiz'),
    path('chatFlashcards/', views.ChatViewFlashcards.as_view(), name='chatFlashcards'),
    path('chatNotes/', views.ChatViewNotes.as_view(), name='chatNotes'),
    path('chat/', views.ChatView.as_view(), name='chat'),
    path('upload-file/', NoteUploadView.as_view(), name='upload-file'),
    path('my-files/', UserNotesListView.as_view(), name='my-files'),
]
