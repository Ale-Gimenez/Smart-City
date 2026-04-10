from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .models import Responsaveis, Locais, Ambientes, Microcontroladores, Sensores, Historicos, Usuarios
from .serializers import *
from rest_framework.decorators import api_view, action, permission_classes #Se não colocar este decorator não vai ter opção de get nem push
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *
import pandas as pd

class ResponsaveisViewSet(ModelViewSet):
    queryset = Responsaveis.objects.all()
    serializer_class = ResponsaveisSerializer

    # def get_queryset(self):
    #     status = self.request.query_params.get('status') #Parâmetro tradicional de busca no django
    #     if status:
    #         self.queryset = self.queryset.filter(status=status)
    #     return self.queryset

    # Filtros declarativos
    filter_backends = [DjangoFilterBackend]
    filterset_class = ResponsaveisFilter
    #Daqui pra cima são linhas importantes que todos os campos da tabela tem

    def get_queryset(self):
        qs = super().get_queryset()

        if self.request.user.is_staff:
            return qs
        
        return qs.filter(user=self.queryset.user)