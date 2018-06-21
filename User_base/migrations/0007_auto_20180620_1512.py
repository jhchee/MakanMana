# Generated by Django 2.0.2 on 2018-06-20 07:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('User_base', '0006_auto_20180620_1244'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendlist',
            name='friend_list',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='friendlist',
            name='profile',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='This_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
