from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://www.youtube.com"])


@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.json  
    print(data)
    #Python code to process the data - from separate file
    new_data = {"key":data[0][0]}

    return new_data


if __name__ == '__main__':
    app.run()
