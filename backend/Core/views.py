from rest_framework import generics
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Note
from .serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated

from google import genai
import os
from dotenv import load_dotenv

# Create your views here.
class NoteListView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

class ChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Accept note content as text or file
        note_content = request.data.get('content')
        if not note_content and 'file' in request.FILES:
            note_content = request.FILES['file'].read().decode('utf-8')
        if not note_content:
            return Response({'error': 'No content provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = genai.Client(api_key=os.getenv("GEMINI_KEY"))
        prompt = (
            'based on these notes, create a 10 question multiple choice quiz with answers. In Json format. '
            'The format should be:\n'
            '{\n'
            '"quizTitle": "",\n'
            '"questions": [\n'
            '    {\n'
            '    "question": "",\n'
            '    "options": ["", "", "", ""],\n'
            '    "answer": ""\n'
            '    }\n'
            '    // ...repeat for 10 questions\n'
            ']\n'
            '}\n'
            'The questions should be about the content of the file.'
        )
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[note_content, prompt],
        )
        # Assuming response contains the quiz JSON as text
        try:
            quiz_json = response.text if hasattr(response, 'text') else response
            import json
            quiz_data = json.loads(quiz_json)
        except Exception:
            return Response({'error': 'Failed to parse quiz output.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(quiz_data, status=status.HTTP_200_OK)



