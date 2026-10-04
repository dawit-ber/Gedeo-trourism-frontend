import homeHero from '../asset/home.jpg';
import foodPhoto from '../asset/food.jpg';
import cultureimg from '../asset/culture.jpg';
import fallsWater from '../asset/fallwater.jpg'
import coffeePhoto from '../asset/coffe.jpeg';
import dancePhoto from '../asset/dance.jpeg';
import dararoPhoto from '../asset/dararo.jpeg';
import livelihoodPhoto from '../asset/livehood.jpeg';
import historicalPhoto from '../asset/historical.jpg';
import libraryPhoto from '../asset/library.jpg';
import travelPhoto from '../asset/travel.jpg';
import lodgePhoto from '../asset/lodge.jpg';
import articlePhoto from '../asset/article.jpg';

export const photos = {
  hero: homeHero,
  food: foodPhoto,
  coffee: coffeePhoto,
  dance: dancePhoto,
  dararo: dararoPhoto,
  livelihood: livelihoodPhoto,
  historical: historicalPhoto,
  library: libraryPhoto,
  travel: travelPhoto,
  lodge: lodgePhoto,
  article: articlePhoto,
  falls: fallsWater,
  hills: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85',
  lake: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
  culture: cultureimg,
  people: cultureimg,
};
export const destinationResults = [
  { title: 'Yirgacheffe', type: 'Coffee Heritage', photo: photos.hills, category: 'Coffee & Agriculture', location: 'Yirgacheffe' },
  { title: 'Wenago Falls', type: 'Nature & Waterfalls', photo: photos.falls, category: 'Waterfalls', location: 'Wenago' },
  { title: 'Dilla Lake', type: 'Lakes & Islands', photo: photos.lake, category: 'Lakes & Islands', location: 'Dilla' },
  { title: 'Bule Hora', type: 'Culture & Heritage', photo: photos.culture, category: 'Cultural Sites', location: 'Bule Hora' },
  { title: 'Wenago Forest', type: 'Nature & Parks', photo: photos.hills, category: 'Nature & Parks', location: 'Wenago' },
  { title: 'Gedeo Mountains', type: 'Culture & Heritage', photo: photos.lake, category: 'Historical Sites', location: 'Dilla' },
];

export const events = [
  { slug: 'gedeo-coffee-festival', month: 'OCT', day: '12', title: 'Gedeo Coffee Festival', place: 'Yirgacheffe, Gedeo Zone', desc: 'Celebrate the world-famous Gedeo coffee with farmers, music and local food.', tag: 'Festivals', img: photos.coffee },
  { slug: 'cultural-dance-festival', month: 'NOV', day: '03', title: 'Cultural Dance Festival', place: 'Dilla', desc: 'Traditional dance, music and cultural performances from across Gedeo.', tag: 'Cultural Events', img: photos.dance },
  { slug: 'dararo-festival', month: 'DEC', day: '15', title: 'Dararo Festival', place: 'Dilla Main', desc: 'Join the community for a traditional Dararo festival celebrating Gedeo culture and shared heritage.', tag: 'Festivals', img: photos.dararo, isNew: true },
  { slug: 'coffee-craft-workshop', month: 'JAN', day: '22', title: 'Coffee & Craft Workshop', place: 'Yirgacheffe', desc: 'Learn about coffee traditions and Gedeo handmade crafts.', tag: 'Workshops', img: photos.hills },
];

export const libraryBooks = [
  { slug: 'gedeo-culture-and-traditions', title: 'Gedeo Culture and Traditions', type: 'Book', year: '2025', category: 'Books', img: photos.culture, preview: 'Discover the traditions, values, and everyday practices that shape Gedeo community life. This preview introduces the role of coffee ceremonies, shared work, and oral storytelling in passing knowledge between generations.' },
  { slug: 'coffee-and-livelihoods', title: 'Coffee and Livelihoods', type: 'Research', year: '2022', category: 'Research Papers', img: photos.livelihood, preview: 'This research preview looks at how coffee growing supports households and local economies. It introduces the relationship between farming practices, family livelihoods, and the coffee trade.' },
  { slug: 'gedeo-history', title: 'Gedeo History', type: 'Book', year: '2021', category: 'Books', img: photos.historical, preview: 'Explore an introduction to Gedeo history, local heritage, and the stories communities preserve. This preview highlights the importance of place, memory, and cultural identity.' },
  { slug: 'sustainable-tourism', title: 'Sustainable Tourism', type: 'Report', year: '2022', category: 'Reports', img: photos.falls, preview: 'This report preview introduces community-led tourism and ways to care for natural and cultural heritage while welcoming visitors.' },
  { slug: 'local-governance', title: 'Local Governance', type: 'Report', year: '2021', category: 'Reports', img: photos.lake, preview: 'Read an overview of local governance and community participation, with a focus on collaboration and development priorities.' },
  { slug: 'gedeo-language-and-culture', title: 'Gedeo Language & Culture', type: 'Book', year: '2021', category: 'E-Books', img: photos.culture, preview: 'An introduction to Gedeo language and culture, including expressions, oral traditions, and the role language plays in cultural continuity.' },
  { slug: 'highland-coffee-study', title: 'Highland Coffee Study', type: 'Research', year: '2024', category: 'Research Papers', img: photos.hills, preview: 'This study preview introduces highland coffee growing environments and the communities whose knowledge and work sustain coffee production.' },
  { slug: 'stories-from-gedeo', title: 'Stories from Gedeo', type: 'E-Book', year: '2023', category: 'E-Books', img: photos.people, preview: 'A preview of stories shared across generations, offering glimpses into Gedeo community life, values, and heritage.' },
];
