import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
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

export default function Collection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    setUser(savedUser);
    
    const collectionId = parseInt(id || '0');
    const foundCollection = mockCollections.find(c => c.id === collectionId);
    setCollection(foundCollection || null);
  }, [id]);

  const addComment = () => {
    if (!collection || !newComment.trim() || !user) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: user,
      text: newComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setCollection({
      ...collection,
      comments: [...collection.comments, comment]
    });

    setNewComment('');
  };

  const toggleLike = () => {
    if (!collection) return;
    
    setCollection({
      ...collection,
      likes: isLiked ? collection.likes - 1 : collection.likes + 1
    });
    setIsLiked(!isLiked);
  };

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Подборка не найдена</h1>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            На главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="hover-scale"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Play" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AnimeCollections
              </h1>
            </div>
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

      {/* Collection Hero */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img 
              src={collection.image} 
              alt={collection.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in">
                    {collection.title}
                  </h1>
                  <p className="text-lg text-white/90 mb-4 animate-fade-in">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-4 animate-fade-in">
                    <Badge className="bg-background/90 text-foreground">
                      {collection.animeList.length} аниме
                    </Badge>
                    <div className="flex items-center gap-2 text-white/80">
                      <Icon name="MessageCircle" size={16} />
                      <span>{collection.comments.length} комментариев</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={toggleLike}
                  variant={isLiked ? "default" : "secondary"}
                  className="hover-scale"
                >
                  <Icon name="Heart" size={16} className={`mr-2 ${isLiked ? 'text-white' : ''}`} />
                  {collection.likes}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anime Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Аниме в подборке</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collection.animeList.map((anime) => (
              <Card key={anime.id} className="anime-card hover-scale">
                <div className="relative">
                  <img 
                    src={anime.image} 
                    alt={anime.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-background/90 text-foreground flex items-center gap-1">
                      <Icon name="Star" size={12} className="text-yellow-500" />
                      {anime.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{anime.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{anime.year}</span>
                    <Badge variant="secondary">{anime.genre}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon name="MessageCircle" size={24} />
            Комментарии ({collection.comments.length})
          </h2>
          
          {/* Add Comment */}
          {user ? (
            <div className="mb-8 space-y-4">
              <Textarea
                placeholder="Поделитесь своим мнением о подборке..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={addComment} disabled={!newComment.trim()} className="hover-scale">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить комментарий
              </Button>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-background rounded-lg border text-center">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Присоединяйтесь к обсуждению!</h3>
              <p className="text-muted-foreground mb-4">
                Войдите в аккаунт, чтобы оставить комментарий
              </p>
              <Button onClick={() => navigate('/auth')} className="hover-scale">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {collection.comments.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Пока нет комментариев. Будьте первым!
                </p>
              </div>
            ) : (
              collection.comments.map((comment) => (
                <Card key={comment.id} className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{comment.author}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <p className="text-foreground leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}