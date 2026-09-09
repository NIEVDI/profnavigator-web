export const QUESTIONS = [
  { text: "Мне нравится разбираться, как работают компьютеры, программы и цифровые сервисы.", weights: { it: 3, digital: 2, engineering: 1 } },
  { text: "Мне интересно создавать сайты, приложения или другие цифровые продукты.", weights: { it: 3, digital: 2, creative: 1 } },
  { text: "Мне нравится собирать, чинить и настраивать технику.", weights: { engineering: 2, tech: 2, machinery: 2 } },
  { text: "Мне интересны электроника, схемы, датчики и автоматизация.", weights: { electronics: 2, automation: 2, engineering: 1 } },
  { text: "Мне хотелось бы работать с производством, станками, оборудованием или роботизированными линиями.", weights: { production: 1, machinery: 1, engineering: 1 } },
  { text: "Мне нравится точность, контроль качества, инструкции и работа по понятным правилам.", weights: { quality: 3, business: 1, engineering: 1 } },
  { text: "Мне интересно строительство, эксплуатация зданий и практические инженерные задачи.", weights: { construction: 3, production: 2, engineering: 1 } },
  { text: "Мне нравится разбираться в транспорте, перевозках, машинах и логистике.", weights: { transport: 3, business: 1, machinery: 1 } },
  { text: "Мне нравится помогать людям, объяснять материал и поддерживать других.", weights: { education: 2, social: 2, humanitarian: 2, sport: 1 } },
  { text: "Мне было бы интересно работать с детьми или подростками.", weights: { education: 2, social: 2, humanitarian: 2, sport: 1 } },
  { text: "Мне важны общение, поддержка людей и участие в решении их жизненных трудностей.", weights: { social: 3, humanitarian: 2, service: 1 } },
  { text: "Мне нравится сфера сервиса, гостеприимства и работа с клиентами.", weights: { service: 3, business: 1, social: 1 } },
  { text: "Мне интересно готовить, создавать блюда или работать в ресторанной сфере.", weights: { service: 3, creative: 1 } },
  { text: "Мне нравится работать с документами, расчётами, финансами и организацией процессов.", weights: { business: 3, law: 1, digital: 1 } },
  { text: "Мне интересны право, порядок, ответственность и применение норм и правил.", weights: { law: 3, business: 1, social: 1 } },
  { text: "Мне нравится придумывать идеи, оформлять что-то визуально и заниматься дизайном.", weights: { creative: 3, design: 2, service: 1 } },
  { text: "Мне интересны стиль, внешний образ, индустрия красоты или мода.", weights: { creative: 2, design: 2, service: 2 } },
  { text: "Мне нравится физическая активность, тренировки и спортивная деятельность.", weights: { sport: 2, education: 1, social: 1 } },
  { text: "Мне интересны сельское хозяйство, техника для него и работа с природными процессами.", weights: { agro: 3, machinery: 1, production: 1 } },
  { text: "Мне легче работать там, где нужен практический результат, а не только теория.", weights: { production: 1, machinery: 1, service: 1, agro: 2 } },
]

export const TAG_LABELS = {
  it: "Программирование и цифровые технологии",
  digital: "Цифровая среда",
  security: "Информационная безопасность",
  electronics: "Электроника",
  automation: "Автоматизация",
  engineering: "Инженерия",
  tech: "Технологии",
  energy: "Энергетика",
  quality: "Качество",
  machinery: "Машины и механизмы",
  production: "Производство",
  construction: "Строительство",
  transport: "Транспорт",
  agro: "Сельское хозяйство",
  industrial: "Промышленность",
  business: "Бизнес и управление",
  law: "Право",
  service: "Сервис",
  creative: "Творчество",
  design: "Дизайн",
  education: "Образование",
  social: "Социальная сфера",
  humanitarian: "Гуманитарные науки",
  sport: "Спорт",
  nature: "Природа и экология",
  bio: "Биология",
}

export const PROFILE_TITLES = {
  digital: "Цифровой",
  engineering: "Инженерный",
  industrial: "Производственный",
  business: "Деловой",
  service: "Сервисный",
  creative: "Творческий",
  humanitarian: "Социально-педагогический",
  sport: "Спортивный",
  nature: "Естественнонаучный",
}

export const PERSONALITY_TITLES = {
  analyst: "Аналитик",
  maker: "Мастер",
  organizer: "Организатор",
  helper: "Помогающий",
  creator: "Творец",
  active: "Активный",
  researcher: "Исследователь",
}

