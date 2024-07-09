import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoPlayer = () => {
    const [streaming, setStreaming] = useState(false);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/a/list_videos/')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('Error fetching video list:', error);
            });
    }, []);

    const handleVideoChange = (event) => {
        setSelectedVideo(event.target.value);
    };

    const handleStartStream = () => {
        axios.post('http://localhost:8000/a/select_video/', { video_name: selectedVideo }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Video selected:', response);
                setStreaming(true);
            })
            .catch(error => {
                console.error('Error selecting video:', error);
            });
    };

    const handleStopStream = () => {
        axios.get('http://localhost:8000/a/stop_stream/')
            .then(response => {
                console.log('Streaming stopped:', response);
                setStreaming(false);
            })
            .catch(error => {
                console.error('Error stopping stream:', error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Video Stream</h1>
                <select onChange={handleVideoChange} value={selectedVideo}>
                    <option value="">Select a video</option>
                    {videos.map(video => (
                        <option key={video} value={video}>{video}</option>
                    ))}
                </select>
                <button onClick={handleStartStream}>Start Stream</button>
                <button onClick={handleStopStream}>Stop Stream</button>
                <div>
                    {streaming ? (
                        <img src="http://localhost:8000/a/video_feed/" alt="Video Stream" />
                    ) : (
                        <img src="http://via.placeholder.com/640x480?text=No+Stream" alt="No Stream" />
                    )}
                </div>
            </header>
        </div>
    );
}

export default VideoPlayer;
