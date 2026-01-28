// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Breed = {
  name: string;
  description: string;
  image: string;
  desde?: string;
  precio: {
    macho: number;
    hembra: number;
  };
  images: string[];
};

const smallBreeds: Breed[] = [
  {
    name: "Pomeranias mini cara de oso lineas importadas coreanos y rusos",
    description: "Energicos,Curosos, Leales, Valientes, Alertas!",
    image: "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 10.22.39_5c7c894b.jpg",
    desde: "a partir de",
    precio: { macho: 3000000, hembra: 4000000 },
    images: [
      "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 10.22.39_35225c42.jpg",
      "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 10.22.42_b272ca2f.jpg",
      "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 10.22.40_98e119fd.jpg",
    ]
  },
  {
    name: "Bulldog Francés",
    description: "Compacto, cariñoso y de expresión divertida.",
    image: "/razas paqueñas/IMG-20250422-WA0204.jpg",
    desde: "a partir de",
    precio: { macho: 1500000, hembra: 1500000 },
    images: [
      "/razas paqueñas/IMG-20250422-WA0213.jpg",
      "/razas paqueñas/IMG-20250422-WA0196.jpg",
      "/razas paqueñas/IMG-20250422-WA0205.jpg",
    ]
  },
  {
    name: "Bichon Maltes",
    description: "El Bichón Maltés es un perro pequeño, alegre y juguetón. Es conocido por su pelaje blanco y sedoso.",
    image: "/razas paqueñas/IMG-20250422-WA0163.jpg",
    precio: { macho: 2000000, hembra: 2500000 },
    images: [
      "/razas paqueñas/IMG-20250422-WA0162.jpg",
      "/razas paqueñas/IMG-20250422-WA0161.jpg",
    ]
  },
  {
    name: "Yorkshie Terriers miniaturas Team cup",
    description: "El temperamento del perro Yorkshire Terrier es generalmente abierto, juguetón, divertido, curioso, inteligente y afectuoso...",
    image: "/razas paqueñas/yorkshkie.jpg",
    precio: { macho: 2000000, hembra: 2500000 },
    images: [
      "/razas paqueñas/IMG-20250422-WA0045.jpg",
      "/razas paqueñas/IMG-20250422-WA0039.jpg",
      "/razas paqueñas/IMG-20250422-WA0047.jpg",
    ]
  },
  {
    name: "Biewer",
    description: "El temperamento del perro Yorkshire Terrier es generalmente abierto, juguetón, divertido, curioso, inteligente y afectuoso...",
    image: "/razas paqueñas/7d6526f0-6e98-4259-9e39-79761e93d405.jpg",
    precio: { macho: 2500000, hembra: 3000000 },
    images: [
      "/razas paqueñas/19f3478c-e99c-4f87-997c-2c6db69631ba.jpg",
      "/razas paqueñas/00caceb2-14d3-4c18-b22c-932bf5f7a82f.jpg",
      "/razas paqueñas/c8bbcd07-f28e-4250-94ec-7190a1cd7ff9.jpg",
    ]
  },
  {
    name: "Shihtzu",
    description: "Afectuoso Tranquilo Sociable Docil Juguetón",
    image: "/razas paqueñas/IMG-20250422-WA0086.jpg",
    precio: { macho: 1500000, hembra: 1700000 },
    images: [
      "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 17.19.51_b67e3d2a.jpg",
      "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 17.19.55_6380a29e.jpg",
      "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 17.19.56_c2de5790.jpg",
    ]
  },
  {
    name: "Teckel salchicha",
    description: "El temperamento del perro Teckel es intuitivo, temerario y valiente...",
    image: "/razas paqueñas/IMG-20250422-WA0003.jpg",
    desde: "a partir de",
    precio: { macho: 1600000, hembra: 1600000 },
    images: [
      "/razas paqueñas/IMG-20250422-WA0006.jpg",
      "/razas paqueñas/Imagen de WhatsApp 2025-09-19 a las 11.34.29_d58dd00b.jpg",
    ]
  },
  {
    name: "Jack Russell Terrier",
    description: "El temperamento del perro Jack Russell Terrier es enérgico, inteligente y curioso...",
    image: "/razas paqueñas/IMG-20250423-WA0197.jpg",
    precio: { macho: 1600000, hembra: 1600000 },
    images: [
      "/razas paqueñas/IMG-20250422-WA0061.jpg",
      "/razas paqueñas/IMG-20250422-WA0067.jpg",
      "/razas paqueñas/IMG-20250422-WA0072.jpg",
    ]
  },
  {
    name: "Chihuahua miniatura",
    description: "El Chihuahua es un perro pequeño, pero con una gran personalidad. Es conocido por su lealtad y afecto hacia sus dueños.",
    image: "/razas paqueñas/IMG-20250423-WA0000.jpg",
    desde: "a partir de",
    precio: { macho: 2000000, hembra: 2500000 },
    images: [
      "/razas paqueñas/IMG-20250423-WA0008.jpg",
      "/razas paqueñas/IMG-20250423-WA0011.jpg",
      "/razas paqueñas/IMG-20250423-WA0001.jpg",
    ]
  },
];

