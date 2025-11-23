import { Star } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Juan Pérez",
            text: "Excelente atención, el ramo llegó impecable y a tiempo. ¡Mi esposa quedó encantada!",
            stars: 5
        },
        {
            name: "María González",
            text: "Las flores más frescas del barrio. Siempre compro aquí para los cumpleaños de la familia.",
            stars: 5
        },
        {
            name: "Sofía Rodríguez",
            text: "Me asesoraron muy bien para mi ramo de novia. Quedó soñado. ¡Gracias Liz!",
            stars: 5
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Lo que dicen nuestros vecinos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-background p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex gap-1 mb-4 text-accent">
                                {[...Array(review.stars)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                            <p className="font-bold text-primary font-serif">- {review.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
