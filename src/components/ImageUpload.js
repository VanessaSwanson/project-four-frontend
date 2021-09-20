import axios from 'axios'
import React from 'react'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL

function ImageUpload( { value, uploadPreset, onChange, name, className, labelText  = 'Upload Image' }) {
  // const [srcValue, setSrcValue] = React.useState(value)

  const handleUpload = async (event) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange(res.data.url, name)
  }

  const handleRemovePreview = () => {
    onChange('', name)
  } 

  return (
    <div className="image-upload-container">
      <p className="label">{labelText}</p>
      {value && (
        <div className="image-preview">
          <div className="remove-preview-button">
            <button 
              type="button"
              onClick={handleRemovePreview}>
                x
            </button> 
          </div>
          <img
            src={value}
            alt="selected"
            className="preview"
          />
        </div>
      )}
      {!value && (
        <>
          <label className={className} htmlFor="file">Choose a file...</label>
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