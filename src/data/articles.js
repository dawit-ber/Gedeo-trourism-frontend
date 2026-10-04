import { photos } from './siteData.js';

export const articles = [
  {
    slug: 'coffee-ceremony-and-hospitality',
    isNew: true,
    title: 'Coffee Ceremony and the Gedeo Tradition of Welcome',
    category: 'Culture & Heritage',
    readTime: '4 min read',
    image: photos.coffee,
    summary: 'Explore how preparing and sharing coffee creates time for hospitality, conversation, and connection.',
    paragraphs: [
      'In Gedeo, sharing coffee is a warm invitation to pause and spend time together. The ceremony brings family, neighbors, and visitors into conversation, making hospitality part of everyday life.',
      'Coffee is prepared with care and shared over several rounds. The gathering gives people time to exchange news, welcome guests, and strengthen the relationships that hold a community together.',
      'Visitors can learn about the ceremony by joining with a local host. Ask before taking photographs, follow your host’s lead, and take time to enjoy the welcome.'
    ],
  },
  {
    slug: 'life-in-the-gedeo-highlands',
    title: 'A Journey Through the Gedeo Highlands',
    category: 'Travel & Nature',
    readTime: '5 min read',
    image: photos.travel,
    summary: 'A slower journey through green highland scenery, local communities, and places best explored with local guidance.',
    paragraphs: [
      'The Gedeo highlands reward travelers who leave room in the day to look around. Landscapes, farms, and towns sit alongside the traditions and daily routines of the people who call this region home.',
      'A local guide can help shape a route around your interests and current conditions. Ask about walking distances, transport, and the best way to visit community and heritage sites respectfully.',
      'Plan for changing weather and carry Ethiopian birr for small purchases and local transport. The Travel Guide page has more itinerary ideas and practical information.'
    ],
  },
  {
    slug: 'celebrating-dararo',
    title: 'Celebrating Dararo Together',
    category: 'Festivals',
    readTime: '3 min read',
    image: photos.dararo,
    summary: 'Learn about Dararo as a time for community, shared heritage, and celebration in Gedeo.',
    paragraphs: [
      'Festivals offer a chance to experience Gedeo heritage through community gatherings, music, and shared traditions. Dararo is celebrated as an occasion to come together and honor cultural identity.',
      'Event programs and arrangements can vary. Check the Events page or contact local organizers for current dates, locations, and visitor information before making travel plans.',
      'When attending, follow local guidance and ask permission before photographing people or private ceremonies. A respectful visit helps make the celebration welcoming for everyone.'
    ],
  },
];