export const PROFILES = {
  digital: { it: 3, digital: 3, security: 2, electronics: 1, tech: 2 },
  engineering: { engineering: 3, tech: 2, electronics: 2, automation: 1, machinery: 1 },
  industrial: { machinery: 3, production: 2, engineering: 1, construction: 1, quality: 1 },
  business: { business: 3, law: 2, quality: 1, service: 1, transport: 1 },
  service: { service: 3, business: 1, social: 1, creative: 1 },
  creative: { creative: 3, design: 2, service: 1 },
  humanitarian: { education: 3, social: 3, humanitarian: 2, sport: 1 },
  sport: { sport: 3, education: 1, social: 1 },
  nature: { bio: 2, nature: 2, agro: 1 },
}

export const DEFAULT_COLLEGES = [
  {
    "name": "Каменск-Уральский радиотехнический техникум",
    "short": "КУРТ",
    "city": "Каменск-Уральский",
    "website": "http://www.kypt.ru",
    "priority_tags": {
      "it": 2.0, "digital": 2.0, "electronics": 2.0,
      "automation": 1.5, "engineering": 1.5, "quality": 1.5,
      "machinery": 1.0, "tech": 1.0
    },
    "specialties": [
      {
        "code": "09.02.11",
        "name": "Разработка и управление программным обеспечением",
        "department": "ИТ-отделение (Профессионалитет, кластер «Машиностроение»)",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Разработка программного обеспечения, веб- и мобильных приложений; реализуется в рамках федерального проекта «Профессионалитет»",
        "tags": {"it": 3.0, "digital": 2.5, "engineering": 1.0, "machinery": 0.5},
        "profiles": ["digital", "engineering"],
        "personality": ["analyst", "creator", "maker"]
      },
      {
        "code": "11.02.17",
        "name": "Разработка электронных систем и устройств",
        "department": "Радиотехническое отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Проектирование и разработка электронных устройств, печатных плат, встраиваемых и радиотехнических систем",
        "tags": {"electronics": 3.0, "automation": 2.0, "engineering": 2.0, "tech": 1.5, "digital": 1.0},
        "profiles": ["engineering", "digital"],
        "personality": ["maker", "analyst"]
      },
      {
        "code": "13.02.13",
        "name": "Эксплуатация и обслуживание электрического и электромеханического оборудования",
        "department": "Электротехническое отделение",
        "education_form": "Очная, Заочная",
        "duration": "2 года 10 мес.",
        "description": "Монтаж, наладка и обслуживание электрооборудования промышленных предприятий",
        "tags": {"electronics": 2.0, "automation": 1.5, "engineering": 2.0, "machinery": 1.5, "tech": 1.0},
        "profiles": ["engineering", "industrial"],
        "personality": ["maker"]
      },
      {
        "code": "15.02.16",
        "name": "Технология машиностроения",
        "department": "Машиностроительное отделение",
        "education_form": "Очная, Заочная",
        "duration": "3 года 10 мес.",
        "description": "Технологические процессы производства деталей и узлов машин, программирование станков с ЧПУ",
        "tags": {"machinery": 3.0, "production": 2.0, "engineering": 2.0, "quality": 1.5, "tech": 1.0},
        "profiles": ["industrial", "engineering"],
        "personality": ["maker", "analyst"]
      },
      {
        "code": "15.02.17",
        "name": "Монтаж, техническое обслуживание, эксплуатация и ремонт промышленного оборудования (по отраслям)",
        "department": "Машиностроительное отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Обслуживание, ремонт и эксплуатация промышленных машин и технологического оборудования",
        "tags": {"machinery": 3.0, "production": 2.0, "engineering": 2.0, "tech": 1.5},
        "profiles": ["industrial", "engineering"],
        "personality": ["maker"]
      },
      {
        "code": "27.02.07",
        "name": "Управление качеством продукции, процессов и услуг (по отраслям)",
        "department": "Экономическое отделение",
        "education_form": "Очная, Заочная",
        "duration": "2 года 10 мес.",
        "description": "Контроль качества, стандартизация, метрология, аудит производственных и сервисных процессов",
        "tags": {"quality": 3.0, "business": 2.0, "engineering": 1.5, "production": 1.0},
        "profiles": ["business", "engineering"],
        "personality": ["analyst", "organizer"]
      },
      {
        "code": "15.01.38",
        "name": "Оператор-наладчик металлообрабатывающих станков",
        "department": "Рабочие профессии",
        "education_form": "Очная",
        "duration": "1 год 10 мес.",
        "description": "Работа на токарных, фрезерных, сверлильных станках и станках с ЧПУ",
        "tags": {"machinery": 3.0, "production": 2.0, "tech": 2.0, "engineering": 1.0},
        "profiles": ["industrial"],
        "personality": ["maker"]
      },
      {
        "code": "13.01.10",
        "name": "Электромонтёр по ремонту и обслуживанию электрооборудования (по отраслям)",
        "department": "Рабочие профессии",
        "education_form": "Очная",
        "duration": "1 год 10 мес.",
        "description": "Монтаж и ремонт электроустановок, проводки, силового и осветительного оборудования",
        "tags": {"electronics": 2.0, "engineering": 2.0, "tech": 2.0, "machinery": 1.0},
        "profiles": ["engineering", "industrial"],
        "personality": ["maker"]
      },
      {
        "code": "11.01.01",
        "name": "Монтажник радиоэлектронной аппаратуры и приборов",
        "department": "Рабочие профессии",
        "education_form": "Очная",
        "duration": "1 год 10 мес.",
        "description": "Монтаж, сборка, настройка и проверка радиоэлектронной аппаратуры и приборов",
        "tags": {"electronics": 3.0, "tech": 2.0, "engineering": 1.5, "automation": 1.0},
        "profiles": ["engineering"],
        "personality": ["maker"]
      }
    ]
  },
  {
    "name": "Каменск-Уральский политехнический колледж",
    "short": "КУПК",
    "city": "Каменск-Уральский",
    "website": "https://www.kupc.ru",
    "priority_tags": {
      "machinery": 2.0, "production": 2.0, "engineering": 1.5,
      "it": 1.5, "business": 1.5
    },
    "specialties": [
      {
        "code": "09.02.11",
        "name": "Разработка и управление программным обеспечением",
        "department": "ИТ-отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Программирование, веб-разработка, работа с базами данных",
        "tags": {"it": 3.0, "digital": 2.5, "engineering": 0.5},
        "profiles": ["digital"],
        "personality": ["analyst", "creator"]
      },
      {
        "code": "13.02.13",
        "name": "Эксплуатация и обслуживание электрического и электромеханического оборудования",
        "department": "Электротехническое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Эксплуатация и ремонт электрооборудования промышленных предприятий",
        "tags": {"electronics": 2.0, "engineering": 2.0, "machinery": 1.5, "automation": 1.0},
        "profiles": ["engineering", "industrial"],
        "personality": ["maker"]
      },
      {
        "code": "15.02.10",
        "name": "Мехатроника и робототехника",
        "department": "Машиностроительное отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Проектирование и обслуживание роботизированных комплексов и мехатронных систем",
        "tags": {"automation": 3.0, "electronics": 2.5, "engineering": 2.0, "machinery": 1.5, "tech": 1.5},
        "profiles": ["engineering", "industrial"],
        "personality": ["maker", "analyst"]
      },
      {
        "code": "15.02.16",
        "name": "Технология машиностроения",
        "department": "Машиностроительное отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Разработка технологических процессов обработки деталей, работа на станках с ЧПУ",
        "tags": {"machinery": 3.0, "production": 2.0, "engineering": 2.0, "quality": 1.0},
        "profiles": ["industrial", "engineering"],
        "personality": ["maker", "analyst"]
      },
      {
        "code": "15.02.17",
        "name": "Монтаж, техническое обслуживание, эксплуатация и ремонт промышленного оборудования",
        "department": "Машиностроительное отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Монтаж и ремонт насосов, компрессоров, конвейеров и технологических линий",
        "tags": {"machinery": 3.0, "production": 2.5, "engineering": 2.0, "tech": 1.5},
        "profiles": ["industrial"],
        "personality": ["maker"]
      },
      {
        "code": "22.02.10",
        "name": "Металлургия цветных металлов",
        "department": "Металлургическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Технология производства алюминия, меди и других цветных металлов",
        "tags": {"production": 3.0, "machinery": 2.0, "engineering": 2.0, "tech": 1.5, "quality": 1.0},
        "profiles": ["industrial"],
        "personality": ["maker", "analyst"]
      },
      {
        "code": "22.02.11",
        "name": "Обработка металлов давлением",
        "department": "Металлургическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Прокатное, прессовое, штамповочное производство металлических изделий",
        "tags": {"production": 3.0, "machinery": 2.5, "engineering": 1.5, "tech": 1.0},
        "profiles": ["industrial"],
        "personality": ["maker"]
      },
      {
        "code": "38.02.01",
        "name": "Экономика и бухгалтерский учёт",
        "department": "Экономическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Бухгалтерский учёт, налогообложение, финансовый анализ предприятий",
        "tags": {"business": 3.0, "law": 1.5, "digital": 1.0, "quality": 0.5},
        "profiles": ["business"],
        "personality": ["analyst", "organizer"]
      }
    ]
  },
  {
    "name": "Каменск-Уральский техникум торговли и сервиса",
    "short": "КУТТС",
    "city": "Каменск-Уральский",
    "website": "https://kutts.ru",
    "priority_tags": {
      "service": 2.0, "creative": 1.5, "business": 1.5,
      "construction": 1.5, "law": 1.0, "it": 0.5
    },
    "specialties": [
      {
        "code": "08.02.01",
        "name": "Строительство и эксплуатация зданий и сооружений",
        "department": "Строительное отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Проектирование, строительство и эксплуатация зданий, смета, стройнадзор",
        "tags": {"construction": 3.0, "production": 1.5, "engineering": 1.5, "business": 1.0, "quality": 1.0},
        "profiles": ["industrial", "business"],
        "personality": ["maker", "organizer"]
      },
      {
        "code": "54.02.01",
        "name": "Дизайн (по отраслям)",
        "department": "Творческое отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Графический, средовой и предметный дизайн, визуальные коммуникации",
        "tags": {"creative": 3.0, "design": 3.0, "digital": 1.5, "service": 0.5},
        "profiles": ["creative"],
        "personality": ["creator"]
      },
      {
        "code": "43.02.15",
        "name": "Поварское и кондитерское дело",
        "department": "Сервисное отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Технология приготовления блюд, кондитерских изделий, организация работы кухни",
        "tags": {"service": 3.0, "creative": 1.5, "production": 1.0, "quality": 1.0},
        "profiles": ["service", "creative"],
        "personality": ["creator", "maker"]
      },
      {
        "code": "43.02.16",
        "name": "Туризм и гостеприимство",
        "department": "Сервисное отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Организация туристической деятельности, гостиничный и ресторанный сервис",
        "tags": {"service": 3.0, "social": 1.5, "business": 1.5, "creative": 0.5},
        "profiles": ["service", "business"],
        "personality": ["helper", "organizer"]
      },
      {
        "code": "38.02.04",
        "name": "Коммерция (по отраслям)",
        "department": "Экономическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Организация торговли, закупки, управление ассортиментом и продажами",
        "tags": {"business": 3.0, "service": 1.5, "digital": 1.0, "law": 0.5},
        "profiles": ["business", "service"],
        "personality": ["organizer", "helper"]
      },
      {
        "code": "38.02.08",
        "name": "Торговое дело",
        "department": "Экономическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Организация торговых процессов, мерчандайзинг, работа с поставщиками",
        "tags": {"business": 3.0, "service": 2.0, "law": 0.5},
        "profiles": ["business", "service"],
        "personality": ["organizer"]
      },
      {
        "code": "09.02.07",
        "name": "Информационные системы и программирование",
        "department": "ИТ-отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Разработка и сопровождение программного обеспечения и информационных систем",
        "tags": {"it": 3.0, "digital": 2.5, "business": 1.0},
        "profiles": ["digital"],
        "personality": ["analyst"]
      },
      {
        "code": "23.02.01",
        "name": "Организация перевозок и управление на транспорте",
        "department": "Транспортное отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Планирование и управление транспортными перевозками, логистика, диспетчеризация",
        "tags": {"transport": 3.0, "business": 2.0, "machinery": 0.5, "law": 0.5},
        "profiles": ["industrial", "business"],
        "personality": ["organizer"]
      },
      {
        "code": "40.02.02",
        "name": "Правоохранительная деятельность",
        "department": "Юридическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Основы права, административная и оперативно-розыскная деятельность",
        "tags": {"law": 3.0, "social": 1.5, "business": 1.0},
        "profiles": ["business", "humanitarian"],
        "personality": ["organizer", "helper"]
      },
      {
        "code": "38.02.01",
        "name": "Экономика и бухгалтерский учёт",
        "department": "Экономическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Бухгалтерский учёт, налоги, финансы организации",
        "tags": {"business": 3.0, "law": 1.5, "digital": 0.5},
        "profiles": ["business"],
        "personality": ["analyst", "organizer"]
      },
      {
        "code": "38.02.06",
        "name": "Финансы",
        "department": "Экономическое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Финансовое планирование, бюджетирование, банковское дело",
        "tags": {"business": 3.0, "law": 1.0, "digital": 0.5},
        "profiles": ["business"],
        "personality": ["analyst"]
      },
      {
        "code": "46.02.01",
        "name": "Документационное обеспечение управления и архивоведение",
        "department": "Управленческое отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Делопроизводство, архивное дело, кадровый документооборот",
        "tags": {"business": 2.5, "law": 2.0, "digital": 1.0},
        "profiles": ["business"],
        "personality": ["organizer", "analyst"]
      },
      {
        "code": "43.02.17",
        "name": "Технологии индустрии красоты",
        "department": "Сервисное отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Парикмахерское искусство, косметология, визаж, ногтевой сервис",
        "tags": {"creative": 2.5, "design": 1.5, "service": 3.0, "social": 1.0},
        "profiles": ["creative", "service"],
        "personality": ["creator", "helper"]
      },
      {
        "code": "08.01.07",
        "name": "Мастер общестроительных работ",
        "department": "Строительное отделение",
        "education_form": "Очная",
        "duration": "1 год 10 мес.",
        "description": "Каменные, штукатурные, малярные и монтажные строительные работы",
        "tags": {"construction": 3.0, "production": 2.0, "tech": 1.5},
        "profiles": ["industrial"],
        "personality": ["maker"]
      },
      {
        "code": "43.01.09",
        "name": "Повар, кондитер",
        "department": "Рабочие профессии",
        "education_form": "Очная",
        "duration": "1 год 10 мес.",
        "description": "Приготовление горячих и холодных блюд, выпечка, работа на кухне",
        "tags": {"service": 3.0, "creative": 1.5, "quality": 1.0},
        "profiles": ["service"],
        "personality": ["maker", "creator"]
      }
    ]
  },
  {
    "name": "Каменск-Уральский филиал ГБПОУ «Свердловский областной медицинский колледж»",
    "short": "СОМК (КУ)",
    "city": "Каменск-Уральский",
    "website": "http://somkural.ru",
    "priority_tags": {
      "social": 2.0, "humanitarian": 2.0, "bio": 1.5, "education": 1.0
    },
    "specialties": [
      {
        "code": "34.02.01",
        "name": "Сестринское дело",
        "department": "Сестринское отделение",
        "education_form": "Очная",
        "duration": "2 года 10 мес.",
        "description": "Уход за пациентами, медицинские манипуляции, работа в больницах и поликлиниках",
        "tags": {"social": 3.0, "humanitarian": 2.5, "bio": 2.0, "education": 1.0},
        "profiles": ["humanitarian", "nature"],
        "personality": ["helper"]
      },
      {
        "code": "31.02.01",
        "name": "Лечебное дело",
        "department": "Лечебное отделение",
        "education_form": "Очная",
        "duration": "3 года 10 мес.",
        "description": "Фельдшерская деятельность, диагностика и лечение, скорая медицинская помощь",
        "tags": {"social": 2.5, "humanitarian": 2.0, "bio": 3.0, "education": 0.5},
        "profiles": ["nature", "humanitarian"],
        "personality": ["helper", "analyst"]
      },
      {
        "code": "31.02.05",
        "name": "Стоматология ортопедическая",
        "department": "Стоматологическое отделение",
        "education_form": "Очная",
        "duration": "1 год 10 мес.",
        "description": "Изготовление зубных протезов, работа в зуботехнических лабораториях",
        "tags": {"bio": 2.5, "tech": 2.0, "quality": 1.5, "creative": 1.0},
        "profiles": ["nature", "engineering"],
        "personality": ["maker", "analyst"]
      }
    ]
  }
]

export const PRIVACY_POLICY = `Политика конфиденциальности

ПрофНавигатор — это веб-приложение для профориентации, созданное в образовательных целях.

1. Сбор информации
При прохождении тестирования вы предоставляете свои ответы на вопросы о профессиональных интересах. Эти данные используются исключительно для:
- Расчёта вашего профильного типа
- Подбора подходящих специальностей
- Улучшения рекомендаций

2. Хранение данных
Все ваши ответы и результаты сохраняются только в локальной памяти вашего браузера (localStorage). Эти данные не передаются на серверы третьих лиц и не хранятся на удалённых серверах.

3. Использование файлов cookie
Приложение использует localStorage для сохранения истории ваших результатов тестирования на вашем устройстве. Это необходимо для функционирования приложения.

4. Третьи лица
Мы не передаём ваши персональные данные третьим сторонам. Приложение работает полностью локально в вашем браузере.

5. Удаление данных
Вы можете удалить все сохранённые данные, очистив кэш и cookies браузера.

6. Изменения политики
Мы можем обновить эту политику. Дата последнего обновления указана при загрузке страницы.

Используя ПрофНавигатор, вы соглашаетесь с условиями этой политики конфиденциальности.`
