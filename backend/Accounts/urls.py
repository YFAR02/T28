from django.urls import include, path
from .views import RegisterView

# Import signals to ensure email sending is registered
import django_rest_passwordreset.signals  # noqa

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

]
