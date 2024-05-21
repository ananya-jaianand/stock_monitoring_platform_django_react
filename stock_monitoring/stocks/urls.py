from django.urls import path
from .views import StockDataView

urlpatterns = [
    path('data/', StockDataView.as_view(), name='stock-data'),  # URL for getting all symbols
    path('data/<str:symbol>/', StockDataView.as_view(), name='stock-data-symbol'),  # URL for getting data for a specific symbol
]
