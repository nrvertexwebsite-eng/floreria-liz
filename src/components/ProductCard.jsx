import { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 group flex flex-col h-full">
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>

                    {/* Quick View Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white/90 text-primary px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye size={18} />
                            Ver detalles
                        </button>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-2">
                        <span className="text-xs font-bold tracking-wider text-primary/70 uppercase">{product.category}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2 cursor-pointer hover:text-primary-dark transition-colors" onClick={() => setIsModalOpen(true)}>
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>

                    <p className="text-lg font-semibold text-dark mb-4">${product.price.toLocaleString()}</p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-secondary/30 hover:bg-primary hover:text-white text-primary font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            <span>Añadir</span>
                            <ShoppingBag size={18} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                addToCart={addToCart}
            />
        </>
    );
};

export default ProductCard;
