import concurrent.futures
import time
from your_emotion_detection_module import evaluate_emotion  # Replace with your actual emotion detection module/function

def evaluate_emotions_parallel(images):
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as executor:
        # Map the evaluation function to each image in parallel
        futures = {executor.submit(evaluate_emotion, image): image for image in images}
        for future in concurrent.futures.as_completed(futures):
            image = futures[future]
            try:
                result = future.result()
                results.append((image, result))
            except Exception as e:
                print(f"Error processing image {image}: {e}")
    return results

if __name__ == "__main__":
    # Replace this list with your actual list of images
    image_list = ["image1.jpg", "image2.jpg", "image3.jpg", ...]

    start_time = time.time()
    results = evaluate_emotions_parallel(image_list)
    end_time = time.time()

    for image, result in results:
        print(f"Emotion for {image}: {result}")

    print(f"Total time taken: {end_time - start_time} seconds")
