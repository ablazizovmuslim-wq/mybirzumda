/* =========================================
   Birzumda — данные о ботах (для bot.html)
   Чтобы добавить нового бота — скопируй блок и поменяй тексты
   ========================================= */

const BOTS = {
  yukla: {
    icon: '📥',
    name: 'Birzumda Yukla',
    username: 'Birzumda_Yukla_bot',
    channel: 'Birzumda_Goloslar',
    video: '',                       // сюда путь к видео-инструкции, напр. 'media/yukla.mp4'
    desc: {
      uz: "Instagram, YouTube, Pinterest, TikTok va Facebookʼdan videolarni bir zumda, suv belgisiz yuklab beradi.",
      ru: 'Скачивает видео из Instagram, YouTube, Pinterest, TikTok и Facebook в один миг, без водяных знаков.',
      en: 'Downloads videos from Instagram, YouTube, Pinterest, TikTok and Facebook in an instant, without watermarks.'
    },
    steps: {
      uz: [
        ['🚀', 'Botni oching', '@Birzumda_Yukla_bot ga kiring va «Start» tugmasini bosing'],
        ['🔗', 'Havolani yuboring', 'Instagram, YouTube, Pinterest, TikTok yoki Facebookʼdagi video havolasini nusxalab botga tashlang'],
        ['⚡', 'Videoni oling', 'Bot bir zumda videoni suv belgisiz yuboradi — galereyaga saqlang'],
        ['🔔', 'Kanalga qo\'shiling', 'Yangiliklar uchun @Birzumda_Goloslar kanali (ixtiyoriy)']
      ],
      ru: [
        ['🚀', 'Откройте бота', 'Зайдите в @Birzumda_Yukla_bot и нажмите «Start»'],
        ['🔗', 'Отправьте ссылку', 'Скопируйте ссылку на видео из Instagram, YouTube, Pinterest, TikTok или Facebook и отправьте боту'],
        ['⚡', 'Получите видео', 'Бот в один миг пришлёт видео без водяного знака — сохраните в галерею'],
        ['🔔', 'Подпишитесь', 'Новости в канале @Birzumda_Goloslar (по желанию)']
      ],
      en: [
        ['🚀', 'Open the bot', 'Go to @Birzumda_Yukla_bot and tap «Start»'],
        ['🔗', 'Send a link', 'Copy a video link from Instagram, YouTube, Pinterest, TikTok or Facebook and send it to the bot'],
        ['⚡', 'Get the video', 'The bot instantly sends the video without a watermark — save it'],
        ['🔔', 'Join the channel', 'News in @Birzumda_Goloslar (optional)']
      ]
    },
    // живая демо-переписка в «телефоне»
    demo: {
      uz: [['u', '/start'], ['b', "Salom! 👋 Video havolasini yuboring — bir zumda yuklab beraman ⚡"],
           ['u', 'https://instagram.com/reel/…'], ['b', '⏳ Yuklanmoqda…'], ['v', '🎬 video.mp4 · 12 MB'], ['b', '✅ Tayyor! Suv belgisiz 💜']],
      ru: [['u', '/start'], ['b', 'Привет! 👋 Пришлите ссылку на видео — скачаю в один миг ⚡'],
           ['u', 'https://instagram.com/reel/…'], ['b', '⏳ Загружаю…'], ['v', '🎬 video.mp4 · 12 MB'], ['b', '✅ Готово! Без водяного знака 💜']],
      en: [['u', '/start'], ['b', 'Hi! 👋 Send me a video link — I\'ll download it in an instant ⚡'],
           ['u', 'https://instagram.com/reel/…'], ['b', '⏳ Downloading…'], ['v', '🎬 video.mp4 · 12 MB'], ['b', '✅ Done! No watermark 💜']]
    },
    free: {
      uz: ['Instagram · YouTube · Pinterest · TikTok · Facebook', 'Cheksiz yuklash', 'Suv belgisiz', 'UZ / RU / EN tillarida', "Ro'yxatdan o'tish shart emas"],
      ru: ['Instagram · YouTube · Pinterest · TikTok · Facebook', 'Без ограничений', 'Без водяных знаков', 'На UZ / RU / EN', 'Без регистрации'],
      en: ['Instagram · YouTube · Pinterest · TikTok · Facebook', 'Unlimited downloads', 'No watermarks', 'In UZ / RU / EN', 'No sign-up needed']
    }
  },

  tayyorla: {
    icon: '📊',
    name: 'Birzumda Tayyorla',
    username: 'Birzumda_Tayyorla_bot',
    video: '',                       // сюда путь к видео-инструкции, напр. 'media/tayyorla.mp4'
    catalog: 'tayyorla-catalog.json', // запасная копия цен; свежие цены берутся с сервера
    desc: {
      uz: "Talabalar va ustozlar uchun taqdimot, portfolio, kurs ishi, mustaqil ish va boshqa ishlarni tez va chiroyli tayyorlaydi.",
      ru: 'Быстро и красиво готовит презентации, портфолио, курсовые, самостоятельные и другие работы для студентов и преподавателей.',
      en: 'Makes presentations, portfolios, term papers and other works for students and teachers — fast and beautiful.'
    },
    steps: {
      uz: [
        ['🚀', 'Botni oching', '@Birzumda_Tayyorla_bot ga kiring, «Start» bosing va tilni tanlang'],
        ['🛒', 'Ishni tanlang', '«Buyurtma berish» → talaba yoki ustoz → ish turi → paket (Start / Professional / Premium)'],
        ['📝', 'Savollarga javob bering', 'Mavzu, talablar va muddatni bot bosqichma-bosqich so\'raydi'],
        ['💳', "To'lov qiling", "Karta orqali to'lang va chekni yuboring — promokod va bonuslar ishlaydi"],
        ['✅', 'Tayyor ishni oling', "To'lov tasdiqlangach, ish darhol botga keladi. Tuzatishlar bepul 🔁"]
      ],
      ru: [
        ['🚀', 'Откройте бота', 'Зайдите в @Birzumda_Tayyorla_bot, нажмите «Start» и выберите язык'],
        ['🛒', 'Выберите работу', '«Заказать» → студент или преподаватель → вид работы → пакет (Start / Professional / Premium)'],
        ['📝', 'Ответьте на вопросы', 'Тему, требования и срок бот спросит пошагово'],
        ['💳', 'Оплатите', 'Оплата картой, отправьте чек — работают промокоды и бонусы'],
        ['✅', 'Получите работу', 'После подтверждения оплаты работа сразу придёт в бота. Правки бесплатно 🔁']
      ],
      en: [
        ['🚀', 'Open the bot', 'Go to @Birzumda_Tayyorla_bot, tap «Start» and pick a language'],
        ['🛒', 'Choose a work', '«Order» → student or teacher → type of work → plan (Start / Professional / Premium)'],
        ['📝', 'Answer questions', 'The bot asks for the topic, requirements and deadline step by step'],
        ['💳', 'Pay', 'Pay by card and send the receipt — promo codes and bonuses apply'],
        ['✅', 'Get your work', 'Once payment is confirmed, the work arrives in the bot right away. Free edits 🔁']
      ]
    },
    demo: {
      uz: [['u', '/start'], ['b', "Assalomu alaykum! 👋 Nima tayyorlaymiz?"], ['k', '🛒 Buyurtma berish'],
           ['b', '🎓 Talaba · Slayd · Professional — 30 000 so\'m'], ['u', 'Mavzu: Sun\'iy intellekt'],
           ['b', '✅ To\'lov tasdiqlandi! Ishingiz tayyor:'], ['f', '📎 Taqdimot.pptx · 18 slayd']],
      ru: [['u', '/start'], ['b', 'Здравствуйте! 👋 Что подготовим?'], ['k', '🛒 Заказать'],
           ['b', '🎓 Студент · Слайды · Professional — 30 000 сум'], ['u', 'Тема: Искусственный интеллект'],
           ['b', '✅ Оплата подтверждена! Ваша работа готова:'], ['f', '📎 Презентация.pptx · 18 слайдов']],
      en: [['u', '/start'], ['b', 'Hello! 👋 What shall we make?'], ['k', '🛒 Order'],
           ['b', '🎓 Student · Slides · Professional — 30 000 sum'], ['u', 'Topic: Artificial intelligence'],
           ['b', '✅ Payment confirmed! Your work is ready:'], ['f', '📎 Presentation.pptx · 18 slides']]
    }
  }
};
