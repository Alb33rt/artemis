# Generated by Django 3.2.5 on 2021-07-14 22:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('carbon', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='greenitem',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='greenentry',
            name='item_involved',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='GreenEntry', to='carbon.greenitem'),
        ),
        migrations.AddField(
            model_name='greenentry',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='GreenEntry', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='carbonitem',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='carbonentry',
            name='item_involved',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CarbonEntry', to='carbon.carbonitem'),
        ),
        migrations.AddField(
            model_name='carbonentry',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CarbonEntry', to=settings.AUTH_USER_MODEL),
        ),
    ]
