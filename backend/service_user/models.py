from django.db import models
from django.core.validators import MaxLengthValidator, MinLengthValidator

from django.contrib.auth.models import User



class Profile(models.Model):

    CHOICES = [
        ("driver", "Водитель"),
        ("client", "Пассажир")
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    role = models.CharField(choices=CHOICES, max_length=100)

    image = models.ImageField(upload_to="profile_image/")

    inn = models.CharField(max_length=12)


class PersonalInfo(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="personal_info")

    driver_license = models.ImageField(upload_to="driver_license/")

    driver_license_face = models.ImageField(upload_to="driver_license/")




class CarPhoto(models.Model):

    personal_info = models.OneToOneField(PersonalInfo, on_delete=models.CASCADE, related_name="car_photo")

    car_left = models.ImageField(upload_to="car_image/")
    car_in = models.ImageField(upload_to="car_image/")
    car_front = models.ImageField(upload_to="car_image/")
    car_back = models.ImageField(upload_to="car_image/")


class DetectCar(models.Model):

    personal_info = models.ForeignKey(PersonalInfo, on_delete=models.CASCADE)
    photo = models.FileField(upload_to="car_detect/")






