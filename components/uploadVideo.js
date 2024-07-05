// components/UploadVideo.js
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

const UploadVideo = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("video/") && selectedFile.size <= 400 * 1024 * 1024) {
            setFile(selectedFile);
        } else {
            alert("Please select a video file with a size up to 400MB");
            setFile(null);
        }
    };

    const handleUpload = () => {
        if (file) {
            const storageRef = ref(storage, `videos/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error("Upload failed", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setDownloadURL(downloadURL);
                    });
                }
            );
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            {file && (
                <button className="bg-gray-800 text-white ml-8 px-8 py-2 rounded-lg" onClick={handleUpload}>
                    Upload
                </button>
            )}
            {progress > 0 && <p>Uploading: {progress}%</p>}
            {downloadURL && (
                <div className="mt-4">
                    <p>Upload complete. Download URL:</p>
                    <a
                        href={downloadURL}
                        className="font-semibold mt-4 block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {downloadURL}
                    </a>
                </div>
            )}
        </div>
    );
};

export default UploadVideo;
