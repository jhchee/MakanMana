# Generated by Django 2.0.2 on 2018-06-23 11:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User_base', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='username',
            new_name='profile_name',
        ),
    ]
