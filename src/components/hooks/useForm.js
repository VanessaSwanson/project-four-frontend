import React from 'react'

function useForm(intialFormState) {
  const [formData, setFormData] = React.useState(intialFormState)
  const [formErrors, setFormErrors] = React.useState(intialFormState)

  const handleUploadedImage = (imageUrl, fieldName) => {
    setFormData({ ...formData, [fieldName]: imageUrl })
  }

  const handleChange = (event) => {
    const updatedFormData = { ...formData, [event.target.name]: event.target.value }
    const updatedErrors = { ...formErrors, [event.target.name]: '' }
    setFormData(updatedFormData)
    setFormErrors(updatedErrors)
  }

  return {
    formData,
    handleUploadedImage,
    handleChange,
    setFormData,
    formErrors,
    setFormErrors,
  }
}

export default useForm