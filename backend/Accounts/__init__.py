from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.conf import settings

def custom_password_reset_email(sender, instance, reset_password_token, *args, **kwargs):
    subject = "Your Custom Password Reset Subject"
    message = f"Hello,\n\nUse the following token to reset your password: {reset_password_token.key}\n\nOr click the link below:\nhttp://your-frontend-url/reset-password?token={reset_password_token.key}\n\nThank you!"
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [reset_password_token.user.email]
    )

reset_password_token_created.connect(custom_password_reset_email)