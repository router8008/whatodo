from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *


class RegisterAPIView(APIView):
    serializer_class = RegisterAPISerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        User.objects.create_user(username=username, password=password)
        return Response(["success"])


class LoginAPIView(APIView):
    serializer_class = LoginAPISerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response(["success"])
        else:
            return Response(["username or password error"], 401)


class LogoutAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response(["success"])


class GetUsernameAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        username = request.user.username
        return Response([username])
