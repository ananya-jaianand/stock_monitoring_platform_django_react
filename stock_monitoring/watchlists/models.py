from django.db import models
from django.conf import settings

class Watchlist(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)

    class Meta:
        db_table = 'watchlists'
