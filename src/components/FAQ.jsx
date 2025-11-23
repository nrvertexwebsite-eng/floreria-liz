import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const faqs = [
        {
            question: "¿Cómo funciona la compra?",
            answer: "Es muy fácil. Eliges los ramos que te gustan aquí en el catálogo, los añades a tu selección y nos envías la consulta directa por WhatsApp. Allí te confirmamos disponibilidad, precio final y coordinamos el envío."
        },
        {
            question: "¿Hacen envíos a domicilio?",
            answer: "Sí, hacemos envíos rápidos en Villa del Parque y zonas aledañas de CABA. Consúltanos por tu zona específica al realizar el pedido."
        },
        {
            question: "¿Las flores son frescas?",
            answer: "Absolutamente. Es nuestra garantía desde hace 35 años. Seleccionamos personalmente las flores en el mercado cada mañana."
        },
        {
            question: "¿Con cuánto tiempo de anticipación debo pedir?",
            answer: "Para ramos sencillos, podemos prepararlos en el día. Para arreglos especiales o eventos, recomendamos al menos 48 horas de anticipación."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">¿Tienes dudas? Aquí te ayudamos</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-medium text-primary text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-primary" size={20} />
                                ) : (
                                    <ChevronDown className="text-gray-400" size={20} />
                                )}
                            </button>
                            <div
                                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
