// Discord Webhook Configuration
export const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1442310586070470696/syx21jptHwWzfRYpoxLYCfNQpMXPrQ6_c0DSe9JdR1B3WuIhN5KSiLzRsHz8NVAEorfl';

// Send order to Discord
export const sendOrderToDiscord = async (orderData) => {
    const { customerName, customerAddress, items } = orderData;

    // Calcular total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Crear campos para cada producto
    const productFields = items.map((item, index) => ({
        name: `${index + 1}. ${item.name}`,
        value: `📦 Cantidad: ${item.quantity}\n💰 Precio: $${item.price.toLocaleString()}\n💵 Subtotal: $${(item.price * item.quantity).toLocaleString()}\n🖼️ [Ver imagen](${item.image})`,
        inline: false
    }));

    // Mapa de Google Maps
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerAddress)}`;

    // Crear mensaje embed para Discord
    const embed = {
        title: "🌸 NUEVO PEDIDO WEB - FLORERÍA LIZ",
        color: 0xE91E63, // Color rosa
        fields: [
            {
                name: "👤 Cliente",
                value: customerName,
                inline: true
            },
            {
                name: "📍 Dirección",
                value: `${customerAddress}\n[Ver en Google Maps](${mapsLink})`,
                inline: false
            },
            {
                name: "🛍️ PRODUCTOS",
                value: "━━━━━━━━━━━━━━━━━━",
                inline: false
            },
            ...productFields,
            {
                name: "💳 TOTAL",
                value: `**$${total.toLocaleString()}**`,
                inline: false
            }
        ],
        footer: {
            text: "Por favor confirmar disponibilidad y costo de envío"
        },
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: "@everyone 📢 Nuevo pedido recibido",
                embeds: [embed]
            })
        });

        if (!response.ok) {
            throw new Error('Error al enviar a Discord');
        }

        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
};
