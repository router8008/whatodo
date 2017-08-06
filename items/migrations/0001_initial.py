# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TodoItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField(default=b'')),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('last_modified_time', models.DateTimeField(auto_now=True)),
                ('urgency', models.CharField(default=b'normal', max_length=15, choices=[(b'vital', b'vital'), (b'important', b'important'), (b'normal', b'normal'), (b'finished', b'finished')])),
                ('user', models.ForeignKey(related_name='posted_todo_item_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_time'],
                'verbose_name': 'Todo Item',
                'verbose_name_plural': 'Todo Items',
            },
        ),
    ]
