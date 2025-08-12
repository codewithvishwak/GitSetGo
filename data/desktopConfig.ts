export interface AppConfig {
  id: string
  name: string
  icon: string
  color: string
  component: string
  // category?: "productivity" | "entertainment" | "development" | "system"
  // version?: string
  // author?: string
  // description?: string
  // shortcuts?: string[]
}

export const desktopConfig = {
  preferences: {
    defaultTheme: "dark", // Students will change this to their preference
    // animationSpeed: "normal", // 'slow' | 'normal' | 'fast'
    // showWelcomeMessage: true,
    // autoSaveInterval: 30000, // milliseconds
    // maxRecentFiles: 10,
    // Different students will have different preferences here
    // favoriteApps: ["todo", "notes"], // Students will modify this array
  },

  // wallpaper: {
  //   type: "gradient", // 'solid' | 'gradient' | 'image'
  //   primary: "#1e40af",
  //   secondary: "#7c3aed",
  //   // Students will customize these colors differently
  //   customColors: [
  //     "#ef4444", // red
  //     "#f97316", // orange
  //     "#eab308", // yellow
  //     // Students add their favorite colors here
  //   ],
  // },

  apps: [
    {
      id: "guide",
      name: "Workshop Guide",
      icon: "📚",
      color: "bg-blue-500",
      component: "WorkshopGuide",
      // category: "development",
      // version: "1.0.0",
      // author: "Workshop Team",
      // description: "Interactive Git learning guide",
      // shortcuts: ["Ctrl+G", "F1"],
    },
    // {
    //   id: "todo",
    //   name: "Todo",
    //   icon: "✓",
    //   color: "bg-green-500",
    //   component: "TodoApp",
    // },
    // {
    //   id: "notes",
    //   name: "Notes",
    //   icon: "📝",
    //   color: "bg-yellow-500",
    //   component: "NotesApp",
    // },
    // {
    //   id: "gallery",
    //   name: "Gallery",
    //   icon: "🖼️",
    //   color: "bg-purple-500",
    //   component: "GalleryApp",
    // },
    // {
    //   id: "calculator",
    //   name: "Calculator",
    //   icon: "🧮",
    //   color: "bg-orange-500",
    //   component: "CalculatorApp",
    // },

    // EXERCISE APPS - Students will uncomment these to create conflicts
    // {
    //   id: 'music-player',
    //   name: 'Music Player',
    //   icon: '🎵',
    //   color: 'bg-pink-500',
    //   component: 'MusicPlayerApp',
    //   author: 'Your Name Here', // Students customize this
    // },
    // {
    //   id: 'weather',
    //   name: 'Weather',
    //   icon: '🌤️',
    //   color: 'bg-sky-500',
    //   component: 'WeatherApp',
    //   author: 'Your Name Here', // Students customize this
    // },
    // {
    //   id: 'chat',
    //   name: 'Chat',
    //   icon: '💬',
    //   color: 'bg-indigo-500',
    //   component: 'ChatApp',
    //   author: 'Your Name Here', // Students customize this
    // },
  ],

  // dock: {
  //   position: "bottom", // Students might prefer 'top' or 'left' or 'right'
  //   size: "medium", // 'small' | 'medium' | 'large'
  //   autoHide: false, // Some students will want true
  //   showLabels: true, // Some students will want false
  //   pinnedApps: ["guide", "todo", "notes"], // Different students, different orders
  // },
}

// export const userProfiles = {
//   // Each student should uncomment and customize their profile
//   // This guarantees merge conflicts when multiple students work on it
//   // currentUser: {
//   //   name: 'Your Name Here',
//   //   avatar: '👤', // Students pick their emoji
//   //   theme: 'dark', // 'light' | 'dark' | 'neon'
//   //   favoriteColor: '#3b82f6',
//   //   workspaceLayout: 'grid', // 'grid' | 'list' | 'minimal'
//   //   notifications: true,
//   //   soundEffects: false,
//   //   language: 'en', // Students might prefer different languages
//   //   timezone: 'UTC-5' // Different students, different timezones
//   // }
// }

// export const featureFlags = {
//   // Students will toggle these differently, creating conflicts
//   enableAnimations: true, // Some students prefer false for performance
//   showTooltips: true, // Some might find them annoying
//   enableKeyboardShortcuts: true,
//   showAppDescriptions: false, // Some students will want true
//   enableDragAndDrop: true,
//   showVersionNumbers: false, // Some students will want true
//   enableSoundEffects: false, // Some students will want true
//   // experimentalFeatures: {
//   //   enableVoiceCommands: false,
//   //   enableGestures: false,
//   //   enableAI: false,
//   //   enableCollaboration: false
//   // },
// }
