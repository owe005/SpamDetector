from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])

def index():
    analysis = None

    return render_template('index.html', analysis=analysis)

def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'Invalid image format.'}), 400
    
    return jsonify({'message': 'Image uploaded successfully.'})

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'} # For now, only allow these file extensions
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run(debug=True)
