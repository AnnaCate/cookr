import React from 'react'
import { useDropzone } from 'react-dropzone'
import { FaRegImage } from 'react-icons/fa'
import { Image } from '../../types'

export function Dropzone(props: { setUploadedImage: (image: Image) => void }) {
  const [images, setImages] = React.useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.heic', '.heif', '.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: any[]) => {
      setImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      props.setUploadedImage(acceptedFiles[0])
    },
  })

  const thumbs = images.map((image) => (
    <div className="inline-flex rounded-sm w-24 h-24 p-2" key={image.name}>
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={image.preview}
          className="block w-auto h-full"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(image.preview)
          }}
        />
      </div>
    </div>
  ))

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview))
  }, [])

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>
          <FaRegImage className="inline-block mr-2" /> Upload an image
        </p>
      </div>
      <aside className="flex flex-row flex-wrap mt-4">{thumbs}</aside>
    </>
  )
}
