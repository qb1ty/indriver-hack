from rest_framework import serializers

from .models import Profile, PersonalInfo, CarPhoto



class TinyCarSerializer(serializers.ModelSerializer):

    car_front = serializers.ImageField()
    car_back = serializers.ImageField()
    car_left = serializers.ImageField()
    car_in = serializers.ImageField()

    class Meta:
        model = CarPhoto
        fields = ["car_back", "car_front", "car_left", "car_in"]



class TinyProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField()
    last_name = serializers.CharField()

    password = serializers.CharField()

    role = serializers.CharField()
    image = serializers.ImageField()
    inn = serializers.IntegerField()

    driver_license = serializers.ImageField()

    driver_license_face = serializers.ImageField()

    car_left = serializers.ImageField()
    car_in = serializers.ImageField()
    car_front = serializers.ImageField()
    car_back = serializers.ImageField()


    class Meta:

        model = PersonalInfo
        fields = ["first_name", "password", "last_name", "role", "image", "inn", "car_left", "car_in", "car_front", "car_back", "driver_license", "driver_license_face"]


class ProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    class Meta:

        model = Profile
        fields = ["first_name", "last_name", "role", "image", "inn"]


class PersonalInfoSerialzier(serializers.ModelSerializer):

    class Meta:
        model = PersonalInfo
        fields = ["driver_license", "driver_license_face"]


class CarPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarPhoto
        fields = ["car_left", "car_in", "car_front", "car_back"]



