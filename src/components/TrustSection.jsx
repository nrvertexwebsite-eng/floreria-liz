import { Store, Flower2, MessageCircleHeart } from 'lucide-react';

const TrustSection = () => {
    const features = [
        {
            icon: <Store size={32} strokeWidth={1.5} />,
            title: "35 Años en el Barrio",
            text: "Tu florería de confianza en Cuenca 3047."
        },
        {
            icon: <Flower2 size={32} strokeWidth={1.5} />,
            title: "Garantía de Frescura",
            text: "Seleccionamos las mejores flores cada mañana."
        },
        {
            icon: <MessageCircleHeart size={32} strokeWidth={1.5} />,
            title: "Atención Artesanal",
            text: "Te asesoramos personalmente en cada pedido."
        }
    ];

    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-secondary/10 transition-colors duration-300">
                            <div className="mb-4 text-primary p-4 bg-secondary/20 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-serif text-xl font-bold text-primary mb-2">{feature.title}</h3>
                            <p className="text-gray-600 font-light">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
