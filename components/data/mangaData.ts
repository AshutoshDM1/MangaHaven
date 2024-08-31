export interface MangaItem {
    title: string;
    description: string;
    chapter: string;
    volume: string;
    genres: string[];
    imageUrl: string;
}
  
export const mangaItems: MangaItem[] = [
{
    title: "Berserk",
    description: "Guts, a former mercenary now known as the \"Black Swordsman\"...",
    chapter: "Chap 376",
    volume: "Vol 42",
    genres: ["Action", "Drama", "Super Power"],
    imageUrl: "https://i.pinimg.com/564x/84/98/b0/8498b0637947effcae670f59b0cb7a55.jpg"
},
{
    title: "The Rising of the Shield Hero",
    description: "Twenty-year-old high-schooler otaku Naofumi Iwatani is mysteriously...",
    chapter: "Chap 108",
    volume: "Vol 26",
    genres: ["Action", "Drama", "Isekai"],
    imageUrl: "https://i.pinimg.com/564x/84/46/f8/8446f8bb8d77eb5b228da5317074b3ae.jpg"
},
{
    title: "One-Punch Man",
    description: "After rigorously training for three years, the ordinary Saitama has...",
    chapter: "Chap 230",
    volume: "Vol 31",
    genres: ["Action", "Comedy", "Parody"],
    imageUrl: "https://i.pinimg.com/564x/7b/da/ae/7bdaae5c9070e5e980568eb1dbd5810a.jpg"
},
// Add more items as needed
];