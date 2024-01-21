import cv2
import json
import predict_engagement as pen
import predict_emotion as pem

def predict(cv2_image):
    response = {
        "analysis_emotion": pem.get_prediction(cv2_image),
        "analysis_engagement": pen.get_prediction(cv2_image)
    }
    return response

if __name__ == '__main__':
    quit(-1)
    # image_path = 'bored.jpg'
    # cv2_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    # response = predict(cv2_image)
    # print(json.dumps(response, indent=4))