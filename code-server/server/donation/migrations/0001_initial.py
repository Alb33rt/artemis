# Generated by Django 3.2.5 on 2021-07-14 22:11

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=256, null=True)),
                ('lastname', models.CharField(max_length=256, null=True)),
                ('credit_card_number', models.TextField(max_length=19)),
                ('expiration_year', models.IntegerField(default=30, validators=[django.core.validators.MaxValueValidator(99), django.core.validators.MinValueValidator(20)])),
                ('expiration_month', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(12), django.core.validators.MinValueValidator(1)])),
                ('confirm_code', models.TextField(max_length=3)),
                ('quantity', models.IntegerField(default=0)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
