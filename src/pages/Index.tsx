import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isHalal: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
  deliveryType: string;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState({ name: 'Ахмед Иванов', email: 'ahmed@example.com' });
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      date: '2024-09-05',
      items: [],
      total: 2450,
      status: 'Доставлен',
      deliveryType: 'Доставка'
    },
    {
      id: 2,
      date: '2024-09-01',
      items: [],
      total: 1890,
      status: 'В пути',
      deliveryType: 'Самовывоз'
    }
  ]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Говядина халяль отборная',
      price: 890,
      category: 'meat',
      image: '/img/52be4405-78cf-4286-b5ef-bba710c5d16f.jpg',
      description: 'Свежая говядина высшего сорта с сертификатом халяль',
      isHalal: true
    },
    {
      id: 2,
      name: 'Курица халяль',
      price: 320,
      category: 'meat',
      image: '/img/52be4405-78cf-4286-b5ef-bba710c5d16f.jpg',
      description: 'Охлажденная курица, сертифицированная халяль',
      isHalal: true
    },
    {
      id: 3,
      name: 'Колбаса халяль домашняя',
      price: 450,
      category: 'meat',
      image: '/img/52be4405-78cf-4286-b5ef-bba710c5d16f.jpg',
      description: 'Домашняя колбаса из говядины и баранины',
      isHalal: true
    },
    {
      id: 4,
      name: 'Беляши с мясом',
      price: 85,
      category: 'bakery',
      image: '/img/6ac4ec7a-f36b-49a6-9831-fd815337f0f8.jpg',
      description: 'Горячие беляши с сочной мясной начинкой',
      isHalal: true
    },
    {
      id: 5,
      name: 'Самса узбекская',
      price: 95,
      category: 'bakery',
      image: '/img/6ac4ec7a-f36b-49a6-9831-fd815337f0f8.jpg',
      description: 'Традиционная самса с бараниной и луком',
      isHalal: true
    },
    {
      id: 6,
      name: 'Плов узбекский',
      price: 280,
      category: 'ready',
      image: '/img/6ac4ec7a-f36b-49a6-9831-fd815337f0f8.jpg',
      description: 'Настоящий узбекский плов с мясом и морковью',
      isHalal: true
    },
    {
      id: 7,
      name: 'Манты с бараниной',
      price: 320,
      category: 'ready',
      image: '/img/6ac4ec7a-f36b-49a6-9831-fd815337f0f8.jpg',
      description: 'Паровые манты с сочной начинкой из баранины',
      isHalal: true
    },
    {
      id: 8,
      name: 'Шурпа домашняя',
      price: 220,
      category: 'ready',
      image: '/img/6ac4ec7a-f36b-49a6-9831-fd815337f0f8.jpg',
      description: 'Ароматная шурпа с мясом и овощами',
      isHalal: true
    },
    {
      id: 9,
      name: 'Чай зеленый узбекский',
      price: 180,
      category: 'drinks',
      image: '/img/6ac4ec7a-f36b-49a6-9831-fd815337f0f8.jpg',
      description: 'Качественный зеленый чай из Узбекистана',
      isHalal: true
    },
    {
      id: 10,
      name: 'Рис басмати отборный',
      price: 240,
      category: 'grains',
      image: '/img/6ac4ec7a-f36b-49a6-9831-fd815337f0f8.jpg',
      description: 'Длиннозерный рис басмати высшего качества',
      isHalal: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Store' },
    { id: 'meat', name: 'Мясо', icon: 'Beef' },
    { id: 'bakery', name: 'Выпечка', icon: 'Cookie' },
    { id: 'ready', name: 'Готовые блюда', icon: 'ChefHat' },
    { id: 'drinks', name: 'Напитки', icon: 'Coffee' },
    { id: 'grains', name: 'Крупы', icon: 'Wheat' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryType: 'delivery',
    notes: ''
  });

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder: Order = {
      id: orders.length + 1,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: getTotalPrice(),
      status: 'Обработка',
      deliveryType: orderForm.deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setOrderForm({ name: '', phone: '', address: '', deliveryType: 'delivery', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-desert-sand/20 to-sunset-orange/30" style={{ backgroundImage: `linear-gradient(45deg, rgba(252, 211, 77, 0.1) 0%, rgba(249, 115, 22, 0.2) 100%), url('https://cdn.poehali.dev/files/0d60cf81-1253-44bc-90d1-7715c12cfd4e.jpeg')`, backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-islamic-gold/95 to-golden-amber/95 backdrop-blur-md border-b border-warm-terracotta/30 sticky top-0 z-50" style={{ backgroundImage: `url('https://cdn.poehali.dev/files/ad07a1e9-24a3-4d83-acc2-69831d9f77f5.jpeg')`, backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🕌</div>
              <div>
                <h1 className="text-2xl font-bold text-warm-terracotta font-heading drop-shadow-md">Халяль Маркет</h1>
                <p className="text-sm text-warm-terracotta/80 font-body drop-shadow-sm">Восточные продукты высокого качества</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-heading">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8 font-body">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium font-body">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold font-body">
                          <span>Итого:</span>
                          <span>{getTotalPrice()} ₽</span>
                        </div>
                        <div className="space-y-4">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="name" className="font-body">Имя</Label>
                            <Input
                              id="name"
                              value={orderForm.name}
                              onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="phone" className="font-body">Телефон</Label>
                            <Input
                              id="phone"
                              value={orderForm.phone}
                              onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label className="font-body">Способ получения</Label>
                            <Select value={orderForm.deliveryType} onValueChange={(value) => setOrderForm(prev => ({ ...prev, deliveryType: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="delivery">Доставка</SelectItem>
                                <SelectItem value="pickup">Самовывоз</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {orderForm.deliveryType === 'delivery' && (
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="address" className="font-body">Адрес доставки</Label>
                              <Textarea
                                id="address"
                                value={orderForm.address}
                                onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                              />
                            </div>
                          )}
                          <Button className="w-full" onClick={handleOrder}>
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="User" size={20} />
                    <span className="font-body">Личный кабинет</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-heading">Личный кабинет</SheetTitle>
                  </SheetHeader>
                  <Tabs defaultValue="profile" className="mt-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="profile" className="font-body">Профиль</TabsTrigger>
                      <TabsTrigger value="orders" className="font-body">Заказы</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="font-body">Имя</Label>
                          <Input value={user.name} onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))} />
                        </div>
                        <div>
                          <Label className="font-body">Email</Label>
                          <Input value={user.email} onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} />
                        </div>
                        <Button>Сохранить изменения</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="orders" className="space-y-4">
                      {orders.map(order => (
                        <Card key={order.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-sm font-heading">Заказ #{order.id}</CardTitle>
                              <Badge variant={order.status === 'Доставлен' ? 'default' : 'secondary'}>
                                {order.status}
                              </Badge>
                            </div>
                            <CardDescription className="font-body">{order.date} • {order.deliveryType}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <div className="text-right">
                              <p className="font-semibold font-body">{order.total} ₽</p>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 py-12 bg-gradient-to-r from-islamic-gold/20 to-golden-amber/30 rounded-2xl border border-desert-sand/50 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-warm-terracotta mb-4 font-heading drop-shadow-lg">
              🌙 Добро пожаловать в Халяль Маркет
            </h2>
            <p className="text-lg text-muted-foreground mb-6 font-body">
              Качественные халяльные продукты и восточные деликатесы с доставкой на дом
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground font-body">
              <div className="flex items-center space-x-2">
                <Icon name="ShieldCheck" size={16} />
                <span>100% Халяль</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>Быстрая доставка</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} />
                <span>Высокое качество</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon name={category.icon as any} size={16} />
                <span className="font-body">{category.name}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-heading">{product.name}</CardTitle>
                  {product.isHalal && (
                    <Badge variant="secondary" className="bg-mosque-green/20 text-mosque-green border border-mosque-green/30">
                      ✓ Халяль
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm font-body">{product.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary font-body">{product.price} ₽</span>
                <Button onClick={() => addToCart(product)} size="sm">
                  <Icon name="Plus" size={16} />
                  <span className="font-body">В корзину</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

        {/* About Section */}
        <section className="mt-16 py-12 bg-white/50 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-warm-terracotta mb-6 font-heading drop-shadow-md">О нашем магазине</h3>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-2xl mb-2">🥩</div>
                <h4 className="font-semibold mb-2 font-heading">Только халяль продукция</h4>
                <p className="text-muted-foreground font-body">Все наши продукты имеют соответствующие сертификаты качества</p>
              </div>
              <div>
                <div className="text-2xl mb-2">👨‍🍳</div>
                <h4 className="font-semibold mb-2 font-heading">Собственная кухня</h4>
                <p className="text-muted-foreground font-body">Готовим традиционные восточные блюда по семейным рецептам</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🚚</div>
                <h4 className="font-semibold mb-2 font-heading">Доставка и самовывоз</h4>
                <p className="text-muted-foreground font-body">Удобная доставка по городу или самовывоз из нашего магазина</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-br from-islamic-gold/20 to-golden-amber/30 rounded-lg border border-desert-sand/50">
              <h4 className="font-semibold text-warm-terracotta mb-2 font-heading">📍 Контакты</h4>
              <p className="text-sm text-muted-foreground mb-1 font-body">г. Москва, ул. Восточная, д. 15</p>
              <p className="text-sm text-muted-foreground mb-1 font-body">📞 +7 (495) 123-45-67</p>
              <p className="text-sm text-muted-foreground font-body">⏰ Ежедневно с 9:00 до 21:00</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;