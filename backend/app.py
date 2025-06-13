# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PIL import Image
import torch

# Custom module imports
from model_loader import load_model, predict_damage
from myutils import get_description_and_cost  # <- updated import

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load your damage classification model once
model = load_model()

# Load YOLOv5 model once
yolo_model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

def is_car_image(image_path):
    img = Image.open(image_path)
    results = yolo_model(img)
    detections = results.pandas().xyxy[0]

    return 'car' in detections['name'].values

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Vehicle Damage Assessment API is running.'})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Save image
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        # Verify if it's a car image
        if not is_car_image(filepath):
            return jsonify({'error': 'Upload a car image please!'}), 400

        # Predict damage
        damage_type = predict_damage(model, filepath)

        # Fetch description and cost
        description, cost = get_description_and_cost(damage_type)

        return jsonify({
            'damage_type': damage_type,
            'description': description,
            'estimated_cost': cost
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
