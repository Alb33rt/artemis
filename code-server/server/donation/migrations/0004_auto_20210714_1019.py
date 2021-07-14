# Generated by Django 3.2.5 on 2021-07-14 10:19

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0003_auto_20210714_1002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donation',
            name='credit_card_number',
            field=models.TextField(max_length=19),
        ),
        migrations.AlterField(
            model_name='donation',
            name='expiration_month',
            field=models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(12), django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='donation',
            name='expiration_year',
            field=models.IntegerField(default=30, validators=[django.core.validators.MaxValueValidator(99), django.core.validators.MinValueValidator(20)]),
        ),
        migrations.AlterField(
            model_name='donation',
            name='firstname',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='donation',
            name='lastname',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='donation',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]