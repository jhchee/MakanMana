# Generated by Django 2.0.2 on 2018-08-05 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User_base', '0002_auto_20180805_1759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='status',
            field=models.TextField(blank=True, default='Hey there! I am using Makan Mana', max_length=30),
        ),
    ]
