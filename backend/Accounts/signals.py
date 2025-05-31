from django.core.mail import send_mail
from django.conf import settings
from django_rest_passwordreset.signals import reset_password_token_created

def custom_password_reset_email(sender, instance, reset_password_token, *args, **kwargs):
    # Customize subject and message as needed
    subject = "Your Custom Password Reset Subject"
    message = (
        f"Hello,\n\n"
        f"Use the following token to reset your password: {reset_password_token.key}\n\n"
        f"Or click the link below:\n"
        f"token:{reset_password_token.key}\n\n"
        f"Thank you!"
    )
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [reset_password_token.user.email]
    )

reset_password_token_created.connect(custom_password_reset_email)
