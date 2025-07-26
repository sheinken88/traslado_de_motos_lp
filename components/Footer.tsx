import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Logo />
            <p className="text-gray-400 mt-4 max-w-md">
              Transportamos tu motocicleta de forma segura por toda Argentina. Más de 5 años de experiencia respaldando
              las aventuras de miles de motociclistas.
            </p>

            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-yellow-400 mr-3" />
                <span className="text-gray-400">+54 9 11 1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-yellow-400 mr-3" />
                <span className="text-gray-400">info@mototransfer.com.ar</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-yellow-400 mr-3" />
                <span className="text-gray-400">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces</h3>
            <div className="space-y-2">
              <a href="#inicio" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Inicio
              </a>
              <a href="#como-funciona" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Cómo Funciona
              </a>
              <a href="#servicios" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Servicios
              </a>
              <a href="#destinos" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Destinos
              </a>
              <a href="#cotizacion" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Cotización
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MotoTransfer. Todos los derechos reservados.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
