# Generated by Django 3.2.5 on 2021-07-14 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carbon', '0002_auto_20210714_0036'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='unit',
            field=models.TextField(max_length=256, null=True),
        ),
    ]