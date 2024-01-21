from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import cv2
import numpy as np
import time
import base64
from server.scripts import predict
from multiprocessing import Process, Queue, Pool
from threading import Thread
import asyncio
import psutil
import concurrent.futures
import threading
from functools import partial


app = Flask(__name__)
detector = cv2.FaceDetectorYN.create("face_detection_yunet_2023mar.onnx", "", (720, 720), 0.55, 0.5)
core = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

batch_lock = threading.Lock()

currently_processing_something = False
have_something_to_send = False
result_queue = Queue()


@app.route("/")
@cross_origin()
def index():
    return "Hello, World!"

@app.route("/process-image", methods=["POST"])
@cross_origin()
def process_image():
    global result_queue, have_something_to_send
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
    result_dict = {'analysis_emotion': None,
                  'analysis_engagement': None}
    print("req")

    if (detections[1] is not None) and (len(detections[1]) > 0):
        # print("Detections: ", detections[1])
        evaluate_emotions_parallel(img, detections)
        # print("Contiue on with life")
                # results = list(executor.map(generate_results, detections))

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
    if have_something_to_send:
        print("WE ARE SENDING NEW THINGS")
        while not result_queue.empty():
            for key, value in result_queue.get().items():
                if key in result_dict and isinstance(result_dict[key], list):
                    result_dict[key].append(value)
                else:
                    result_dict[key] = [value]
        have_something_to_send = False
        result_queue = Queue()

    result = {'boxes': boxes,
              'landmarks': landmarks}
    result.update(result_dict)
    inf_time = round(time.time() - t0, 3)
    fps = round(1 / inf_time, 2)
    # print(inf_time, fps)
    return jsonify(result)


def evaluate_emotions_parallel(img, detections):
    global currently_processing_something
    if currently_processing_something:
        return
    currently_processing_something = True
    print("Starting side process")

    Thread(target=generate_results, args=(detections[1], img)).start()
    # pool.join()
    # with batch_lock:
    #     with concurrent.futures.ThreadPoolExecutor() as executor:
    #         partial_generate_results = partial(generate_results, img_bytes=img, result_queue=result_queue)
    #         results = list(executor.map(partial_generate_results, detections[1]))

def generate_results(detections, img_bytes):
    print("######             GENERATE RESULTS START")
    start_time = time.time()
    global currently_processing_something, result_queue, have_something_to_send
    for detection in detections:
        pred_bbox = [int(i) for i in detection[:4]]
        increase1 = 1.4
        biggest_dim1 = max(pred_bbox[2], pred_bbox[3]) * increase1
        new_x1 = pred_bbox[0] - ((biggest_dim1 - pred_bbox[2]) / 2)
        new_y1 = pred_bbox[1] - ((biggest_dim1 - pred_bbox[3]) / 2)
        # Convert bytes to NumPy array
        img_array = np.frombuffer(img_bytes, dtype=np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Convert the coordinates to integers
        x1, y1, x2, y2 = map(int, [new_x1, new_y1, pred_bbox[0] + biggest_dim1, pred_bbox[1] + biggest_dim1])

        # Ensure the indices are within bounds
        x1, y1 = max(0, x1), max(0, y1)
        x2, y2 = min(img.shape[1], x2), min(img.shape[0], y2)

        richard_img1 = img[y1:y2, x1:x2]

        richard_img = cv2.resize(richard_img1, (48, 48))
        richard_img = cv2.cvtColor(richard_img, cv2.COLOR_BGR2GRAY)
        richard_img = richard_img.flatten()
        richard_img = richard_img.reshape((1, 48, 48, 1))
        print("######             WOKRING")
        run_predict_models(richard_img)
    currently_processing_something = False
    have_something_to_send = True
    total_time = round(time.time() - start_time, 3)
    print("######             GENERATE RESULTS END")
    print(total_time)


def run_predict_models(img):
    global result_queue
    response_dict = predict.predict(img)
    result_queue.put(response_dict)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')

