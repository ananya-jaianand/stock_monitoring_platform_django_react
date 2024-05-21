from django.urls import path
from .views import AddSymbolToWatchlist ,UserWatchlistView,WatchlistDetailView

urlpatterns = [
    path('add-symbol/', AddSymbolToWatchlist.as_view(), name='add_symbol_to_watchlist'),
    path('view/', UserWatchlistView.as_view(), name='user_watchlist'),
     path('delete/<str:symbol>/', WatchlistDetailView.as_view(), name='watchlist-detail'),
]
