from rest_framework import serializers
from .models import Watchlist

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ['symbol']  # Only require the 'symbol' field from the client

    def validate(self, data):
        user = self.context['request'].user  # Get the user from the request context
        symbol = data['symbol']

        # Check if the user already has the symbol in their watchlist
        if Watchlist.objects.filter(user=user, symbol=symbol).exists():
            raise serializers.ValidationError("This symbol is already in the user's watchlist.")

        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user  # Set the user from the request context
        return super().create(validated_data)