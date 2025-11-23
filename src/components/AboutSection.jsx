const AboutSection = () => {
    return (
        <section id="nosotros" className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2000&auto=format&fit=crop"
                                alt="Florista trabajando"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
                            Más que flores, entregamos emociones.
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                En <span className="font-bold text-primary">Florería Liz</span>, creemos que un ramo no es solo un objeto, es un mensaje.
                                Durante más de 35 años en el corazón de Villa del Parque, hemos sido cómplices de tus "te quiero",
                                tus "perdón" y tus celebraciones más importantes.
                            </p>
                            <p>
                                Mantenemos viva la tradición de la florería de barrio, combinándola con la facilidad de elegir
                                desde tu celular. Cada tallo es seleccionado a mano cada mañana para asegurar que tu gesto perdure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
