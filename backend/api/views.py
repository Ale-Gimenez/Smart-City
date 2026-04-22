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
from rest_framework.decorators import api_view, action, permission_classes
import pandas as pd


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
    
# ─── Importações de Planilhas ───────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_locais(request):
    arquivo = request.FILES.get("file")
    if not arquivo:
        return Response({"detail": "Nenhum arquivo enviado."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        df = pd.read_excel(arquivo)

        colunas_esperadas = ['local']
        for coluna in colunas_esperadas:
            if coluna not in df.columns:
                return Response({"detail": f"Coluna obrigatória ausente: {coluna}"}, status=status.HTTP_400_BAD_REQUEST)

        criados, ignorados = 0, 0
        for _, row in df.iterrows():
            _, created = Locais.objects.get_or_create(local=row['local'])
            if created:
                criados += 1
            else:
                ignorados += 1

        return Response({
            "detail": "Importação concluída.",
            "criados": criados,
            "ignorados (já existiam)": ignorados
        })
    except Exception as e:
        return Response({"detail": f"Erro ao importar arquivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_responsaveis(request):
    arquivo = request.FILES.get("file")
    if not arquivo:
        return Response({"detail": "Nenhum arquivo enviado."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        df = pd.read_excel(arquivo)

        colunas_esperadas = ['responsavel']
        for coluna in colunas_esperadas:
            if coluna not in df.columns:
                return Response({"detail": f"Coluna obrigatória ausente: {coluna}"}, status=status.HTTP_400_BAD_REQUEST)

        criados, ignorados = 0, 0
        for _, row in df.iterrows():
            _, created = Responsaveis.objects.get_or_create(nome=row['responsavel'])
            if created:
                criados += 1
            else:
                ignorados += 1

        return Response({
            "detail": "Importação concluída.",
            "criados": criados,
            "ignorados (já existiam)": ignorados
        })
    except Exception as e:
        return Response({"detail": f"Erro ao importar arquivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_ambientes(request):
    arquivo = request.FILES.get("file")
    if not arquivo:
        return Response({"detail": "Nenhum arquivo enviado."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        df = pd.read_excel(arquivo)

        colunas_esperadas = ['local', 'descricao', 'responsavel']
        for coluna in colunas_esperadas:
            if coluna not in df.columns:
                return Response({"detail": f"Coluna obrigatória ausente: {coluna}"}, status=status.HTTP_400_BAD_REQUEST)

        erros = []
        criados, ignorados = 0, 0

        for i, row in df.iterrows():
            try:
                print(f"Linha {i+2}: local={row['local']}, tipo={type(row['local'])}")
                local_obj = Locais.objects.get(local=row['local'])
            except Locais.DoesNotExist:
                erros.append(f"Linha {i+2}: Local '{row['local']}' não encontrado.")
                continue

            try:
                responsavel_obj = Responsaveis.objects.get(responsavel=row['responsavel'])
            except Responsaveis.DoesNotExist:
                erros.append(f"Linha {i+2}: Responsável '{row['responsavel']}' não encontrado.")
                continue

            _, created = Ambientes.objects.get_or_create(
                descricao=row['descricao'],
                defaults={
                    'local': local_obj,
                    'responsavel': responsavel_obj,
                }
            )
            if created:
                criados += 1
            else:
                ignorados += 1

        resposta = {"detail": "Importação concluída.", "criados": criados, "ignorados (já existiam)": ignorados}
        if erros:
            resposta["erros"] = erros
        return Response(resposta)
    except Exception as e:
        return Response({"detail": f"Erro ao importar arquivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_microcontroladores(request):
    arquivo = request.FILES.get("file")
    if not arquivo:
        return Response({"detail": "Nenhum arquivo enviado."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        df = pd.read_excel(arquivo)

        colunas_esperadas = ['modelo', 'mac_address', 'latitude', 'longitude', 'status', 'ambiente']
        for coluna in colunas_esperadas:
            if coluna not in df.columns:
                return Response({"detail": f"Coluna obrigatória ausente: {coluna}"}, status=status.HTTP_400_BAD_REQUEST)

        erros = []
        criados, ignorados = 0, 0

        for i, row in df.iterrows():
            # Busca o Ambiente pelo nome/descrição
            try:
                ambiente_obj = Ambientes.objects.get(descricao=row['ambiente'])
            except Ambientes.DoesNotExist:
                erros.append(f"Linha {i+2}: Ambiente '{row['ambiente']}' não encontrado.")
                continue

            _, created = Microcontroladores.objects.get_or_create(
                mac_address=row['mac_address'],
                defaults={
                    'modelo': row['modelo'],
                    'latitude': row['latitude'],
                    'longitude': row['longitude'],
                    'status': row['status'],
                    'ambiente': ambiente_obj,
                }
            )
            if created:
                criados += 1
            else:
                ignorados += 1

        resposta = {"detail": "Importação concluída.", "criados": criados, "ignorados (já existiam)": ignorados}
        if erros:
            resposta["erros"] = erros
        return Response(resposta)
    except Exception as e:
        return Response({"detail": f"Erro ao importar arquivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_sensores(request):
    arquivo = request.FILES.get("file")
    if not arquivo:
        return Response({"detail": "Nenhum arquivo enviado."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        df = pd.read_excel(arquivo)

        colunas_esperadas = ['sensor', 'unidade_med', 'mic', 'status']
        for coluna in colunas_esperadas:
            if coluna not in df.columns:
                return Response({"detail": f"Coluna obrigatória ausente: {coluna}"}, status=status.HTTP_400_BAD_REQUEST)

        erros = []
        criados, ignorados = 0, 0

        for i, row in df.iterrows():
            # Busca o Microcontrolador pelo mac_address
            try:
                mic_obj = Microcontroladores.objects.get(mac_address=row['mic'])
            except Microcontroladores.DoesNotExist:
                erros.append(f"Linha {i+2}: Microcontrolador '{row['mic']}' não encontrado.")
                continue

            _, created = Sensores.objects.get_or_create(
                sensor=row['sensor'],
                defaults={
                    'unidade_med': row['unidade_med'],
                    'mic': mic_obj,
                    'status': row['status'],
                }
            )
            if created:
                criados += 1
            else:
                ignorados += 1

        resposta = {"detail": "Importação concluída.", "criados": criados, "ignorados (já existiam)": ignorados}
        if erros:
            resposta["erros"] = erros
        return Response(resposta)
    except Exception as e:
        return Response({"detail": f"Erro ao importar arquivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_historicos(request):
    arquivo = request.FILES.get("file")
    if not arquivo:
        return Response({"detail": "Nenhum arquivo enviado."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        df = pd.read_excel(arquivo)

        colunas_esperadas = ['sensor', 'valor', 'timestamp']
        for coluna in colunas_esperadas:
            if coluna not in df.columns:
                return Response({"detail": f"Coluna obrigatória ausente: {coluna}"}, status=status.HTTP_400_BAD_REQUEST)

        erros = []
        criados = 0

        for i, row in df.iterrows():
            # Busca o Sensor pelo nome
            try:
                sensor_obj = Sensores.objects.get(sensor=row['sensor'])
            except Sensores.DoesNotExist:
                erros.append(f"Linha {i+2}: Sensor '{row['sensor']}' não encontrado.")
                continue

            # Valida se o sensor está ativo (mesma regra do perform_create)
            if not sensor_obj.status:
                erros.append(f"Linha {i+2}: Sensor '{row['sensor']}' está inativo.")
                continue

            Historicos.objects.create(
                sensor=sensor_obj,
                valor=row['valor'],
                timestamp=row['timestamp'],
            )
            criados += 1

        resposta = {"detail": "Importação concluída.", "criados": criados}
        if erros:
            resposta["erros"] = erros
        return Response(resposta)
    except Exception as e:
        return Response({"detail": f"Erro ao importar arquivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)