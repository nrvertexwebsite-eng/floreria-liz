import { WC_CONFIG, WC_ENDPOINTS, getAuthHeader } from '../config/woocommerce';

// Obtener todos los productos
export const getProducts = async () => {
    try {
        const response = await fetch(`${WC_ENDPOINTS.products}?per_page=100`, {
            method: 'GET',
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }

        const products = await response.json();

        // Transformar datos de WooCommerce al formato de tu app
        return products.map(product => ({
            id: product.id,
            name: product.name,
            category: product.categories[0]?.name || 'Sin categoría',
            description: product.short_description.replace(/<[^>]*>/g, ''), // Remover HTML
            price: parseFloat(product.price),
            image: product.images[0]?.src || 'https://via.placeholder.com/400x500?text=Sin+Imagen'
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Crear un pedido en WooCommerce
export const createOrder = async (orderData) => {
    try {
        const { customerName, customerAddress, items } = orderData;

        // Preparar los items en formato WooCommerce
        const lineItems = items.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        // Calcular total
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Crear el pedido
        const order = {
            payment_method: 'cod', // Cash on delivery
            payment_method_title: 'Pago al recibir',
            set_paid: false,
            billing: {
                first_name: customerName,
                address_1: customerAddress,
                city: 'Buenos Aires',
                country: 'AR',
                email: 'cliente@ejemplo.com'
            },
            shipping: {
                first_name: customerName,
                address_1: customerAddress,
                city: 'Buenos Aires',
                country: 'AR'
            },
            line_items: lineItems,
            customer_note: `Pedido desde la web. Ubicación: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerAddress)}`
        };

        const response = await fetch(WC_ENDPOINTS.orders, {
            method: 'POST',
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error('Error al crear el pedido');
        }

        const createdOrder = await response.json();
        return {
            success: true,
            orderId: createdOrder.id,
            orderNumber: createdOrder.number
        };
    } catch (error) {
        console.error('Error creating order:', error);
        return {
            success: false,
            error: error.message
        };
    }
};
