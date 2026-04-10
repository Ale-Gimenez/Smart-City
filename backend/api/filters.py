import django_filters
from .models import *
from .models import Responsaveis, Locais, Ambientes, Microcontroladores, Sensores, Historicos, Usuarios

class ResponsaveisFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')

    class Meta:
        model = Responsaveis
        fields = ['nome']

class LocaisFilter(django_filters.FilterSet):
    local = django_filters.CharFilter(field_name='local', lookup_expr='icontains')

    class Meta:
        model = Locais
        fields = ['local']

#falta daqui pra baixo, depois passar para os views

class AmbientesFilter(django_filters.FilterSet):
    titulo = django_filters.CharFilter(field_name='titulo', lookup_expr='icontains')
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='iexact')
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')

    class Meta:
        model = Ambientes
        fields = ['titulo', 'tipo', 'status']


class UsuariosFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='iexact')

    class Meta:
        model = Usuarios
        fields = ['nome', 'tipo']

class ContratoFilter(django_filters.FilterSet):
    data_inicio = django_filters.DateFilter(field_name='data_inicio', lookup_expr='gte') #É como se fosse o mínimo
    data_fim = django_filters.DateFilter(field_name='data_fim', lookup_expr='lte') #É como se fosse o máximo
    valor_min = django_filters.NumberFilter(field_name='valor', lookup_expr='gte')
    valor_max = django_filters.NumberFilter(field_name='valor', lookup_expr='lte')

    class Meta:
        model = Contrato
        fields = ['data_inicio', 'data_fim', 'valor']

class PagamentoFilter(django_filters.FilterSet):
    data_pagamento = django_filters.DateFilter(field_name='data_pagamento')
    status = django_filters.BooleanFilter(field_name='status')
    contrato = django_filters.NumberFilter(field_name='contrato_id')

    class Meta:
        model = Pagamento
        fields = ['data_pagamento', 'status', 'contrato_id']
