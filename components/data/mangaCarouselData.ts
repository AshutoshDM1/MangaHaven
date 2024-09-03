export interface MangaItem {
    title: string;
    description: string;
    chapter: string;
    volume: string;
    status: string;
    genres: string[];
    imageUrl: string;
}
  
export const mangaItems: MangaItem[] = [
    {
        title: "Berserk",
        description: "Guts, a former mercenary now known as the \"Black Swordsman\"...",
        chapter: "Chap 376",
        volume: "Vol 42",
        status: "Completed",
        genres: ["Action", "Drama", "Super Power"],
        imageUrl: "https://i.pinimg.com/564x/84/98/b0/8498b0637947effcae670f59b0cb7a55.jpg"
    },
    {
        title: "The Rising of the Shield Hero",
        description: "Twenty-year-old otaku Naofumi Iwatani is mysteriously...",
        chapter: "Chap 108",
        volume: "Vol 26",
        status: "Releasing",
        genres: ["Action", "Drama", "Isekai"],
        imageUrl: "https://i.pinimg.com/564x/84/46/f8/8446f8bb8d77eb5b228da5317074b3ae.jpg"
    },
    {
        title: "One-Punch Man",
        description: "After rigorously training for three years, the ordinary Saitama has...",
        chapter: "Chap 230",
        volume: "Vol 31",
        status: "Ongoing",
        genres: ["Action", "Comedy", "Parody"],
        imageUrl: "https://i.pinimg.com/564x/7b/da/ae/7bdaae5c9070e5e980568eb1dbd5810a.jpg"
    },
    {
        title: "Attack on Titan",
        description: "Humanity lives inside cities surrounded by enormous walls due to the Titans...",
        chapter: "Chap 139",
        volume: "Vol 34",
        status: "Completed",
        genres: ["Action", "Gore", "Post-apocalyptic"],
        imageUrl: "https://i.pinimg.com/236x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg"
    },
    {
        title: "My Hero Academia",
        description: "In a world where people with superpowers known as 'Quirks' are the norm...",
        chapter: "Chap 362",
        volume: "Vol 34",
        status: "Ongoing",
        genres: ["Superhero", "Action", "School"],
        imageUrl: "https://i.pinimg.com/236x/94/ea/f3/94eaf36ebaef4a16cc0931b1dcdf2f27.jpg"
    },
    {
        title: "Demon Slayer",
        description: "Tanjiro Kamado's peaceful life is shattered when his family is slaughtered by demons...",
        chapter: "Chap 205",
        volume: "Vol 23",
        status: "Completed",
        genres: ["Action", "Supernatural", "Shounen"],
        imageUrl: "https://i.pinimg.com/236x/1f/c5/f0/1fc5f081438952f493a842757bb4bd3b.jpg"
    },
    {
        title: "Jujutsu Kaisen",
        description: "Yuji Itadori is an unnaturally fit high school student living in Sendai...",
        chapter: "Chap 213",
        volume: "Vol 22",
        status: "Ongoing",
        genres: ["Shounen", "Action", "Dark Fantasy"],
        imageUrl: "https://i.pinimg.com/236x/99/ef/83/99ef837028463d4f940b63c2b288222b.jpg"
    },
    {
        title: "Chainsaw Man",
        description: "Denji is a young man trapped in poverty, working off his deceased father's debt...",
        chapter: "Chap 131",
        volume: "Vol 14",
        status: "Ongoing",
        genres: ["Dark Fantasy", "Action", "Shounen"],
        imageUrl: "https://i.pinimg.com/474x/5c/5a/72/5c5a72974314122fa1d1b54bd2757e4c.jpg"
    },
    {
        title: "Tokyo Ghoul",
        description: "Ken Kaneki is a normal college student until a violent encounter turns him into...",
        chapter: "Chap 179",
        volume: "Vol 14",
        status: "Completed",
        genres: ["Dark Fantasy", "Seinen", "Thriller"],
        imageUrl: "https://i.pinimg.com/236x/4a/49/89/4a49891e57f797105be22678810a59df.jpg"
    },
    {
        title: "Fullmetal Alchemist",
        description: "Two brothers search for a Philosopher's Stone after an attempt to revive their mother...",
        chapter: "Chap 108",
        volume: "Vol 27",
        status: "Completed",
        genres: ["Adventure", "Thriller", "Steampunk"],
        imageUrl: "https://i.pinimg.com/236x/3c/e4/5f/3ce45fd76df1d0a9b7b001cceb9e6c92.jpg"
     }
];