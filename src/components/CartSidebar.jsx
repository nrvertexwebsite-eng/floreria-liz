import { useState } from 'react';
import { X, Trash2, MessageCircle, MapPin, User, Crosshair, Send, CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sendOrderToDiscord } from '../config/discord';

const CartSidebar = () => {
    const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        address: ''
    });
    const [isLocating, setIsLocating] = useState(false);
    const [orderStatus, setOrderStatus] = useState({ sent: false, sending: false, error: false });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización.");
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();

                    if (data && data.display_name) {
                        setFormData(prev => ({
                            ...prev,
                            address: data.display_name
                        }));
                    } else {
                        setFormData(prev => ({
                            ...prev,
                            address: `${latitude}, ${longitude}`
                        }));
                    }
                } catch (error) {
                    setFormData(prev => ({
                        ...prev,
                        address: `${latitude}, ${longitude}`
                    }));
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error(error);
                alert("No pudimos obtener tu ubicación. Por favor verifica los permisos de tu navegador o ingrésala manualmente.");
                setIsLocating(false);
            }
        );
    };

    const handleDiscordCheckout = async () => {
        if (cartItems.length === 0) return;
        if (!formData.name || !formData.address) {
            alert("Por favor, completa tu nombre y dirección para continuar.");
            return;
        }

        setOrderStatus({ sent: false, sending: true, error: false });

        try {
            // Generar número de pedido único
            const orderNumber = `FLZ-${Date.now().toString().slice(-8)}`;

            const result = await sendOrderToDiscord({
                customerName: formData.name,
                customerAddress: formData.address,
                items: cartItems
            });

            if (result.success) {
                setOrderStatus({ sent: true, sending: false, error: false });

                // Generar boleta de pedido (texto simple que se puede imprimir)
                generateReceipt(orderNumber, formData.name, formData.address, cartItems);

                // Esperar 1 segundo y abrir WhatsApp con confirmación
                setTimeout(() => {
                    sendConfirmationToWhatsApp(orderNumber, formData.name, cartItems);
                }, 1000);

            } else {
                throw new Error('Error al enviar el pedido');
            }
        } catch (error) {
            console.error('Error:', error);
            setOrderStatus({ sent: false, sending: false, error: true });
            alert('Hubo un error al enviar el pedido. Por favor, intenta con WhatsApp.');
        }
    };

    const generateReceipt = (orderNumber, customerName, customerAddress, items) => {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const date = new Date().toLocaleDateString('es-AR');

        // Crear contenido de la boleta
        let receiptContent = `
════════════════════════════════
      FLORERÍA LIZ
   BOLETA DE PEDIDO
════════════════════════════════

Nº PEDIDO: ${orderNumber}
FECHA: ${date}

CLIENTE: ${customerName}
DIRECCIÓN: ${customerAddress}

────────────────────────────────
PRODUCTOS:
────────────────────────────────
`;

        items.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            receiptContent += `
${index + 1}. ${item.name}
   Cantidad: ${item.quantity}
   Precio: $${item.price.toLocaleString()}
   Subtotal: $${subtotal.toLocaleString()}
`;
        });

        receiptContent += `
────────────────────────────────
TOTAL: $${total.toLocaleString()}
────────────────────────────────

Gracias por tu compra!
Te contactaremos pronto para
confirmar disponibilidad y envío.

🌸 Florería Liz 🌸
════════════════════════════════
`;

        // Crear y descargar archivo de texto
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Boleta-${orderNumber}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const sendConfirmationToWhatsApp = (orderNumber, customerName, items) => {
        const phoneNumber = "5491172383806";
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        let message = `Hola! Acabo de realizar un pedido:\n\n`;
        message += `📋 *Nº PEDIDO:* ${orderNumber}\n`;
        message += `👤 *NOMBRE:* ${customerName}\n`;
        message += `💰 *TOTAL:* $${total.toLocaleString()}\n\n`;
        message += `Ya envié los detalles completos. ¿Podrían confirmar disponibilidad?`;

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleWhatsAppCheckout = () => {
        const phoneNumber = "5491172383806";

        if (cartItems.length === 0) return;
        if (!formData.name || !formData.address) {
            alert("Por favor, completa tu nombre y dirección para continuar.");
            return;
        }

        const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address)}`;

        let message = `*🌸 NUEVO PEDIDO WEB*\\n`;
        message += `*Cliente:* ${formData.name}\\n`;
        message += `*Dirección:* ${formData.address}\\n`;
        message += `*Mapa:* ${mapsLink}\\n\\n`;

        let total = 0;
        cartItems.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            message += `${index + 1}. ${item.name}\\n`;
            message += `Cant: ${item.quantity} x $${item.price.toLocaleString()}\\n\\n`;
        });

        message += `*TOTAL: $${total.toLocaleString()}*`;

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleContactWhatsApp = () => {
        const phoneNumber = "5491172383806";
        const message = `Hola, acabo de enviar un pedido desde la web. ¿Podrían asesorarme?`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
                    onClick={toggleCart}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-primary/5">
                        <h2 className="font-serif text-2xl font-bold text-primary">Tu Selección</h2>
                        <button
                            onClick={toggleCart}
                            className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-primary"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Success Message */}
                    {orderStatus.sent && (
                        <div className="bg-green-50 border-b border-green-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="text-green-600" size={32} />
                                <div>
                                    <h3 className="font-bold text-green-800 text-lg">¡Pedido Enviado!</h3>
                                    <p className="text-green-700 text-sm">Se descargó tu boleta y se abrió WhatsApp automáticamente.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                                <MessageCircle size={48} className="mb-4 opacity-20" />
                                <p className="text-lg font-medium">Tu selección está vacía</p>
                                <p className="text-sm mt-2">Explora el catálogo para añadir flores.</p>
                                <button
                                    onClick={toggleCart}
                                    className="mt-6 text-primary font-medium hover:underline"
                                >
                                    Volver al catálogo
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-start animate-fade-in-up">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-serif font-bold text-primary text-sm mb-1">{item.name}</h3>
                                                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                                    </div>
                                                    <p className="font-semibold text-sm text-primary">${(item.price * item.quantity).toLocaleString()}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-2 py-1 text-gray-500 hover:text-primary transition-colors"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-2 text-sm font-medium text-dark min-w-[1.5rem] text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-2 py-1 text-gray-500 hover:text-primary transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-400 transition-colors p-1"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* User Info Form */}
                                <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100">
                                    <h3 className="font-medium text-primary flex items-center gap-2">
                                        <User size={18} />
                                        Datos de Envío
                                    </h3>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Nombre Completo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Ej: María García"
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Dirección de Entrega</label>
                                            <div className="relative flex gap-2">
                                                <div className="relative flex-grow">
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        placeholder="Ej: Av. San Martín 1234..."
                                                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                                                    />
                                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                </div>
                                                <button
                                                    onClick={handleGetLocation}
                                                    disabled={isLocating}
                                                    className="bg-secondary/20 hover:bg-secondary/30 text-primary p-2 rounded-lg transition-colors flex-shrink-0"
                                                    title="Usar mi ubicación actual"
                                                >
                                                    {isLocating ? (
                                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <Crosshair size={20} />
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-1 ml-1">
                                                Ingresa la dirección o usa el botón <Crosshair size={10} className="inline" /> para detectar tu ubicación exacta.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    {cartItems.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Total Estimado</span>
                                <span className="text-2xl font-bold text-primary">
                                    ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleDiscordCheckout}
                                    disabled={orderStatus.sending}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-indigo-600/20 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {orderStatus.sending ? (
                                        <>
                                            <Loader size={20} className="animate-spin" />
                                            <span>Enviando pedido...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>Enviar Pedido</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-green-600/20"
                                >
                                    <MessageCircle size={20} />
                                    <span>Enviar por WhatsApp</span>
                                </button>
                            </div>

                            <p className="text-xs text-gray-400 text-center mt-3">
                                Tu pedido será enviado directamente a la florería
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
