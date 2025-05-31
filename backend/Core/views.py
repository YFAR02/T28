from typing import Generic
from django.shortcuts import render

from backend.Core.models import Note
from backend.Core.serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class NoteListView(Generic.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

