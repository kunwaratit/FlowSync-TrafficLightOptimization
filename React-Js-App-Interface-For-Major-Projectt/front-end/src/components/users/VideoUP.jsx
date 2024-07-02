import React, { useState } from 'react';
import axios from 'axios';

function VideoUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [videoURL, setVideoURL] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('video', selectedFile);

        try {
            console.log('Form data:', formData);
            const response = await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setVideoURL(response.data.video);
        } catch (error) {
            console.error('There was an error uploading the video!', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {videoURL && <video src={`http://localhost:8000/${videoURL}`} controls />}
        </div>
    );
}

export default VideoUpload;