const mediumBreeds: Breed[] = [
  {
    name: "Cockel Spaniel",
    description: "Se describe como amigable, alegre y afectuoso. Son muy sociables y se llevan bien con personas de todas las edades, incluidas las familias con niños.",
    image: "/razas-medianas/IMG-20250423-WA0014.jpg",
    precio: { macho: 1200000, hembra: 1200000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0015.jpg",
      "/razas-medianas/IMG-20250423-WA0019.jpg",
      "/razas-medianas/IMG-20250423-WA0026.jpg",
    ]
  },
  {
    name: "Beagles",
    description: "Es amigable, cariñoso y energético. Son perros ecuánimes, ni demasiado agresivos ni demasiado tímidos.",
    image: "/razas-medianas/IMG-20250423-WA0028.jpg",
    precio: { macho: 1300000, hembra: 1300000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0029.jpg",
      "/razas-medianas/IMG-20250423-WA0032.jpg",
    ]
  },
  {
    name: "West Highland White Terrier",
    description: "Con las personas se muestra por lo general muy cariñoso y sociable.",
    image: "/razas-medianas/IMG-20250423-WA0037.jpg",
    precio: { macho: 2000000, hembra: 2500000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0036.jpg",
      "/razas-medianas/IMG-20250423-WA0035.jpg",
      "/razas-medianas/IMG-20250423-WA0034.jpg",
    ]
  },
  {
    name: "Schnauzer",
    description: "El schnauzer es una raza canina con un temperamento fuerte y cariñoso.",
    image: "/razas-medianas/IMG-20250423-WA0041.jpg",
    precio: { macho: 1500000, hembra: 1500000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0039.jpg",
      "/razas-medianas/IMG-20250423-WA0040.jpg",
    ]
  },
  {
    name: "Boston Terrier",
    description: "Temperamento suave y equilibrado.",
    image: "/razas-medianas/IMG-20250423-WA0045.jpg",
    precio: { macho: 1700000, hembra: 1700000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0050.jpg",
      "/razas-medianas/IMG-20250423-WA0043.jpg",
      "/razas-medianas/IMG-20250423-WA0048.jpg",
    ]
  },
  {
    name: "Bulldog Ingles Tradicional y Exotico",
    description: "El temperamento del bulldog inglés se caracteriza por ser dulce y paciente.",
    image: "/razas-medianas/IMG-20250423-WA0059.jpg",
    desde: "a partir de",
    precio: { macho: 2000000, hembra: 2300000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0056.jpg",
      "/razas-medianas/IMG-20250423-WA0054.jpg",
      "/razas-medianas/IMG-20250423-WA0053.jpg",
    ]
  },
  {
    name: "Pug",
    description: "El temperamento del pug o carlino es el típico de un perro de compañía.",
    image: "/razas-medianas/IMG-20250423-WA0062.jpg",
    precio: { macho: 1300000, hembra: 1300000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0064.jpg",
      "/razas-medianas/IMG-20250423-WA0061.jpg",
      "/razas-medianas/IMG-20250423-WA0066.jpg",
    ]
  },
  {
    name: "Pomsky siberianos lobitos miniatura",
    description: "El temperamento del perro Pomsky es uno de los aspectos más atractivos de esta raza.",
    image: "/razas-medianas/IMG-20250423-WA0077.jpg",
    desde: "a partir de",
    precio: { macho: 2000000, hembra: 2300000 },
    images: [
      "/razas-medianas/IMG-20250423-WA0077.jpg",
      "/razas-medianas/IMG-20250423-WA0076.jpg",
      "/razas-medianas/IMG-20250423-WA0073.jpg",
    ]
  },
];

