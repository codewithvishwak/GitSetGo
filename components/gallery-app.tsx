"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface GalleryAppProps {
  theme: "light" | "dark" | "neon"
}

const galleryImages = [
  {
    id: 1,
    title: "Mountain Landscape",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Ocean Sunset",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Forest Path",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "City Skyline",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Desert Dunes",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Tropical Beach",
    url: "/placeholder.svg?height=200&width=300",
  },
]

export function GalleryApp({ theme }: GalleryAppProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      imageBg: "bg-gray-100",
      hover: "hover:bg-gray-50",
      overlay: "bg-black/50",
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-white",
      imageBg: "bg-gray-700",
      hover: "hover:bg-gray-600",
      overlay: "bg-black/70",
    },
    neon: {
      bg: "bg-purple-900",
      text: "text-cyan-300",
      imageBg: "bg-purple-800/50",
      hover: "hover:bg-purple-700/50",
      overlay: "bg-purple-900/80",
    },
  }

  const styles = themeStyles[theme]

  return (
    <div className={`h-full ${styles.bg} ${styles.text} rounded-lg overflow-hidden`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium">Photo Gallery</h3>
        <p className="text-sm opacity-70 mt-1">{galleryImages.length} photos</p>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative group cursor-pointer rounded-lg overflow-hidden
                ${styles.imageBg} ${styles.hover}
                transition-all duration-200
              `}
              onClick={() => setSelectedImage(image.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className={`
                  absolute inset-0 ${styles.overlay} opacity-0 group-hover:opacity-100
                  transition-opacity duration-200 flex items-center justify-center
                `}
                >
                  <span className="text-white text-sm font-medium">{image.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const image = galleryImages.find((img) => img.id === selectedImage)
              return image ? (
                <div className="relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 rounded-b-lg">
                    <h4 className="font-medium">{image.title}</h4>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : null
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
