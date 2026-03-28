
import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Menu, 
  X,
  Droplets,
  Wind,
  Sparkles,
  Building2,
  Truck,
  Shield,
  CreditCard,
  Calendar
} from 'lucide-react';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'professional' | 'household'>('all');
  const [formData, setFormData] = useState({ name: '', phone: '', equipment: '', date: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const equipment = [
    { id: 1, name: 'Kärcher Puzzi 10/1', category: 'professional', price: 1500, image: '🧹', description: 'Профессиональный экстрактор для глубокой чистки ковров и мягкой мебели' },
    { id: 2, name: 'Kärcher HD 5/15', category: 'professional', price: 1200, image: '💦', description: 'Аппарат высокого давления для мойки фасадов и территорий' },
    { id: 3, name: 'Numatic Henry HVR 200', category: 'professional', price: 800, image: '🌀', description: 'Промышленный пылесос для сухой уборки больших площадей' },
    { id: 4, name: 'Kärcher SC 4', category: 'household', price: 600, image: '♨️', description: 'Пароочиститель для дезинфекции и удаления сложных загрязнений' },
    { id: 5, name: 'Thomas Aqua Pet & Family', category: 'household', price: 900, image: '🏠', description: 'Моющий пылесос для дома с функцией аквафильтра' },
    { id: 6, name: 'Nilfisk-ALTO Attix 33', category: 'professional', price: 1100, image: '🏭', description: 'Промышленный пылесос для строительства и производства' },
  ];

  const filteredEquipment = activeCategory === 'all' ? equipment : equipment.filter(e => e.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', phone: '', equipment: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Sparkles size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">CleanRent</h1>
                <p className="text-xs text-slate-500">Аренда клинингового оборудования</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Каталог</a>
              <a href="#benefits" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Преимущества</a>
              <a href="#reviews" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Отзывы</a>
              <a href="#contacts" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Контакты</a>
              <a href="tel:+74951234567" className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200">
                <Phone size={18} /> +7 (495) 123-45-67
              </a>
            </nav>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4">
            <nav className="flex flex-col px-4 space-y-3">
              <a href="#catalog" className="text-slate-600 hover:text-cyan-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Каталог</a>
              <a href="#benefits" className="text-slate-600 hover:text-cyan-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Преимущества</a>
              <a href="#reviews" className="text-slate-600 hover:text-cyan-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Отзывы</a>
              <a href="#contacts" className="text-slate-600 hover:text-cyan-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
              <a href="tel:+74951234567" className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-3 rounded-full font-semibold justify-center">
                <Phone size={18} /> +7 (495) 123-45-67
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star size={16} fill="currentColor" /> №1 по аренде в Москве
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Профессиональное <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">клининговое оборудование</span> в аренду
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Арендуйте мощные моющие пылесосы, пароочистители и аппараты высокого давления от ведущих брендов. Доставка по Москве за 2 часа.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#catalog" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan-300 transition-all transform hover:-translate-y-1">
                  Выбрать оборудование <ArrowRight size={20} />
                </a>
                <a href="#contacts" className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-slate-200 hover:border-cyan-600 hover:text-cyan-600 transition-all">
                  Узнать условия
                </a>
              </div>
              <div className="flex gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">50+</div>
                  <div className="text-slate-500 text-sm">Единиц техники</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">2 часа</div>
                  <div className="text-slate-500 text-sm">Доставка</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">24/7</div>
                  <div className="text-slate-500 text-sm">Поддержка</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white text-center">
                    <Droplets size={40} className="mx-auto mb-3" />
                    <div className="font-bold text-lg">Моющие</div>
                    <div className="text-cyan-100 text-sm">пылесосы</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white text-center">
                    <Wind size={40} className="mx-auto mb-3" />
                    <div className="font-bold text-lg">Паро-</div>
                    <div className="text-emerald-100 text-sm">очистители</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
                    <Building2 size={40} className="mx-auto mb-3" />
                    <div className="font-bold text-lg">АВД</div>
                    <div className="text-orange-100 text-sm">для фасадов</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center">
                    <Sparkles size={40} className="mx-auto mb-3" />
                    <div className="font-bold text-lg">Для дома</div>
                    <div className="text-purple-100 text-sm">и офиса</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Каталог оборудования</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Широкий выбор профессиональной и бытовой техники для любых задач</p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCategory === 'all' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Всё оборудование
            </button>
            <button 
              onClick={() => setActiveCategory('professional')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCategory === 'professional' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Профессиональное
            </button>
            <button 
              onClick={() => setActiveCategory('household')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${activeCategory === 'household' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Для дома
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEquipment.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-cyan-500 hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-slate-50 to-cyan-50 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform">
                  {item.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.category === 'professional' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {item.category === 'professional' ? 'Профессиональное' : 'Для дома'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-cyan-600">{item.price} ₽<span className="text-sm text-slate-500 font-normal">/сутки</span></div>
                    <a href="#order" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-cyan-700 transition-colors text-sm">
                      Заказать
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Надёжный партнёр для чистоты вашего пространства</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Быстрая доставка', desc: 'Доставим и подключим оборудование за 2 часа по Москве' },
              { icon: Shield, title: 'Гарантия качества', desc: 'Всё оборудование проходит регулярное ТО и дезинфекцию' },
              { icon: CreditCard, title: 'Выгодные цены', desc: 'От 600 ₽/сутки. Скидки при длительной аренде' },
              { icon: Calendar, title: 'Гибкие условия', desc: 'Аренда от 1 дня до нескольких месяцев' },
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-slate-600">Более 500 довольных клиентов в Москве</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Александр Петров', role: 'Управляющий ЖК "Северный"', text: 'Заказывали профессиональные пылесосы для уборки после ремонта. Оборудование в отличном состоянии, доставили вовремя!' },
              { name: 'Елена Смирнова', role: 'Клининговая компания', text: 'Работаем с CleanRent уже год. Надёжный партнёр, всегда исправная техника и адекватные цены.' },
              { name: 'Дмитрий Козлов', role: 'Частный клиент', text: 'Брал пароочиститель для генеральной уборки квартиры. Всё чисто, продезинфицировано. Рекомендую!' },
            ].map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl p-8 relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#06b6d4" className="text-cyan-500" />)}
                </div>
                <p className="text-slate-700 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-sm text-slate-500">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-20 bg-gradient-to-br from-cyan-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Забронировать оборудование</h2>
              <p className="text-xl text-slate-600">Оставьте заявку, и мы свяжемся с вами в течение 15 минут</p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Заявка отправлена!</h3>
                <p className="text-slate-600">Наш менеджер свяжется с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ваше имя</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Телефон</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Какое оборудование вас интересует?</label>
                  <select 
                    value={formData.equipment}
                    onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    <option value="">Выберите из каталога</option>
                    {equipment.map(item => (
                      <option key={item.id} value={item.name}>{item.name} — {item.price} ₽/сутки</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Желаемая дата получения</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-300 transition-all transform hover:-translate-y-1">
                  Отправить заявку
                </button>
                <p className="text-center text-sm text-slate-500">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Контакты</h2>
              <p className="text-xl text-slate-600 mb-8">Свяжитесь с нами любым удобным способом</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">Телефон</div>
                    <a href="tel:+74951234567" className="text-cyan-600 hover:underline text-lg">+7 (495) 123-45-67</a>
                    <div className="text-slate-500 text-sm">Ежедневно с 8:00 до 22:00</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">Адрес</div>
                    <p className="text-slate-600">г. Москва, ул. Лесная, д. 5, офис 301</p>
                    <p className="text-slate-500 text-sm">5 минут от м. Белорусская</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">Режим работы</div>
                    <p className="text-slate-600">Пункт выдачи: ежедневно 8:00 - 22:00</p>
                    <p className="text-slate-600">Доставка: круглосуточно</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.588144%2C55.789406&z=16&pt=37.588144,55.789406"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
                <div className="text-xl font-bold">CleanRent</div>
              </div>
              <p className="text-slate-400 text-sm">Профессиональное клининговое оборудование в аренду по Москве и МО</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Моющие пылесосы</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Пароочистители</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">АВД</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Промышленные пылесосы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Условия аренды</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>+7 (495) 123-45-67</li>
                <li>info@cleanrent.ru</li>
                <li>Москва, ул. Лесная, 5</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 CleanRent. Все права защищены.</p>
            <div className="flex gap-6 text-slate-500 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