const largeBreeds: Breed[] = [
  {
    name: "Husky siberiano",
    description: "Tiende a ser amigable con la gente incluyendo a los niños.",
    image: "/razas-grandes/f3889dbb-be6c-4db8-ad6e-a63f027b9a12.jpg",
    desde: "a partir de",
    precio: { macho: 1500000, hembra: 1500000 },
    images: [
      "/razas-grandes/f3889dbb-be6c-4db8-ad6e-a63f027b9a12.jpg",
      "/razas-grandes/902d5f22-a052-4071-bfec-f6c396529598.jpg",
      "/razas-grandes/cb1b307d-9518-4b13-9853-e4c354dcb411.jpg",
    ]
  },
  {
    name: "Doberman",
    description: "Los Dóberman son perros fuertes y enérgicos que necesitan practicar mucho ejercicio.",
    image: "/razas-grandes/640a3bd5-2f3f-477c-850e-6a3cafc499df.jpg",
    desde: "a partir de",
    precio: { macho: 1600000, hembra: 1600000 },
    images: [
      "/razas-grandes/52054915-9825-4617-aa32-840ca451603a.jpg",
      "/razas-grandes/00140f28-e76d-40ae-9cde-3910f6915e05.jpg",
      "/razas-grandes/459d42de-5064-45c3-83ec-c5911f05c89a.jpg",
    ]
  },
  {
    name: "Golden Retriever",
    description: "El temperamento del Golden Retriever es fuerte, poderoso pero muy gentil.",
    image: "/razas-grandes/7881fd25-0865-499b-aa07-e113c5808753.jpg",
    precio: { macho: 1500000, hembra: 1500000 },
    images: [
      "/razas-grandes/798c658b-838d-4f97-896b-2ee462875563.jpg",
      "/razas-grandes/0f81b499-bef4-48e2-846e-cd3f16ab8c5b.jpg",
      "/razas-grandes/c90275e9-f6cc-4c14-b4ed-a70af5b777d7.jpg",
    ]
  },
  {
    name: "Labradores",
    description: "El Labrador Retriever es una raza de perro con un carácter amigable, leal y apacible.",
    image: "/razas-grandes/c9025328-c6af-4398-87c0-d7c2ecaf01de.jpg",
    precio: { macho: 1300000, hembra: 1300000 },
    images: [
      "/razas-grandes/fdf9f0a9-5857-467c-af14-2bc0b8e25786.jpg",
      "/razas-grandes/c2bec3d3-b582-43fb-bd89-34b86350722b.jpg",
      "/razas-grandes/478e0f49-dc62-4187-9602-db73d2d641b3.jpg",
    ]
  },
  {
    name: "Dogo de burdeos",
    description: "El Dogo de Burdeos es conocido por su temperamento tranquilo y firme.",
    image: "/razas-grandes/cf655953-908e-4d00-8568-4c597fdd19a7.jpg",
    precio: { macho: 3500000, hembra: 3500000 },
    images: [
      "/razas-grandes/f4d2bd6b-e61f-494c-aba9-31d16f48ca7b.jpg",
      "/razas-grandes/e9df34e5-68fd-49b1-a235-d3a1bbbe2762.jpg",
      "/razas-grandes/3f79dde5-2eab-4210-bbef-f22cd2367277.jpg",
    ]
  },
  {
    name: "Bernés de la Montaña",
    description: "El Boyero de Berna o Bernés de la Montaña tiene un temperamento equilibrado y afectuoso.",
    image: "/razas-grandes/4330a8aa-2314-4582-a592-ab4f01f91dd6.jpg",
    precio: { macho: 4000000, hembra: 4000000 },
    images: [
      "/razas-grandes/009f5150-d31d-4cd7-bc84-dfe606287493.jpg",
      "/razas-grandes/da31dfe5-5304-4a1d-bf38-7f2c44bdbef5.jpg",
      "/razas-grandes/43e83696-0b85-41f5-ba5a-71083590d4a7.jpg",
    ]
  },
  {
    name: "Pastor belga Malinois",
    description: "El Pastor Belga Malinois es un perro inteligente, leal y enérgico.",
    image: "/razas-grandes/72353e25-5706-4abe-9c57-203cbb7b9d8e.jpg",
    precio: { macho: 1600000, hembra: 1600000 },
    images: [
      "/razas-grandes/7bc4d377-e4dc-4b37-9ea7-9e7d7cb9fc63.jpg",
      "/razas-grandes/22564207-9f4b-4946-9e0b-34a9b1dce5d4.jpg",
      "/razas-grandes/cc890688-b646-4c70-aa28-8af8d7e5f97b.jpg",
    ]
  },
  {
    name: "Rottweiler",
    description: "El temperamento del perro Rottweiler se puede definir como la mezcla perfecta entre amoroso y leal.",
    image: "/razas-grandes/43e779ef-ae19-4da8-896f-eec0a0f7e743.jpg",
    precio: { macho: 1600000, hembra: 1600000 },
    images: [
      "/razas-grandes/67286174-3e67-48c7-98b9-e34cea1180ac.jpg",
      "/razas-grandes/a88fe6ec-b312-41b0-91ce-3aaece5c434a.jpg",
      "/razas-grandes/5a340d20-bdee-4067-9f0a-c413ef06ba95.jpg",
    ]
  },
  {
    name: "Pastor alemán pelo largo",
    description: "El Pastor Alemán es una raza de perro con un temperamento valiente, obediente e inteligente.",
    image: "/razas-grandes/4ee06a1b-4d44-4f16-bb09-6a2b70876bce.jpg",
    desde: "a partir de",
    precio: { macho: 1500000, hembra: 1500000 },
    images: [
      "/razas-grandes/Imagen de WhatsApp 2025-09-19 a las 11.34.31_4eee8130.jpg",
      "/razas-grandes/Imagen de WhatsApp 2025-09-19 a las 11.34.32_5273d960.jpg",
      "/razas-grandes/Imagen de WhatsApp 2025-09-19 a las 11.34.32_187dddf4.jpg",
    ]
  },
];

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const seedBreeds = async (
  breeds: Breed[],
  categoryId: string
) => {
  for (const breed of breeds) {
    const slug = createSlug(breed.name);

    const createdBreed = await prisma.breed.upsert({
      where: { slug },
      update: {},
      create: {
        name: breed.name,
        description: breed.description,
        image: breed.image,
        desde: breed.desde,
        slug,
        categoryId,
      },
    });

    await prisma.breedPrice.upsert({
      where: { breedId: createdBreed.id },
      update: {},
      create: {
        breedId: createdBreed.id,
        malePrice: breed.precio.macho,
        femalePrice: breed.precio.hembra,
      },
    });

    for (let i = 0; i < breed.images.length; i++) {
      // Buscar si ya existe
      const existingImage = await prisma.breedImage.findFirst({
        where: {
          breedId: createdBreed.id,
          order: i,
        },
      });

      if (!existingImage) {
        await prisma.breedImage.create({
          data: {
            breedId: createdBreed.id,
            url: breed.images[i],
            order: i,
          },
        });
      }
    }
  }
};

