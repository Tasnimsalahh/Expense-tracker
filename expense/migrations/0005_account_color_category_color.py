# Generated by Django 5.0.6 on 2024-05-13 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0004_alter_user_balance_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='color',
            field=models.CharField(default='343a40', max_length=20),
        ),
        migrations.AddField(
            model_name='category',
            name='color',
            field=models.CharField(default='343a40', max_length=20),
        ),
    ]
