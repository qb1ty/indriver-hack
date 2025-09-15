from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotAcceptable, NotFound
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.views import APIView

from uuid import uuid4

from .models import Profile, PersonalInfo, CarPhoto, DetectCar
from .serializer import PersonalInfoSerialzier, ProfileSerializer, CarPhotoSerializer, TinyProfileSerializer, TinyCarSerializer
from utils.util import CarArtifact



class ProfileAPIView(APIView):

    serializer_class = ProfileSerializer

    permission_classes = [AllowAny]


    def get(self, request, *args, **kwargs):

        user_auth = request.user

        user = get_object_or_404(User, id=user_auth)

        profile = get_object_or_404(Profile, user=user)

        return Response(self.serializer_class(profile).data, status=status.HTTP_200_OK)



class SignInAPIView(APIView):

    permission_classes = [AllowAny]


    def post(self, request, *args, **kwargs):

        inn = request.data.get("inn")
        password = request.data.get("password")

        profile = get_object_or_404(Profile, inn=inn)

        user = profile.user

        if user.check_password(password):

            refresh = RefreshToken.for_user(user)


            return Response({"refresh": str(refresh), "access": str(refresh.access_token)}, status=status.HTTP_200_OK)

        return Response({"message": "Неверный пароль"}, status=status.HTTP_400_BAD_REQUEST)



class SignUpAPIView(APIView):

    serializer_class = ProfileSerializer

    permission_classes = [AllowAny]

    tiny_serializer_class = TinyProfileSerializer


    def post(self, request, *args, **kwargs):

        tiny_serializer = self.tiny_serializer_class(data=request.data)

        if not tiny_serializer.is_valid(raise_exception=True):
            return Response({"message": "request error"}, status=status.HTTP_400_BAD_REQUEST)


        data = tiny_serializer.validated_data


        print(data)


        user = User.objects.create(
            username=uuid4(),
            first_name=data["first_name"],
            last_name=data["last_name"],
            
        )
        user.set_password(data["password"])
        user.save()

        profile = Profile.objects.create(
            user=user,
            role=data["role"],
            image=data["image"],
            inn=data["inn"],
        )

        profile.save()

        personal_info = PersonalInfo.objects.create(
            user=user,
            driver_license=data["driver_license"],
            driver_license_face=data["driver_license_face"],
        )
        personal_info.save()

        car_photo = CarPhoto.objects.create(
            personal_info=personal_info,
            car_left=data["car_left"],
            car_in=data["car_in"],
            car_front=data["car_front"],
            car_back=data["car_back"]
        )

        car_photo.save()

        refresh = RefreshToken.for_user(user)

        return Response({"refresh": str(refresh), "access": str(refresh.access_token)}, status=status.HTTP_201_CREATED)



class ValidateTokenAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        refresh_token = request.data.get("refresh")

        try:
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token

            return Response({"access": str(access_token)}, status=status.HTTP_200_OK)
        
        except TokenError as e:
            return Response({"message": e}, status=status.HTTP_401_UNAUTHORIZED)



class CarValidAPIView(APIView):

    tiny_serializer_class = TinyCarSerializer

    car_artifact = CarArtifact()

    def post(self, request, *args, **kwargs):

        user = request.user
        print(request.data)
        print("re")
        tiny_serializer = self.tiny_serializer_class(data=request.data)


        if not tiny_serializer.is_valid(raise_exception=True):
            print(tiny_serializer)
            return Response({"message": "Ошибка валидации"}, status=status.HTTP_400_BAD_REQUEST)
        
        data = tiny_serializer.validated_data


        mapping = {
            # "car_in": data["car_in"],
            "car_back": data["car_back"],
            "car_front": data["car_front"],
            "car_left": data["car_left"]
        }

        person = get_object_or_404(PersonalInfo, user=user)

        for value in mapping.values():

            img, count = self.car_artifact.detect_car(value)

            queryset = DetectCar.objects.create(
                personal_info=person,
                photo=img    
            )


            if count != 0:
                queryset.save()
                return Response({"message": "У вас имеются повреждение в машине, пожалуйста обратитесь в сервисный центр"}, status=status.HTTP_403_FORBIDDEN)
            

        return Response({"message": "Проверка прошла успешно!\nУдачной смены"}, status=status.HTTP_200_OK)


        