async function main() {
  try {
    console.log("🌱 Iniciando seeding de datos...");

    const pequenas = await prisma.category.upsert({
      where: { slug: "pequenas" },
      update: {},
      create: {
        name: "Razas Pequeñas",
        slug: "pequenas",
        description: "Perros pequeños, perfectos para apartamentos y familias",
      },
    });

    const medianas = await prisma.category.upsert({
      where: { slug: "medianas" },
      update: {},
      create: {
        name: "Razas Medianas",
        slug: "medianas",
        description: "Perros medianos, balance perfecto entre tamaño y energía",
      },
    });

    const grandes = await prisma.category.upsert({
      where: { slug: "grandes" },
      update: {},
      create: {
        name: "Razas Grandes",
        slug: "grandes",
        description: "Perros grandes, leales y protectores",
      },
    });

    console.log("✅ Categorías creadas/actualizadas");

    console.log("📝 Agregando razas pequeñas...");
    await seedBreeds(smallBreeds, pequenas.id);
    console.log(`✅ ${smallBreeds.length} razas pequeñas agregadas`);

    console.log("📝 Agregando razas medianas...");
    await seedBreeds(mediumBreeds, medianas.id);
    console.log(`✅ ${mediumBreeds.length} razas medianas agregadas`);

    console.log("📝 Agregando razas grandes...");
    await seedBreeds(largeBreeds, grandes.id);
    console.log(`✅ ${largeBreeds.length} razas grandes agregadas`);

    console.log("🎉 ¡Seeding completado exitosamente!");
  } catch (error) {
    console.error("❌ Error durante el seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
