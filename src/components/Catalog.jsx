import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { client, urlFor } from '../sanityClient';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = '*[_type == "product"]';
                const sanityProducts = await client.fetch(query);

                const formattedProducts = sanityProducts.map(product => ({
                    id: product._id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    description: product.description,
                    image: product.image ? urlFor(product.image).width(800).url() : '',
                    originalImage: product.image // Keep original for modal if needed
                }));

                setProducts(formattedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Get unique categories from products
    const categories = ["Todos", ...new Set(products.map(p => p.category))];

    const filteredProducts = activeCategory === "Todos"
        ? products
        : products.filter(product => product.category === activeCategory);

    if (loading) {
        return (
            <section id="catalogo" className="py-20 bg-background flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </section>
        );
    }

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
