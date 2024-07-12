import cv2

def capture_first_frame(video_path, output_path):
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    
    # Check if video opened successfully
    if not cap.isOpened():
        print("Error: Could not open video.")
        return
    
    # Read the first frame
    ret, frame = cap.read()
    
    # Check if frame read successfully
    if not ret:
        print("Error: Could not read frame.")
        cap.release()
        return
    
    # Save the frame as an image
    cv2.imwrite(output_path, frame)
    print(f"First frame saved to {output_path}")
    
    # Release the video capture object
    cap.release()

if __name__ == "__main__":
    # Replace with your video file path
    video_path = "/Users/manjitmagar/Downloads/IMG_0283.MOV"
    
    # Replace with the desired output image path
    output_path = "/Users/manjitmagar/Pictures/first.jpg"
    
    capture_first_frame(video_path, output_path)
