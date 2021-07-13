# Generated by Django 3.2.5 on 2021-07-13 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.TextField(max_length=256)),
                ('amount', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='carbonentry',
            name='tree_emission',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='carbonentry',
            name='true_emission',
            field=models.IntegerField(default=0),
        ),
    ]
