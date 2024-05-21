# API requests to fetch stock data from Alpha Vantage
import requests
from django.conf import settings
import random

ALPHA_VANTAGE_API_KEY = 'api key'
BASE_URL = 'https://www.alphavantage.co/query'


def get_intraday_stock_data(symbol):
    params = {
        'function': 'TIME_SERIES_INTRADAY',
        'symbol': symbol,
        'interval': '5min',
        'apikey': ALPHA_VANTAGE_API_KEY,
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        if 'Time Series (5min)' in data:
            time_series = data['Time Series (5min)']
            latest_timestamp = max(time_series.keys())
            latest_data = time_series[latest_timestamp]
            latest_price = latest_data['4. close']
            latest_volume = latest_data['5. volume']
            return {'price': latest_price, 'volume': latest_volume}
        else:
            return {'error': 'No data found'}
    else:
        response.raise_for_status()

# Example usage:
# data = get_intraday_stock_data('IBM', interval='15min', outputsize='full')
# print(data)

PREDEFINED_SYMBOLS = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "FB", "TSLA", "BRK.A", "V", "JNJ", "WMT", "PG", "NVDA",
    "DIS", "MA", "PYPL", "NFLX", "ADBE", "CMCSA", "PFE", "KO", "INTC", "CSCO", "PEP", "T",
    "MRK", "ABT", "ABBV", "CRM", "TMO", "VZ", "NKE", "MCD", "MDT", "WFC", "BMY", "ACN", 
    "NEE", "TXN", "LLY", "UNH", "IBM", "HON", "GE", "ORCL", "QCOM", "AMGN", "CVX"
]

def fetch_symbols(symbols, limit=50):
    random.shuffle(symbols)
    return symbols[:limit]

def get_random_symbols(limit=50):
    return fetch_symbols(PREDEFINED_SYMBOLS, limit)