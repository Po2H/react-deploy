from flask import Flask, jsonify, request, render_template
import pandas as pd
import numpy as np
import joblib
from flask_cors import CORS
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score


# Load data
db = pd.read_csv('cen_eat.csv')

# Load scaler
scaler = joblib.load("scaler.pkl")

# Extract features and target variable
X = db[['business_type', 'profit_margin']].copy()
y = db['district'].copy()

# Encode categorical features using One-Hot Encoding
X = pd.get_dummies(X, columns=['business_type'], prefix=['business_type'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=52)

# Standardize numerical features
X_train[['profit_margin']] = scaler.fit_transform(X_train[['profit_margin']])
X_test[['profit_margin']] = scaler.transform(X_test[['profit_margin']])

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Load the trained model
model = joblib.load('ml.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json()

        # Define the values for 'business_type' and 'profit_margin' for the test case
        new_business_type = data['business_type']
        new_profit_margin = data['profit_margin']

        # Create a new DataFrame with the input data for testing
        new_data = pd.DataFrame({'business_type': [new_business_type], 'profit_margin': [new_profit_margin]})

        # Ensure that new_data has the same columns as X_train with the correct order
        new_data = new_data.reindex(columns=X_train.columns, fill_value=0)

        # Standardize the 'profit_margin' column in new_data using the scaler
        new_data[['profit_margin']] = scaler.transform(new_data[['profit_margin']])

        # Make predictions with the model
        predicted_district = model.predict(new_data)

        # Return the prediction
        return jsonify({'prediction': predicted_district[0]})
    except Exception as e:
        return jsonify({'error': str(e), 'message': 'Error occurred during prediction'})

if __name__ == '__main__':
    app.run(debug=True)
