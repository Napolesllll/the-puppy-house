import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPromotions() {
  try {
    console.log('🌱 Iniciando seed de promociones...');

    // Primero obtener razas existentes
    const breeds = await prisma.breed.findMany({ take: 3 });
    
    if (breeds.length === 0) {
      console.warn('⚠️  No hay razas en la BD. Por favor, crea razas primero.');
      return;
    }

    // Eliminar promociones existentes
    await prisma.promotion.deleteMany();
    console.log('🗑️  Promociones anteriores eliminadas');

    // Crear promociones de prueba
    const promotions = [
      {
        title: '¡Descuento Especial en Bulldog Francés!',
        description: 'Aprovecha nuestro descuento exclusivo en cachorros Bulldog Francés. Garantizado con pedigree y vacunas completas.',
        discount: 20,
        image: 'https://res.cloudinary.com/dgao7l5il/image/upload/v1609459200/mascoticas/bulldog_q1h8z9.jpg',
        badge: 'HOT',
        startDate: new Date('2026-01-28'),
        endDate: new Date('2026-02-28'),
        isActive: true,
        isFeatured: true,
        order: 1,
        breedId: breeds[0]?.id,
      },
      {
        title: '🎁 Regalo Especial - Golden Retriever',
        description: 'Obtén accesorios premium gratis con la compra de un Golden Retriever. Incluye collar, correa y juguetes.',
        discount: 15,
        image: 'https://res.cloudinary.com/dgao7l5il/image/upload/v1609459200/mascoticas/golden_j2k3l4.jpg',
        badge: 'REGALO',
        startDate: new Date('2026-01-28'),
        endDate: new Date('2026-02-14'),
        isActive: true,
        isFeatured: true,
        order: 2,
        breedId: breeds[1]?.id,
      },
      {
        title: '¡Oferta Limitada! Pastor Alemán',
        description: 'Stock limitado: Solo 2 cachorros disponibles con este precio especial. Primera vacuna incluida.',
        discount: 25,
        image: 'https://res.cloudinary.com/dgao7l5il/image/upload/v1609459200/mascoticas/pastor_a5b6c7.jpg',
        badge: 'LIMITADO',
        startDate: new Date('2026-01-28'),
        endDate: new Date('2026-02-05'),
        isActive: true,
        isFeatured: false,
        order: 3,
        breedId: breeds[2]?.id,
      },
      {
        title: '✨ Oferta Nueva - Todos los Cachorritos',
        description: 'Nueva colección de razas pequeñas con descuento especial de bienvenida.',
        discount: 10,
        image: 'https://res.cloudinary.com/dgao7l5il/image/upload/v1609459200/mascoticas/new_offer_d8e9f0.jpg',
        badge: 'NUEVO',
        startDate: new Date('2026-01-28'),
        endDate: new Date('2026-02-20'),
        isActive: true,
        isFeatured: false,
        order: 4,
        breedId: null, // Sin raza específica
      },
    ];

    // Insertar promociones
    const createdPromotions = await Promise.all(
      promotions.map((promo) =>
        prisma.promotion.create({
          data: promo,
        })
      )
    );

    console.log(`✅ ${createdPromotions.length} promociones creadas exitosamente`);
    createdPromotions.forEach((p) => {
      console.log(`   📌 ${p.title} (${p.discount}% OFF)`);
    });
  } catch (error) {
    console.error('❌ Error al hacer seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPromotions();
