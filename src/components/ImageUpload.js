import axios from 'axios'
import React from 'react'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL

function ImageUpload( { value, uploadPreset, onChange, name, labelText  = 'Upload Image' }) {

  const handleUpload = async (event) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange(res.data.url, name)
  }

  return (
    <div className="image-upload-container">
      <p className="label">{labelText}</p>
      {value && (
        <div className="image-preview">
          <img
            src={value}
            alt="selected"
            className="image-preview"
          />
          {/* <button onClick={handleRemoveImage}>Changed your mind?</button> */}
        </div>
      )}
      {!value && (
        <>
          <label className="file-label" htmlFor="file">Choose a file...</label>
          <input 
            className="file-input"
            type="file"
            id="file"
            name={name}
            onChange={handleUpload}
          />
        </>
      )
      }
    </div>

  )
}

export default ImageUpload