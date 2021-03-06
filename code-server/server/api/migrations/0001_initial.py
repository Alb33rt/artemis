# Generated by Django 3.2.5 on 2021-07-13 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CarbonEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=256)),
                ('emission', models.IntegerField()),
                ('true_emission', models.IntegerField(default=0)),
                ('tree_emission', models.IntegerField(default=0)),
                ('time', models.TimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.TextField(max_length=256)),
                ('amount', models.IntegerField()),
                ('time', models.TimeField(auto_now_add=True)),
            ],
        ),
    ]
