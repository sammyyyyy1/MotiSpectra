from .predict_emotion import get_prediction as pem
from .predict_engagement import get_prediction as pen

# import predict_emotion
# import predict_engagement

def predict(cv2_image):
    response = {
        "analysis_emotion": pem(cv2_image),
        "analysis_engagement": pen(cv2_image)
    }
    return response


if __name__ == '__main__':
    quit(-1)
    # image_path = 'bored.jpg'
    # cv2_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    # response = predict(cv2_image)
    # print(json.dumps(response, indent=4))