# backend/model_loader.py
import tensorflow as tf
import numpy as np
from PIL import Image

def load_model():
    """
    Load the pre-trained model for vehicle damage detection
    """
    try:
        # For now, we'll use a placeholder model
        # In production, you should load your actual trained model here
        model = tf.keras.Sequential([
            tf.keras.layers.Conv2D(32, 3, activation='relu', input_shape=(224, 224, 3)),
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(4, activation='softmax')  # Assuming 4 damage types
        ])
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise

def preprocess_image(image_path):
    """
    Preprocess the image for model input
    """
    try:
        img = Image.open(image_path).convert('RGB')  # Ensures 3 channels
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)  # (1, 224, 224, 3)
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {str(e)}")
        raise


def predict_damage(model, image_path):
    """
    Predict the type of damage in the image
    """
    try:
        # Preprocess the image
        processed_image = preprocess_image(image_path)
        
        # Make prediction
        predictions = model.predict(processed_image)
        
        # Map predictions to damage types
        damage_types = ['minor_dent', 'major_dent', 'scratch', 'broken']
        predicted_class = damage_types[np.argmax(predictions[0])]
        
        return predicted_class
    except Exception as e:
        print(f"Error making prediction: {str(e)}")
        raise
