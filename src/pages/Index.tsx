import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<string | null>(null);
  const [collections, setCollections] = useState(mockCollections);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    setUser(username);
    setIsAuthOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    setUser(username);
    setIsAuthOpen(false);
  };

  const addComment = () => {
    if (!selectedCollection || !newComment.trim() || !user) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: user,
      text: newComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setCollections(collections.map(col => 
      col.id === selectedCollection.id 
        ? { ...col, comments: [...col.comments, comment] }
        : col
    ));

    setSelectedCollection({
      ...selectedCollection,
      comments: [...selectedCollection.comments, comment]
    });

    setNewComment('');
  };

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
                <Button variant="outline" size="sm" onClick={() => setUser(null)}>
                  Выйти
                </Button>
              </div>
            ) : (
              <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <DialogTrigger asChild>
                  <Button className="hover-scale">
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {isRegisterMode ? 'Регистрация' : 'Авторизация'}
                    </DialogTitle>
                    <DialogDescription>
                      {isRegisterMode 
                        ? 'Создайте аккаунт для комментариев' 
                        : 'Войдите в свой аккаунт'
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Имя пользователя</Label>
                      <Input id="username" name="username" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input id="password" name="password" type="password" required />
                    </div>
                    {isRegisterMode && (
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2">
                      <Button type="submit" className="w-full">
                        {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setIsRegisterMode(!isRegisterMode)}
                      >
                        {isRegisterMode 
                          ? 'Уже есть аккаунт? Войти' 
                          : 'Нет аккаунта? Регистрация'
                        }
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
                onClick={() => setSelectedCollection(collection)}
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

      {/* Collection Modal */}
      {selectedCollection && (
        <Dialog open={!!selectedCollection} onOpenChange={() => setSelectedCollection(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedCollection.title}</DialogTitle>
              <DialogDescription>{selectedCollection.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Anime List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCollection.animeList.map((anime) => (
                  <Card key={anime.id} className="hover-scale">
                    <div className="relative">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{anime.title}</h4>
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span>{anime.year}</span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500" />
                          <span>{anime.rating}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mt-2">
                        {anime.genre}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comments Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Комментарии ({selectedCollection.comments.length})
                </h3>
                
                {/* Add Comment */}
                {user ? (
                  <div className="mb-6 space-y-3">
                    <Textarea
                      placeholder="Напишите ваш комментарий..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button onClick={addComment} disabled={!newComment.trim()}>
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить
                    </Button>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-muted rounded-lg text-center">
                    <p className="text-muted-foreground">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto font-semibold"
                        onClick={() => setIsAuthOpen(true)}
                      >
                        Войдите
                      </Button>
                      {' '}чтобы оставить комментарий
                    </p>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {selectedCollection.comments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Пока нет комментариев. Будьте первым!
                    </p>
                  ) : (
                    selectedCollection.comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon name="User" size={16} />
                            <span className="font-medium">{comment.author}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}