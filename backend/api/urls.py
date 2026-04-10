from django.urls import path, include #Include para o Model
from .views import *
from rest_framework.routers import DefaultRouter # Para o Model

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter() # Para o Model
router.register(r'usuarios', UsuarioViewSet)
router.register(r'imoveis', ImovelViewSet)
router.register(r'pagamentos', PagamentoViewSet)
router.register(r'contratos', ContratoViewSet)
router.register(r'dashboard', DashboardViewSet, basename='dashboard')

#Só podemos usar rotas com ModelViewSet
#Generics é pouco utilizado

urlpatterns = [
    ############## TOKEN #######################
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #Isto tem que ir no começo das rotas
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'), #O refresh renova o token após um tempo de inatividade
    #existe também o verify para verificar se é válido, mas não vamos utilizar

    path('register/', RegisterView.as_view(), name='register'),
    # path('/me', MeView.as_view, name = 'me'),

    path('importar_imoveis/', importar_imoveis, name='importat_imoveis'),

    ########### MODELVIEWSET #################################
    path('', include(router.urls))

    ############### GENERICS, APIVIEW #####################
    # path('usuarios', listar_usuarios),
    # path('usuarios', UsuarioView.as_view()),
    # path('usuario/<int:pk>', UsuarioDetailView.as_view()),

    # path('imoveis', ImovelView.as_view()),
    # path('imovel/<int:pk>', ImovelDetailView.as_view()),

    # path('pagamentos', PagamentoView.as_view()),
    # path('pagamento/<int:pk>', PagamentoDetailView.as_view()),

    # path('contratos', ContratoView.as_view()),
    # path('contrato/<int:pk>', ContratoDetailView.as_view()),
]