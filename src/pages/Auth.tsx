import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function Auth() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    
    // Сохраняем пользователя в localStorage
    localStorage.setItem('user', username);
    
    // Возвращаемся на главную страницу
    navigate('/');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    
    // Сохраняем пользователя в localStorage
    localStorage.setItem('user', username);
    
    // Возвращаемся на главную страницу
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="hover-scale"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          На главную
        </Button>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Play" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AnimeCollections
          </h1>
        </div>

        <Card className="animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isRegisterMode ? 'Регистрация' : 'Авторизация'}
            </CardTitle>
            <CardDescription>
              {error === 'like' ? (
                <span className="text-destructive">⚠️ Для того чтобы ставить лайки, необходимо авторизоваться</span>
              ) : (
                isRegisterMode 
                  ? 'Создайте аккаунт для участия в обсуждениях' 
                  : 'Войдите в свой аккаунт'
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input id="username" name="username" required placeholder="Введите имя пользователя" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" name="password" type="password" required placeholder="Введите пароль" />
              </div>
              
              {isRegisterMode && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" required placeholder="Повторите пароль" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="Введите email" />
                  </div>
                </>
              )}
              
              <div className="flex flex-col gap-3 pt-4">
                <Button type="submit" className="w-full hover-scale">
                  <Icon name={isRegisterMode ? "UserPlus" : "LogIn"} size={16} className="mr-2" />
                  {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">или</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="w-full"
                >
                  {isRegisterMode 
                    ? 'Уже есть аккаунт? Войти' 
                    : 'Нет аккаунта? Регистрация'
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Присоединяйтесь к сообществу любителей аниме!</p>
        </div>
      </div>
    </div>
  );
}