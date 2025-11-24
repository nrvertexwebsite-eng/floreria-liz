import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'd45xr0vk', // Tu Project ID
    dataset: 'production', // Tu Dataset
    useCdn: true, // true para caché rápida, false para datos frescos siempre
    apiVersion: '2024-03-20', // Fecha de la versión de la API
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
};
