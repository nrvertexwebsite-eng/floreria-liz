// Test Discord Webhook
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1442310586070470696/syx21jptHwWzfRYpoxLYCfNQpMXPrQ6_c0DSe9JdR1B3WuIhN5KSiLzRsHz8NVAEorfl';

const testOrder = {
    customerName: 'María García (PRUEBA)',
    customerAddress: 'Av. San Martín 1234, Buenos Aires',
    items: [
        {
            id: 1,
            name: 'Rosas Rojas Clásicas',
            category: 'Rosas',
            price: 8500,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7'
        },
        {
            id: 2,
            name: 'Tulipanes Amarillos',
            category: 'Tulipanes',
            price: 6500,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102'
        }
    ]
};

const total = testOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

const productFields = testOrder.items.map((item, index) => ({
    name: `${index + 1}. ${item.name}`,
    value: `📦 Cantidad: ${item.quantity}\n💰 Precio: $${item.price.toLocaleString()}\n💵 Subtotal: $${(item.price * item.quantity).toLocaleString()}\n🖼️ [Ver imagen](${item.image})`,
    inline: false
}));

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(testOrder.customerAddress)}`;

const embed = {
    title: "🌸 NUEVO PEDIDO WEB - FLORERÍA LIZ (PRUEBA)",
    color: 0xE91E63,
    fields: [
        {
            name: "👤 Cliente",
            value: testOrder.customerName,
            inline: true
        },
        {
            name: "📍 Dirección",
            value: `${testOrder.customerAddress}\n[Ver en Google Maps](${mapsLink})`,
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
        text: "🧪 Este es un pedido de PRUEBA - Por favor confirmar disponibilidad y costo de envío"
    },
    timestamp: new Date().toISOString()
};

fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        content: "@everyone 📢 Nuevo pedido recibido (PRUEBA)",
        embeds: [embed]
    })
})
    .then(response => {
        if (response.ok) {
            console.log('✅ Pedido de prueba enviado a Discord!');
            console.log('📱 Revisa el canal #pedidos-web en Discord');
        } else {
            console.error('❌ Error al enviar:', response.status);
        }
    })
    .catch(error => {
        console.error('❌ Error:', error);
    });
