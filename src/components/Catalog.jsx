import { useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';

const Catalog = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const filteredProducts = activeCategory === "Todos"
        ? products
        : products.filter(product => product.category === activeCategory);

    return (
        <section id="catalogo" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Explora Nuestras Creaciones</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Cada arreglo es una obra única. Selecciona tus favoritos y consúltanos por WhatsApp.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? 'bg-primary text-white shadow-md transform scale-105'
                                : 'bg-white text-gray-600 hover:bg-secondary/20 hover:text-primary border border-gray-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Catalog;
