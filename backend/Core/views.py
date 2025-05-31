from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Note
from .serializers import NoteSerializer

import os
from google import genai
from dotenv import load_dotenv
from django.conf import settings

load_dotenv()

class NoteListView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

class ChatViewQuiz(APIView):
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
            'based on these notes, create a 20 question multiple choice quiz with answers. In Json format. '
            'The format should be:\n'
            '{\n'
            '"quizTitle": "",\n'
            '"questions": [\n'
            '    {\n'
            '    "question": "",\n'
            '    "options": ["", "", "", ""],\n'
            '    "answer": ""\n'
            '    }\n'
            '    // ...repeat for 20 questions\n'
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

class ChatViewFlashcards(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        note_content = request.data.get('content')
        file_path = request.data.get('file_path')
        if not note_content and file_path:
            # Build the full path to the user's file
            user_folder = f"user_{request.user.id}"
            full_path = os.path.join(settings.MEDIA_ROOT, user_folder, file_path)
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    note_content = f.read()
            except Exception:
                return Response({'error': 'Could not read file.'}, status=status.HTTP_400_BAD_REQUEST)
        if not note_content:
            return Response({'error': 'No content provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = genai.Client(api_key=os.getenv("GEMINI_KEY"))
        prompt = (
            'based on these notes, create a 20 flashcards. In Json format. '
            'The format should be:\n'
            '{\n'
            '"setTitle": "",\n'
            '"flashcards": [\n'
            '    {\n'
            '    "term": "",\n'
            '    "definition": "",\n'
            '    }\n'
            '    // ...repeat for 20 terms\n'
            ']\n'
            '}\n'
            'The terms should be about the content of the file.\n'
            'The return should be a JSON with no other text or explanation.'
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
    
class ChatViewNotes(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        note_content = request.data.get('content')
        file_path = request.data.get('file_path')
        if not note_content and file_path:
            # Build the full path to the user's file
            user_folder = f"user_{request.user.id}"
            full_path = os.path.join(settings.MEDIA_ROOT, user_folder, file_path)
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    note_content = f.read()
            except Exception:
                return Response({'error': 'Could not read file.'}, status=status.HTTP_400_BAD_REQUEST)
        if not note_content:
            return Response({'error': 'No content provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = genai.Client(api_key=os.getenv("GEMINI_KEY"))
        prompt = (
            'based on these notes, create a summary of the notes. '
            'The summary should be concise and cover the main points.'
        )
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[note_content, prompt],
        )
        
        # Assuming response contains the summary text
        summary_text = response.text if hasattr(response, 'text') else response

        return Response({'summary': summary_text}, status=status.HTTP_200_OK)
    
class ChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # print("DEBUG: request.content_type =", request.content_type)
        # print("DEBUG: request.data =", request.data)
        chat_content = request.data.get('content')
        if not chat_content and 'file' in request.FILES:
            chat_content = request.FILES['file'].read().decode('utf-8')
        if not chat_content:
            return Response({'error': 'No content provided.'}, status=status.HTTP_400_BAD_REQUEST)

        client = genai.Client(api_key=os.getenv("GEMINI_KEY"))
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[chat_content],
        )

        chat_response_text = response.text if hasattr(response, 'text') else response

        return Response(chat_response_text, status=status.HTTP_200_OK)

class NoteUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)
        note = Note.objects.create(
            user=request.user,
            file=uploaded_file,
            content=request.data.get('content', '')
        )
        from .serializers import NoteSerializer
        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserNotesListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        notes = Note.objects.filter(user=request.user)
        from .serializers import NoteSerializer
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

