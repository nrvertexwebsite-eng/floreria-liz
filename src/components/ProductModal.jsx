import { X } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose, addToCart }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white text-gray-500 hover:text-primary transition-all z-10"
                >
                    <X size={24} />
                </button>

                {/* Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <span className="text-xs font-bold tracking-wider text-primary/70 uppercase mb-2">{product.category}</span>
                    <h2 className="font-serif text-3xl font-bold text-primary mb-4">{product.name}</h2>
                    <p className="text-xl font-semibold text-dark mb-6">${product.price.toLocaleString()}</p>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <button
                        onClick={() => {
                            addToCart(product);
                            onClose();
                        }}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
