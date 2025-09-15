Проект построен на React Native (Expo) и разделён по feature-based архитектуре (feature-sliced), что облегчает поддержку и масштабирование.

Основные принципы

Feature-based: каждая фича (auth, home и т.д.) инкапсулирует свою логику, типы, хуки и UI-компоненты.
Переиспользуемость: всё, что может использоваться в разных фичах, выносится в shared/global.
Типизация: все сущности описаны через types для строгой типизации.
Хуки: каждый хук решает отдельную задачу (например, авторизация, работа с API и т.д.).
UI-компоненты: изолированы и переиспользуемы — например, ProgressBar, Input, ActionLink.
Почему так
Удобно масштабировать: можно добавлять новые фичи без затрагивания существующих.
Код легко читать и сопровождать.
Повторно используемые модули находятся в одном месте (global), что уменьшает дублирование.

Документация к проекту.
Что бы запустить проект
1. скачайте файлы из GitHub, 
2. откройте проект в редакторе кода
3. введите в консоль npm install
4. введите в консоль npm start 
5. установите на андройд/ios Expo Go 
6. отсканируйте QR код из консоли"

так же вы можете установить APK файл для андройд по ссылке: 
https://expo.dev/accounts/qb1ty_as/projects/AIndriver/builds/e26045ab-57f5-45c0-8b5c-ceabb3d2fe25

проект был написан на react native expo с использованием LVM модели ИИ, сервера настроенны и подключены

Структура проекта

INDRIVER-PROJECT
├── README.md
├── app
│   ├── (auth)
│   │   ├── _layout.tsx
│   │   ├── camera.tsx
│   │   ├── cars.tsx
│   │   ├── finally.tsx
│   │   ├── index.tsx
│   │   ├── license.tsx
│   │   └── register.tsx
│   ├── +html.tsx
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   └── home
│       ├── _layout.tsx
│       ├── cardetection.tsx
│       ├── errorpage.tsx
│       ├── goodpage.tsx
│       └── index.tsx
├── app.json
├── assets
│   ├── fonts
│   │   ├── Montserrat-Bold.ttf
│   │   ├── Montserrat-Medium.ttf
│   │   ├── Montserrat-Regular.ttf
│   │   └── Montserrat-SemiBold.ttf
│   ├── png
│   │   └── car.png
│   └── root
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       └── splash-icon.png
├── assets.d.ts
├── babel.config.js
├── components
│   ├── auth
│   │   ├── hooks
│   │   ├── types
│   │   ├── ui
│   │   └── utils
│   ├── global
│   │   ├── Button.tsx
│   │   ├── Pagination.tsx
│   │   ├── Progress.tsx
│   │   ├── Tab.tsx
│   │   ├── Title.tsx
│   │   └── UploadCard.tsx
│   └── main
│       ├── hooks
│       └── ui
├── constants
│   └── Colors.ts
├── context
│   └── context.tsx
├── expo-env.d.ts
├── global.css
├── metro.config.js
├── nativewind-env.d.ts
├── package-lock.json
├── package.json
├── tailwind.config.js
└── tsconfig.json