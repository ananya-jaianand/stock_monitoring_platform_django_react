# handle GET requests
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .services import get_intraday_stock_data, get_random_symbols

class StockDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, symbol=None):
        if symbol:
            data = get_intraday_stock_data(symbol)
            print(data)
            return Response(data)
        else:
            symbols = get_random_symbols()
            print(symbols)
            return Response({'symbols': symbols})

