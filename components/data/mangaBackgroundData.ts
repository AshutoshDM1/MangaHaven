export interface MangaBackground {
  imageUrl: string;
  title: string;
  description: string;
  chapter: string;
  volume: string;
  status: string;
}

export const mangaBackgroundDataHard: MangaBackground[] = [
  {
    imageUrl: "one-punch-man.jpg",
    title: "One Punch Man",
    description:
      "One Punch Man tells the story of Saitama, a superhero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge due to his overwhelming strength. The series follows Saitama and his disciple Genos as they join the Hero Association to gain official recognition as heroes, meeting various other heroes and villains along the way. As Saitama faces increasingly powerful opponents, he struggles with the crisis of being too powerful, often ending fights with a single punch, much to his disappointment.",
    chapter: "Chapter 123",
    volume: "Volume 23",
    status: "Ongoing",
  },
  {
    imageUrl: "one-piece.jpg",
    title: "One Piece",
    description:
      "One Piece follows the adventures of Monkey D. Luffy, a young man whose body gained the properties of rubber after unintentionally eating a Devil Fruit. With his crew of pirates, named the Straw Hat Pirates, Luffy explores the Grand Line in search of the world's ultimate treasure known as 'One Piece' in order to become the next Pirate King. Along his journey, Luffy makes numerous friends and fights a wide variety of villains, many of whom try to kill him for his treasure or his straw hat, a gift from his idol, the pirate Red-Haired Shanks.",
    chapter: "Chapter 1061",
    volume: "Volume 104",
    status: "Ongoing",
  },
  {
    imageUrl: "bleach-(18+).jpg",
    title: "Bleach",
    description:
      "Bleach follows the adventures of Ichigo Kurosaki after he obtains the powers of a Soul Reaper—a death personification similar to the Grim Reaper—from another Soul Reaper, Rukia Kuchiki. His new-found powers force him to take on the duties of defending humans from evil spirits and guiding departed souls to the afterlife. As the series progresses, Ichigo becomes involved in conflicts between Soul Reapers, Hollows, and other supernatural beings, gradually discovering hidden truths about his own past and the nature of the Soul Reaper world.",
    chapter: "Chapter 686",
    volume: "Volume 74",
    status: "Completed",
  },
];
