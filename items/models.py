from django.db import models
from django.contrib.auth.models import User


class TodoItem(models.Model):
    URGENCY_CHOICES = (
        ('vital', 'vital'),
        ('important', 'important'),
        ('normal', 'normal'),
        ("finished", "finished"),
    )

    title = models.CharField(max_length=100)
    content = models.TextField(default="")
    created_time = models.DateTimeField(auto_now_add=True)
    last_modified_time = models.DateTimeField(auto_now=True)
    urgency = models.CharField(max_length=15, choices=URGENCY_CHOICES, default='normal')
    user = models.ForeignKey(User, related_name='posted_todo_item_set')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Todo Item"
        verbose_name_plural = "Todo Items"
        ordering = ['-created_time']
