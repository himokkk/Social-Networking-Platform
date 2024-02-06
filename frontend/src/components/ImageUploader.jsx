import React, { useState, useRef } from 'react';
import { apiCall } from "../functions/apiCall";
import { API_BASE_URL } from "../urls";

function ImageUploader() {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const createPost = async () => {
        console.log(selectedImage)
        
        if (fileInputRef.current) {
            let response = null;
            try {
                response = await apiCall(API_BASE_URL + "/posts/create", "POST", JSON.stringify({
                    content: "file",
                    media: selectedImage,
                    privacy: 1
                }));
                console.log(response);
            } catch (error) {
                console.log("Error awaiting post: ", error);
            }
        }
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleChooseImageClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = () => {
        if (!selectedImage) {
            console.log("Please choose an image first.");
            console.log(fileInputRef.current)
            return;
        }
        createPost();
    };

    return (
        <div>
            <input
                type="file"
                name="image_url"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => handleImageChange(e)}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <button onClick={handleChooseImageClick}>Choose Image</button>
            <button onClick={handleUpload}>Upload</button>
            {selectedImage && (
                <div>
                    <h2>Selected Image:</h2>
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
        </div>
    );
}

export default ImageUploader;
