import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AnimeItem {
  id: number;
  title: string;
  rating: number;
  year: number;
  genre: string;
  image: string;
}

interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  animeList: AnimeItem[];
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

const mockCollections: Collection[] = [
  {
    id: 1,
    title: "Топ самых смешных аниме",
    description: "Подборка аниме, которые заставят вас смеяться до слез",
    image: "/img/b7b823bb-aa47-4203-950c-d18001233732.jpg",
    likes: 247,
    animeList: [
      { id: 1, title: "Gintama", rating: 9.0, year: 2006, genre: "Комедия", image: "/img/b7b823bb-aa47-4203-950c-d18001233732.jpg" },
      { id: 2, title: "One Punch Man", rating: 8.7, year: 2015, genre: "Комедия", image: "/img/c7bb823b-612f-4e3e-b701-be39287bc5c8.jpg" },
      { id: 3, title: "Konosuba", rating: 8.1, year: 2016, genre: "Комедия", image: "/img/6aac4bc7-a258-4b53-84d8-9b10dc1a735a.jpg" }
    ],
    comments: [
      { id: 1, author: "АнимеФан", text: "Отличная подборка! Gintama просто шедевр комедии", date: "2024-01-15" },
      { id: 2, author: "Отаку2024", text: "А где Mob Psycho 100? Тоже очень смешное аниме", date: "2024-01-16" }
    ]
  },
  {
    id: 2,
    title: "Топ аниме, где ГГ злодей",
    description: "Аниме с протагонистами, которые не боятся быть плохими",
    image: "/img/c7bb823b-612f-4e3e-b701-be39287bc5c8.jpg",
    likes: 189,
    animeList: [
      { id: 4, title: "Death Note", rating: 9.0, year: 2006, genre: "Психологический триллер", image: "/img/c7bb823b-612f-4e3e-b701-be39287bc5c8.jpg" },
      { id: 5, title: "Code Geass", rating: 8.9, year: 2006, genre: "Меха", image: "/img/6aac4bc7-a258-4b53-84d8-9b10dc1a735a.jpg" },
      { id: 6, title: "Overlord", rating: 8.0, year: 2015, genre: "Isekai", image: "/img/b7b823bb-aa47-4203-950c-d18001233732.jpg" }
    ],
    comments: [
      { id: 3, author: "DarkLord", text: "Light Yagami лучший злодей всех времен!", date: "2024-01-14" }
    ]
  },
  {
    id: 3,
    title: "Лучшие романтические аниме",
    description: "Трогательные истории любви, которые растопят ваше сердце",
    image: "/img/6aac4bc7-a258-4b53-84d8-9b10dc1a735a.jpg",
    likes: 324,
    animeList: [
      { id: 7, title: "Your Name", rating: 8.4, year: 2016, genre: "Романтика", image: "/img/6aac4bc7-a258-4b53-84d8-9b10dc1a735a.jpg" },
      { id: 8, title: "Toradora!", rating: 8.1, year: 2008, genre: "Романтика", image: "/img/b7b823bb-aa47-4203-950c-d18001233732.jpg" },
      { id: 9, title: "Kimi ni Todoke", rating: 8.0, year: 2009, genre: "Романтика", image: "/img/c7bb823b-612f-4e3e-b701-be39287bc5c8.jpg" }
    ],
    comments: []
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [collections] = useState(mockCollections);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    setUser(savedUser);
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Play" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AnimeCollections
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <Icon name="User" size={20} />
                <span className="font-medium">{user}</span>
                <Button variant="outline" size="sm" onClick={() => {
                  localStorage.removeItem('user');
                  setUser(null);
                }}>
                  Выйти
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate('/auth')} className="hover-scale">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in">
            Лучшие подборки аниме
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Откройте для себя новые миры через тщательно отобранные коллекции аниме
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Card 
                key={collection.id} 
                className="anime-card cursor-pointer group"
                onClick={() => navigate(`/collection/${collection.id}`)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                    {collection.animeList.length} аниме
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {collection.title}
                  </CardTitle>
                  <CardDescription>{collection.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Heart" size={16} />
                      <span>{collection.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MessageCircle" size={16} />
                      <span>{collection.comments.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}