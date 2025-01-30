const IMAGE_KEY = 'image/*'

export const mapPictureFormatsToExtensions = (
  pictureFormats: string[],
): Record<typeof IMAGE_KEY, string[]> => {
  const pictureExtensions = pictureFormats.map((pictureFormat) =>
    extractPictureExtension(pictureFormat),
  )
  return {
    [IMAGE_KEY]: pictureExtensions,
  }
}

// image/png => .png
const extractPictureExtension = (picture: string) => {
  return `.${picture.split('/')[1]}`
}
