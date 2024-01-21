from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/process-image", methods=["POST"])
def process_image():
    data = request.get_json()
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
