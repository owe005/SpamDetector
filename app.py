from flask import Flask, render_template, request, jsonify
import os
from main import get_response, convert_to_text

app = Flask(__name__)

PICTURE_FOLDER = 'pictures'
app.config['UPLOAD_FOLDER'] = PICTURE_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB limit

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}  # Allowed image extensions

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', analysis=None)

@app.route('/analyze-text', methods=['POST'])
def analyze_text():
    text = request.form.get('text')
    analysis = get_response(text)
    return render_template('index.html', analysis=analysis)

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'file' not in request.files:
        return jsonify({'error': 'Invalid image format.'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        text_from_image = convert_to_text(filepath)
        analysis = get_response(text_from_image)
        
        # Clean up: Remove the saved image after processing
        os.remove(filepath)
        
        return render_template('index.html', analysis=analysis)

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)