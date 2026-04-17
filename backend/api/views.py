# views.py
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from .models import Responsaveis, Locais, Ambientes, Microcontroladores, Sensores, Historicos, Usuarios
from .serializers import *
from .permissions import IsAdminOrReadOnly
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *
from django.utils import timezone
from datetime import timedelta


class ResponsaveisViewSet(ModelViewSet):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaveisSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ResponsaveisFilter
    permission_classes = [IsAdminOrReadOnly]


class LocaisViewSet(ModelViewSet):
    queryset = Locais.objects.all()
    serializer_class = LocaisSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = LocaisFilter
    permission_classes = [IsAdminOrReadOnly]


class AmbientesViewSet(ModelViewSet):
    queryset = Ambientes.objects.all()
    serializer_class = AmbientesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AmbientesFilter
    permission_classes = [IsAdminOrReadOnly]


class MicrocontroladoresViewSet(ModelViewSet):
    queryset = Microcontroladores.objects.all()
    serializer_class = MicrocontroladoresSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MicrocontroladoresFilter
    permission_classes = [IsAdminOrReadOnly]


class SensoresViewSet(ModelViewSet):
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SensoresFilter
    permission_classes = [IsAdminOrReadOnly]


class HistoricosViewSet(ModelViewSet):
    queryset = Historicos.objects.all()
    serializer_class = HistoricosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = HistoricosFilter
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        sensor = serializer.validated_data.get('sensor')
        if not sensor.status:
            raise ValidationError({"erro": "Não é possível registrar medições para um sensor inativo."})
        serializer.save()

    @action(detail=False, methods=['get'], url_path='recentes')
    def recentes(self, request):
        ultimas_24h = timezone.now() - timedelta(hours=24)
        qs = Historicos.objects.filter(timestamp__gte=ultimas_24h).order_by('-timestamp')
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class UsuariosViewSet(ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UsuariosFilter

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_staff:
            return qs
        # Usuário comum só vê o próprio perfil
        return qs.filter(user=self.request.user)


# --- Autenticação ---

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Usuário criado com sucesso."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsuarioMeView(RetrieveAPIView):
    serializer_class = UsuarioMeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.perfil