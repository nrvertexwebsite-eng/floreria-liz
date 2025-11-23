import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-primary">
                <img
                    src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=2000&auto=format&fit=crop"
                    alt="Fondo de flores"
                    className="w-full h-full object-cover opacity-80"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl">
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                    Artesanía Floral en <br />
                    <span className="text-secondary-light italic">Villa del Parque</span>
                </h1>

                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light text-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Donde cada detalle florece desde hace 35 años. Elige tus favoritos en nuestro catálogo y finaliza tu pedido por WhatsApp con atención personalizada.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="#catalogo"
                        className="group bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        VER CATÁLOGO AHORA
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
