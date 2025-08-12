from django.shortcuts import render
import requests
from datetime import datetime, timedelta
from django.http import JsonResponse
from django.conf import settings

ALLOWED_STATES = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan",
    "Bizerte", "Beja", "Jendouba", "Kef", "Siliana", "Sousse", "Monastir",
    "Mahdia", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabes", "Mednine",
    "Tataouine", "Gafsa", "Tozeur", "Kebili"
]

def get_weather(request):
    governorate = request.GET.get("governorate")
    date_str = request.GET.get("date")

    # Validation
    if not governorate or governorate not in ALLOWED_STATES:

        return JsonResponse({"error": "Invalid or missing state"}, status=400)

    try:
        date = datetime.strptime(date_str, "%Y-%m-%d").date() #tansformer le texte aun objet "date"
    except:
        return JsonResponse({"error": "Invalid date format, use YYYY-MM-DD"}, status=400)
    

    today = datetime.today().date()# sert a récupèrer la date d'aujourd'hui (sans l'heure)
    if not (today - timedelta(days=7) <= date <= today + timedelta(days=7)):  # vérifie si la date demandée est en dehors de la plage autorisée
        return JsonResponse({"error": "Date must be within 7 days from today"}, status=400)
    

    # Requête à WeatherAPI
    API_KEY = 'de5ea590b1a3424db79151652250808'
    url = f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={governorate},Tunisia&dt={date}"
    response = requests.get(url)

    if response.status_code != 200:
        return JsonResponse({"error": "Failed to fetch weather data"}, status=500)

    data = response.json()

        # Check if forecastday list exists and is not empty
    forecast_days = data.get("forecast", {}).get("forecastday", [])
    if not forecast_days:
        return JsonResponse({"error": "No weather data found for this date/state."}, status=404)

    day_data = forecast_days[0]
    
    # Simplifier la réponse
    simplified = {
    "location": data["location"]["name"],
    "date": data["forecast"]["forecastday"][0]["date"],
    "condition": data["forecast"]["forecastday"][0]["day"]["condition"]["text"],
    "temperature": {
        "min": data["forecast"]["forecastday"][0]["day"]["mintemp_c"],
        "max": data["forecast"]["forecastday"][0]["day"]["maxtemp_c"]
    },
    "humidity": data["forecast"]["forecastday"][0]["day"]["avghumidity"],
    "wind_speed": data["forecast"]["forecastday"][0]["day"]["maxwind_kph"]
}
#["forecastday"][0] est le jour saisi dans la requête

    return JsonResponse(simplified)


