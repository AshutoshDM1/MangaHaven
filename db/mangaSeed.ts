import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mangaData = [
  {
    id: 1,
    title: "Rent a Girlfriend",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216077/MangaHavenV2/MangaCover/kk0gow0lvyitodskfa1i.webp",
    description: "Kazuya, a college student heartbroken after a breakup, rents a girlfriend named Chizuru. What begins as a transactional relationship spirals into a complicated mix of feelings, secrets, and tangled lives, as Kazuya struggles to find real love and self-worth amidst the chaos.",
    totalChapter: 0,
    totalAvailableChapter: 328,
    genres: ["Romance", "Comedy", "Drama"],
    categoryId: null
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216136/MangaHavenV2/MangaCover/cabnfat19ex7iuofgzrn.webp",
    description: "Yuji Itadori, a high schooler with extraordinary strength, swallows a cursed object—a finger of the powerful Sukuna—and gets dragged into the world of Jujutsu Sorcerers. To protect others and save himself, he joins Tokyo Jujutsu High and battles deadly curses lurking in the shadows.",
    totalChapter: 0,
    totalAvailableChapter: 263,
    genres: ["Action", "Supernatural", "Dark Fantasy"],
    categoryId: null
  },
  {
    id: 3,
    title: "Domestic Girlfriend",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216191/MangaHavenV2/MangaCover/rxykbv7afnwf2tz29deo.webp",
    description: "Natsuo Fujii falls for his teacher, Hina, but his life gets complicated when he suddenly gains two new stepsisters—Hina and her younger sister Rui, with whom he had a one-night stand. Caught in a web of forbidden love, secrets, and emotional turmoil, Natsuo must navigate the complexities of youth, relationships, and personal growth.",
    totalChapter: 0,
    totalAvailableChapter: 276,
    genres: ["Drama", "Romance", "School Life"],
    categoryId: null
  },
  {
    id: 4,
    title: "Demon Slayer",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216268/MangaHavenV2/MangaCover/vrksfllwcxt3hwccu0ip.webp",
    description: "Tanjiro Kamado becomes a demon slayer after his family is slaughtered by demons and his sister Nezuko is turned into one. On a journey filled with danger, he battles powerful demons, seeks revenge, and searches for a cure to turn his sister human again. A gripping tale of resilience, sacrifice, and hope.",
    totalChapter: 0,
    totalAvailableChapter: 205,
    genres: ["Action", "Supernatural", "Dark Fantasy"],
    categoryId: null
  },
  {
    id: 5,
    title: "One Punch Man",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216342/MangaHavenV2/MangaCover/b3j7axow5glk8m3h3rbm.webp",
    description: "Saitama, a hero who can defeat any enemy with a single punch, grows bored of his unmatched strength. As he searches for a worthy opponent, he navigates a chaotic world filled with monsters, rival heroes, and absurd challenges—all while keeping his hero status under the radar.",
    totalChapter: 0,
    totalAvailableChapter: 196,
    genres: ["Action", "Comedy", "Superhero"],
    categoryId: null
  },
  {
    id: 6,
    title: "Naruto",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216397/MangaHavenV2/MangaCover/lqyhsmlfzrjzgjt1bzva.jpg",
    description: "Naruto Uzumaki, a spirited ninja with a sealed demon fox inside him, dreams of becoming the strongest ninja and earning the title of Hokage. As he grows, he battles enemies, forms strong bonds, and uncovers deep secrets about his world and himself.",
    totalChapter: 0,
    totalAvailableChapter: 700,
    genres: ["Action", "Adventure", "Fantasy"],
    categoryId: null
  },
  {
    id: 7,
    title: "One Piece",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216426/MangaHavenV2/MangaCover/yvbwy6v1ilbe9uyql7wc.jpg",
    description: "Monkey D. Luffy, a rubber-bodied pirate with a dream to become the King of the Pirates, sets sail to find the legendary treasure known as \"One Piece.\" Along the way, he forms a diverse crew, battles powerful enemies, and uncovers deep secrets of the world. A grand tale of freedom, friendship, and adventure across the seas.",
    totalChapter: 0,
    totalAvailableChapter: 1119,
    genres: ["Action", "Adventure", "Fantasy"],
    categoryId: null
  },
  {
    id: 8,
    title: "Attack on Titan",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216483/MangaHavenV2/MangaCover/pboz38klvohki35b5kjw.jpg",
    description: "In a world where giant humanoid Titans devour humans, Eren Yeager joins the military after his hometown is destroyed. As he fights to uncover the truth behind the Titans and humanity's walled existence, dark secrets unravel, revealing conspiracies, betrayal, and the true nature of freedom.",
    totalChapter: 0,
    totalAvailableChapter: 139,
    genres: ["Action", "Dark Fantasy", "Post-Apocalyptic"],
    categoryId: null
  },
  {
    id: 9,
    title: "Chainsaw Man",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216506/MangaHavenV2/MangaCover/mxecpu5ilsulgbcqudjk.jpg",
    description: "Denji, a broke teenager with a pet devil named Pochita, becomes Chainsaw Man after fusing with him. Caught in a brutal world of devil hunters and monstrous devils, Denji battles to survive while chasing simple dreams like food, love, and peace. Dark, violent, and emotionally intense, it explores the cost of humanity in a chaotic world.",
    totalChapter: 0,
    totalAvailableChapter: 152,
    genres: ["Action", "Horror", "Supernatural"],
    categoryId: null
  },
  {
    id: 10,
    title: "Fullmetal Alchemist: Brotherhood",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216538/MangaHavenV2/MangaCover/qzc4uhh81sxwndrtjhzs.jpg",
    description: "Two brothers, Edward and Alphonse Elric, use forbidden alchemy in a desperate attempt to revive their mother—only to pay a terrible price. Now, they journey across a war-torn land seeking the Philosopher's Stone to restore their bodies, uncovering dark secrets behind the nation's power.",
    totalChapter: 0,
    totalAvailableChapter: 116,
    genres: ["Action", "Adventure", "Fantasy"],
    categoryId: null
  },
  {
    id: 11,
    title: "My Hero Academia",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216578/MangaHavenV2/MangaCover/kjfqhptrgk6e0ugajmqq.jpg",
    description: "In a world where most people have superpowers called \"Quirks,\" Izuku Midoriya is born powerless. Still dreaming of becoming a hero, he inherits the legendary Quirk \"One For All\" and enrolls in U.A. High to train alongside future heroes. The story follows his journey, battles, and growth amidst rising threats.",
    totalChapter: 0,
    totalAvailableChapter: 430,
    genres: ["Action", "Superhero", "Shounen"],
    categoryId: null
  },
  {
    id: 12,
    title: "The Rising of the Shield Hero",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216643/MangaHavenV2/MangaCover/lj2shbuycg2fyvoniubc.jpg",
    description: "Naofumi Iwatani, an otaku, is summoned to a fantasy realm as one of four Cardinal Heroes—and stuck with the flawed Legendary Shield. Betrayed and falsely accused, he becomes cynical and alone, until he acquires a demi‑human slave, Raphtalia. Together, they journey through a world beset by devastating \"Waves,\" forging trust, seeking justice, and proving that even the weakest can become a hero.",
    totalChapter: 0,
    totalAvailableChapter: 108,
    genres: ["Isekai", "Dark Fantasy", "Adventure"],
    categoryId: null
  },
  {
    id: 13,
    title: "Tokyo Ghoul",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216688/MangaHavenV2/MangaCover/flgifhqi4npyte5kc1vt.jpg",
    description: "Tokyo Ghoul follows Kaneki, a college student who becomes a half-ghoul after a deadly encounter. Struggling between his human past and ghoul instincts, he's pulled into a dark world of flesh-eating creatures, secret organizations, and identity crisis.",
    totalChapter: 0,
    totalAvailableChapter: 143,
    genres: ["Dark Fantasy", "Horror", "Supernatural"],
    categoryId: null
  },
  {
    id: 14,
    title: "High School DxD",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216728/MangaHavenV2/MangaCover/kw5dy9kt8ajrgzkjzgu3.jpg",
    description: "High School DxD follows Issei Hyoudou, a perverted high school student who's killed by a fallen angel and revived by the beautiful devil Rias Gremory. Thrust into a world of angels, devils, and sacred gear battles, Issei dreams of becoming a Harem King while fighting powerful foes.",
    totalChapter: 0,
    totalAvailableChapter: 263,
    genres: ["Action", "Supernatural", "Ecchi"],
    categoryId: null
  },
  {
    id: 15,
    title: "Dragon Ball Z",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216788/MangaHavenV2/MangaCover/gwu9v8o4qnal2qxctcha.jpg",
    description: "Dragon Ball Z follows Goku as he defends Earth from powerful foes, from intergalactic tyrants like Frieza to ancient magical beings like Majin Buu. With intense battles, power-ups, and emotional arcs, Goku and his friends push their limits to protect the universe.",
    totalChapter: 0,
    totalAvailableChapter: 325,
    genres: ["Action", "Adventure", "Martial Arts"],
    categoryId: null
  },
  {
    id: 16,
    title: "Berserk",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216850/MangaHavenV2/MangaCover/uesimgdtozsubwj26vui.webp",
    description: "Berserk follows Guts, a lone mercenary with a tragic past, as he battles monstrous forces in a dark medieval world. Driven by vengeance and haunted by fate, he wields a massive sword against demons and former allies alike. It's a brutal, emotional tale of survival, betrayal, and the struggle for purpose.",
    totalChapter: 0,
    totalAvailableChapter: 374,
    genres: ["Dark Fantasy", "Action", "Horror"],
    categoryId: null
  },
  {
    id: 17,
    title: "Bleach",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216900/MangaHavenV2/MangaCover/ub6xlv1jqesklcnn8ffg.jpg",
    description: "Bleach follows Ichigo Kurosaki, a teenager who gains the powers of a Soul Reaper—death personified—to protect humans from evil spirits and guide souls to the afterlife. As he faces hollows, rogue Soul Reapers, and dark secrets of the spirit world, Ichigo is drawn into epic battles that determine the fate of both the living and the dead.",
    totalChapter: 0,
    totalAvailableChapter: 686,
    genres: ["Action", "Supernatural", "Shonen"],
    categoryId: null
  },
  {
    id: 18,
    title: "Death Note",
    coverImageUrl: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216925/MangaHavenV2/MangaCover/jsnwtne8qnujsd3qsrpl.jpg",
    description: "When high school genius Light Yagami finds a notebook that allows him to kill anyone by writing their name in it, he vows to rid the world of evil. As criminals begin to die mysteriously, a brilliant detective known only as \"L\" sets out to uncover the killer's identity. A tense game of cat and mouse ensues, blurring the lines between justice and vengeance.",
    totalChapter: 0,
    totalAvailableChapter: 108,
    genres: ["Supernatural", "Psychological Thriller", "Mystery"],
    categoryId: null
  }
];

async function main() {
  console.log('🌱 Starting to seed the database...');

  try {
    // Clear existing manga data
    console.log('🧹 Clearing existing manga data...');
    await prisma.mangaChapterImage.deleteMany();
    await prisma.mangaChapter.deleteMany();
    await prisma.manga.deleteMany();

    // Seed manga data
    console.log('📚 Seeding manga data...');
    
    for (const manga of mangaData) {
      await prisma.manga.create({
        data: {
          title: manga.title,
          coverImageUrl: manga.coverImageUrl,
          description: manga.description,
          totalChapter: manga.totalChapter,
          totalAvailableChapter: manga.totalAvailableChapter,
          genres: manga.genres,
        },
      });
      console.log(`✅ Created manga: ${manga.title}`);
    }

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Created ${mangaData.length} manga entries`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('💥 Seed script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
