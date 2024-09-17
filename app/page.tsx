'use client'

import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import DogInfo from './components/DogInfo'

export default function Home() {
  const [dogInfo, setDogInfo] = useState(null)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Dog Breed Identifier</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <ImageUpload setDogInfo={setDogInfo} />
          {dogInfo && <DogInfo info={dogInfo} />}
        </div>
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 Dog Breed Identifier. All rights reserved.
        </div>
      </footer>
    </div>
  )
}