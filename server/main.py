from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import cv2
import numpy as np
import time
import base64

app = Flask(__name__)
detector = cv2.FaceDetectorYN.create("face_detection_yunet_2023mar.onnx", "", (720, 720), 0.55, 0.5)
core = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def index():
    return "Hello, World!"

@app.route("/process-image", methods=["POST"])
@cross_origin()
def process_image():
    data = request.get_json()
    # print(data["image"][:40])
    b64_img = data["image"][22:]
    img = base64.b64decode(b64_img)
    frame = cv2.imdecode(np.frombuffer(img, dtype=np.uint8), -1)
    img_W = int(frame.shape[1])
    img_H = int(frame.shape[0])
    t0 = time.time()
    detector.setInputSize((img_W, img_H))
    detections = detector.detect(frame)

    boxes = []
    landmarks = []
    if (detections[1] is not None) and (len(detections[1]) > 0):
        for detection in detections[1]:
            pred_bbox = [int(i) for i in detection[:4]]
            increase1 = 1.4
            biggest_dim1 = max(pred_bbox[2], pred_bbox[3]) * increase1
            new_x1 = pred_bbox[0] - ((biggest_dim1 - pred_bbox[2]) / 2)
            new_y1 = pred_bbox[1] - ((biggest_dim1 - pred_bbox[3]) / 2)
            cv2.rectangle(frame, (int(new_x1), int(new_y1)), (int(biggest_dim1 + new_x1), int(biggest_dim1 + new_y1)),
                          (255, 255, 0), 2)
            # increase2 = 1.2
            # biggest_dim2 = max(pred_bbox[2], pred_bbox[3]) * increase2
            # new_x2 = pred_bbox[0] - ((biggest_dim2 - pred_bbox[2]) / 2)
            # new_y2 = pred_bbox[1] - ((biggest_dim2 - pred_bbox[3]) / 2)
            # cv2.rectangle(frame, (int(new_x2), int(new_y2)), (int(biggest_dim2 + new_x2), int(biggest_dim2 + new_y2)),
            #               (0, 0, 255), 2)

        boxes = [[[int(array[0]) / img_W, int(array[1]) / img_H], [int(array[2]) / img_W, int(array[3]) / img_H]] for array in
                 detections[1]]
        landmarks = [
            [
                [int(array[4]) / img_W, int(array[5]) / img_H],
                [int(array[6]) / img_W, int(array[7]) / img_H],
                [int(array[8]) / img_W, int(array[9]) / img_H],
                [int(array[10]) / img_W, int(array[11]) / img_H],
                [int(array[12]) / img_W, int(array[13]) / img_H]
            ] for array in detections[1]
        ]

    analysis_emotion = []
    analysis_engagement = []

    result = {
        'boxes': boxes,
        'landmarks': landmarks,
        'analysis_emotion': None if not analysis_emotion else {
            'label': analysis_emotion.get('label', None),
            'predictions': analysis_emotion.get('predictions', None)
        },
        'analysis_engagement': None if not analysis_engagement else {
            'label': analysis_engagement.get('label', None),
            'predictions': analysis_engagement.get('predictions', None)
        }
    }
    inf_time = round(time.time() - t0, 3)
    fps = round(1 / inf_time, 2)
    print(inf_time, fps)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')

