"use client"

import { Play } from "lucide-react"

export default function ShowcaseVideos() {
  const videos = [
    {
      title: "Proceso de Carga Profesional",
      description: "Mirá cómo cargamos tu moto con el máximo cuidado",
      thumbnail: "/images/video-showcase-1.png",
      duration: "2:30",
      videoId: "dQw4w9WgXcQ", // YouTube video ID
    },
    {
      title: "Seguridad en el Transporte",
      description: "Sistema de sujeción especializado para motocicletas",
      thumbnail: "/images/video-showcase-2.png",
      duration: "1:45",
      videoId: "dQw4w9WgXcQ",
    },
    {
      title: "Testimonios de Clientes",
      description: "Experiencias reales de nuestros clientes satisfechos",
      thumbnail: "/images/video-showcase-3.png",
      duration: "3:15",
      videoId: "dQw4w9WgXcQ",
    },
    {
      title: "Seguimiento GPS en Tiempo Real",
      description: "Tecnología avanzada para monitorear tu envío",
      thumbnail: "/images/video-showcase-4.png",
      duration: "1:20",
      videoId: "dQw4w9WgXcQ",
    },
  ]

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas font-black text-white mb-6">
            NUESTRO SERVICIO <span className="text-yellow-400">EN ACCIÓN</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubrí cómo trabajamos y por qué miles de motociclistas confían en nosotros
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="stagger-item cursor-pointer" onClick={() => handleVideoClick(video.videoId)}>
              <div className="video-overlay elegant-hover">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-64 object-cover"
                />

                <div className="play-button">
                  <Play className="w-8 h-8 text-black ml-1" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-2">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-lg leading-tight">{video.title}</h3>
                      <span className="text-yellow-400 text-sm font-medium bg-yellow-400/20 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{video.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">¿Querés ver más contenido?</p>
          <button
            onClick={() => window.open("https://www.youtube.com/@mototransfer", "_blank")}
            className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all duration-300 elegant-hover"
          >
            VER CANAL DE YOUTUBE
          </button>
        </div>
      </div>
    </section>
  )
}
