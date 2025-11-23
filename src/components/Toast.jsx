import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
    const { toast, hideToast } = useCart();
    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (toast.show) {
            setIsVisible(true);
            setProgress(100);
            const duration = 3000; // 3 seconds
            const interval = 10;
            const step = 100 / (duration / interval);

            const timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - step;
                });
            }, interval);

            const closeTimer = setTimeout(() => {
                setIsVisible(false);
                // Wait for animation to finish before removing from DOM
                setTimeout(hideToast, 300);
            }, duration);

            return () => {
                clearInterval(timer);
                clearTimeout(closeTimer);
            };
        }
    }, [toast.show, hideToast]);

    if (!toast.show && !isVisible) return null;

    return (
        <div className={`fixed top-24 right-4 md:right-8 z-[80] transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="bg-primary text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 relative overflow-hidden min-w-[320px] border border-white/10 backdrop-blur-sm">
                <div className="bg-green-500/20 p-2 rounded-full animate-pulse">
                    <CheckCircle size={24} className="text-green-400" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-lg leading-tight mb-1">¡Producto Agregado!</h4>
                    <p className="text-xs text-gray-300">{toast.message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(hideToast, 300);
                    }}
                    className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-black/20 w-full">
                    <div
                        className="h-full bg-accent transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Toast;
