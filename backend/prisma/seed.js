const { PrismaClient } = require('@prisma/client');
const { engines, engineTypes, engineLiterature } = require('./data');
const prisma = new PrismaClient();

async function main() {
  engineTypes.forEach(async (engineType) => {
    await prisma.engineType.upsert({
      where: {
        id: engineType.id,
      },
      create: {
        ...engineType,
      },
      update: {
        ...engineType,
      },
    });
  });
  engines.forEach(async (engine) => {
    await prisma.engine.upsert({
      where: {
        title: engine.title,
      },
      create: {
        id: engine.id,
        title: engine.title,
        description: engine.description,
        link: engine.link,
        img: engine.img,
        engineTypeId: engine.engine_type_id,
      },
      update: {
        title: engine.title,
        description: engine.description,
        link: engine.link,
        img: engine.img,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
