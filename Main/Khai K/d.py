import subprocess

ffmpeg_path = 'C:/ffmpeg/ffmpeg.exe'  # Replace with the actual path to ffmpeg.exe

try:
    # Execute the ffmpeg command to get its version
    ffmpeg_version = subprocess.check_output([ffmpeg_path, '-version']).decode('utf-8')
    print("FFmpeg version:", ffmpeg_version.split('\n')[0])
except FileNotFoundError:
    print("Error: FFmpeg executable not found at:", ffmpeg_path)
