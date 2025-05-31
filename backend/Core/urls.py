from django.urls import path
from . import views

urlpatterns = [
    path('view/', views.NoteListView.as_view(), name='noteList'),
]
