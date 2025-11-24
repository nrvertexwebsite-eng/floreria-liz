// Discord Webhook Configuration
export const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1442310586070470696/syx21jptHwWzfRYpoxLYCfNQpMXPrQ6_c0DSe9JdR1B3WuIhN5KSiLzRsHz8NVAEorfl';

// Send order to Discord
export const sendOrderToDiscord = async (orderData) => {
    const { customerName, customerAddress, customerPhone, deliveryDate, cardMessage, items, orderNumber } = orderData;

    // Calcular total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Crear campos para cada producto
    const productFields = items.map((item, index) => ({
        name: `${index + 1}. ${item.name}`,
        value: `📦 Cantidad: ${item.quantity}\n💰 Precio: $${item.price.toLocaleString()}\n💵 Subtotal: $${(item.price * item.quantity).toLocaleString()}\n🖼️ [Ver imagen](${item.image})`,
        inline: false
    }));

    // Mapa de Google Maps
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerAddress || '')}`;

    // Link directo a WhatsApp del cliente (limpiar número)
    const phoneStr = customerPhone || '';
    const cleanPhone = phoneStr.replace(/\D/g, '');
    const clientWhatsApp = cleanPhone ? `https://wa.me/${cleanPhone}` : '#';

    // Crear mensaje embed para Discord
    const embed = {
        title: `🌸 NUEVO PEDIDO #${orderNumber}`,
        description: "Se ha recibido un nuevo pedido desde la web.",
        color: 0xE91E63, // Color rosa
        fields: [
            {
                name: "📋 Nº Pedido",
                value: `**${orderNumber}**`,
                inline: true
            },
            {
                name: "📅 Fecha Entrega",
                value: deliveryDate || "Lo antes posible",
                inline: true
            },
            {
                name: "👤 Cliente",
                value: customerName || "Cliente",
                inline: true
            },
            {
                name: "📱 Teléfono",
                value: cleanPhone ? `[${phoneStr}](${clientWhatsApp}) \n🔗 [Click para Chatear](${clientWhatsApp})` : "No especificado",
                inline: true
            },
            {
                name: "📍 Dirección",
                value: `${customerAddress || 'No especificada'}\n[Ver en Google Maps](${mapsLink})`,
                inline: false
            },
            {
                name: "💌 Mensaje para Tarjeta",
                value: cardMessage ? `*"${cardMessage}"*` : "Sin mensaje",
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
            text: `ID: ${orderNumber} • Sistema de Pedidos Florería Liz`
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
                content: `@everyone 📢 ¡Nuevo pedido de ${customerName || 'Cliente'}! Total: $${total.toLocaleString()}`,
                tts: true, // ACTIVA LA VOZ EN DISCORD
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
