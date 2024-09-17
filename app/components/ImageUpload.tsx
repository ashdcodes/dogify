import { useState } from 'react'
import { identifyDog } from '../lib/gemini'

export default function ImageUpload({ setDogInfo }) {
  const [image, setImage] = useState(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setStatus('Analyzing image...')
      setError('')
      setImage(URL.createObjectURL(file))

      try {
        const info = await identifyDog(file)

        if (info.error) {
          setError(info.error)
          setDogInfo(null)
        } else {
          setStatus('Dog identified successfully!')
          setDogInfo(info)
        }
      } catch (error) {
        setError(`Error: ${error.message}`)
        setDogInfo(null)
      } finally {
        setTimeout(() => setStatus(''), 3000)
      }
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>
      </div>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded dog" className="max-w-full h-auto rounded-lg mx-auto" />
        </div>
      )}
      {status && <p className="mt-4 text-center text-blue-600">{status}</p>}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
    </div>
  )
}