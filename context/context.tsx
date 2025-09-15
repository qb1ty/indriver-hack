import { createContext, useState, ReactNode, useContext } from "react"

export type PhotoKeys =
  | "personal"
  | "license"
  | "selfie"
  | "carFront"
  | "carBack"
  | "carSide"
  | "carInterior"

type Context = {
  photos: Record<PhotoKeys, string | null>
  setPhoto: (key: PhotoKeys, uri: string | null) => void
  resetPhoto: (key: PhotoKeys) => void
}

// Контекст
export const PhotoContext = createContext<Context>({
  photos: {
    personal: null,
    license: null,
    selfie: null,
    carFront: null,
    carBack: null,
    carSide: null,
    carInterior: null
  },
  setPhoto: () => {},
  resetPhoto: () => {}
})

// Провайдер
export const Provider = ({ children }: { children: ReactNode }) => {
  const [photos, setPhotos] = useState<Record<PhotoKeys, string | null>>({
    personal: null,
    license: null,
    selfie: null,
    carFront: null,
    carBack: null,
    carSide: null,
    carInterior: null,
  })

  const setPhoto = (key: PhotoKeys, uri: string | null) => {
    setPhotos(prev => ({ ...prev, [key]: uri }))
  }

  const resetPhoto = (key: PhotoKeys) => {
    setPhotos(prev => ({ ...prev, [key]: null }))
  }

  return (
    <PhotoContext.Provider value={{ photos, setPhoto, resetPhoto }}>
      {children}
    </PhotoContext.Provider>
  )
}

export const usePhotos = () => useContext(PhotoContext)
