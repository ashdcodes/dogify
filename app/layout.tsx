import './globals.css'

export const metadata = {
  title: 'Dog Identifier',
  description: 'Upload a dog image to get information about the breed',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  )
}