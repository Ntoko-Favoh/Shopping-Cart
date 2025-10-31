from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

def index(request):
    # Products list (same as your static file)
    products = [
        { 'id': 1, 'name': 'Fresh Apples', 'price': 3.99, 'emoji': '🍎' },
        { 'id': 2, 'name': 'Ripe Bananas', 'price': 2.49, 'emoji': '🍌' },
        { 'id': 3, 'name': 'Organic Carrots', 'price': 1.99, 'emoji': '🥕' },
        { 'id': 4, 'name': 'Fresh Bread', 'price': 4.50, 'emoji': '🍞' },
        { 'id': 5, 'name': 'Premium Cheese', 'price': 8.99, 'emoji': '🧀' },
        { 'id': 6, 'name': 'Farm Eggs', 'price': 5.49, 'emoji': '🥚' },
        { 'id': 7, 'name': 'Whole Milk', 'price': 3.79, 'emoji': '🥛' },
        { 'id': 8, 'name': 'Ripe Tomatoes', 'price': 4.29, 'emoji': '🍅' },
        { 'id': 9, 'name': 'Fresh Salmon', 'price': 12.99, 'emoji': '🐟' },
        { 'id': 10, 'name': 'Chicken Breast', 'price': 9.99, 'emoji': '🍗' }
    ]
    # Pass Python list directly. We'll use json_script in the template for safety.
    return render(request, 'index.html', {'products': products})
