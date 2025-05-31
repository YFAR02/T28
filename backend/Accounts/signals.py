from django.core.mail import send_mail
from django.conf import settings
from django_rest_passwordreset.signals import reset_password_token_created

def custom_password_reset_email(sender, instance, reset_password_token, *args, **kwargs):
    subject = "Password Reset"
    user = reset_password_token.user
    username = user.username if hasattr(user, 'username') else ''
    reset_url = f"http://localhost:3000/reset-password?token={reset_password_token.key}"
    message = (
        f"Hello {username},\n\n"
        f"Use the following link to reset password:\n"
        f"{reset_url}\n\n"
        f"Thank you!"
    )
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [reset_password_token.user.email]
    )

reset_password_token_created.connect(custom_password_reset_email)
