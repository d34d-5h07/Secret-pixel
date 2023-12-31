from flask import Flask, request, send_file, render_template
from stegano import lsb 
import io
from PIL import Image , UnidentifiedImageError

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/encode', methods=['POST'])
def encode():
    try:
        file = request.files['image']
        text = request.form['text']
        image = Image.open(file.stream)
        secret = lsb.hide(image, text)
        img_io = io.BytesIO()
        secret.save(img_io, 'PNG')
        img_io.seek(0)

        return send_file(img_io, as_attachment=True, mimetype='image/png', download_name='encoded_image.png')

    except UnidentifiedImageError:
        return "The file uploaded is not a valid image."
    except Exception as e:
        return "An error occurred"

@app.route('/decode', methods=['POST'])
def decode():
    try:
        file = request.files['image']
        image = Image.open(file.stream)
        return lsb.reveal(image)
    except Exception as e:
        return "No Hidden message found"

if __name__ == '__main__':
    app.run(debug=True)
