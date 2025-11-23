import { MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand & Contact */}
                    <div>
                        <h3 className="font-serif text-2xl font-bold mb-6">Florería Liz</h3>
                        <div className="space-y-4 text-gray-300">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="mt-1 flex-shrink-0" />
                                <p>Cuenca 3047, Villa del Parque,<br />CABA, Argentina</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={20} />
                                <p>Todos los días de 10:00 a 21:00 hs</p>
                            </div>
                            <a href="https://wa.me/5491172383806" className="flex items-center gap-3 hover:text-white transition-colors">
                                <Phone size={20} />
                                <p>+54 9 11 7238-3806</p>
                            </a>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-bold mb-6">Enlaces Rápidos</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li><a href="#hero" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a></li>
                            <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
                            <li><a href="#faq" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="h-64 rounded-xl overflow-hidden bg-gray-800">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0982634196093!2d-58.4975172253336!3d-34.601676657388566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb7f065a451eb%3A0x7ab29f79bdf5dfc5!2sFlorer%C3%ADa%20Liz%20-%20Villa%20del%20Parque!5e0!3m2!1ses-419!2sar!4v1763930876847!5m2!1ses-419!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Florería Liz"
                        ></iframe>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Florería Liz. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
