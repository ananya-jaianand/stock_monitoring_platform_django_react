from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Watchlist
from .serializers import WatchlistSerializer

class AddSymbolToWatchlist(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("Received request data:", request.data)  # Log the request data for debugging
        serializer = WatchlistSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            watchlist_instance = serializer.save()
            return Response({"message": "Symbol added to watchlist successfully.", "data": serializer.data}, status=status.HTTP_201_CREATED)
        
        print("Serializer errors:", serializer.errors)  # Log any serializer errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserWatchlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        watchlist = Watchlist.objects.filter(user=user)
        if not watchlist.exists():
            return Response({"message": "Your watchlist is empty."}, status=status.HTTP_201_CREATED)
        
        serializer = WatchlistSerializer(watchlist, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class WatchlistDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, symbol):
        try:
            watchlist_entry = Watchlist.objects.get(symbol=symbol, user=request.user)
            watchlist_entry.delete()
            return Response({"message": "Symbol deleted from watchlist successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Watchlist.DoesNotExist:
            return Response({"error": "Watchlist entry not found."}, status=status.HTTP_404_NOT_FOUND)