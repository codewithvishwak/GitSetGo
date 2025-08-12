# MiniOS - Git & GitHub Workshop

A lightweight desktop environment built with Next.js 14, designed specifically for practicing Git workflows and creating merge conflicts in a fun, interactive way.

![MiniOS Desktop](https://via.placeholder.com/800x500/6366f1/ffffff?text=MiniOS+Desktop+Environment)

## 🚀 Features

- **Desktop Environment**: Fullscreen desktop with draggable, resizable windows
- **Built-in Workshop Guide**: Interactive Git tutorials and exercises within the app
- **Built-in Apps**: Todo list, Markdown notes editor, photo gallery, and calculator
- **Theme System**: Switch between Light, Dark, and Neon themes
- **Animated Dock**: Shows open applications with smooth Framer Motion animations
- **Merge Conflict Generator**: Strategic file structure designed for Git practice

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TailwindCSS** for styling
- **shadcn/ui** components
- **Framer Motion** for animations
- **TypeScript** for type safety

## 📱 Applications

### Workshop Guide 📚
- **Interactive Git tutorials** with step-by-step exercises
- **Git concept explanations** (HEAD, staging, branches, etc.)
- **Command examples** with explanations
- **Progress tracking** for completed exercises
- **External resources** and learning links
- **Built-in tips** and best practices

### Todo App ✓
- Add, complete, and delete tasks
- Real-time statistics
- Smooth animations for all interactions

### Notes App 📝
- Split-pane Markdown editor with live preview
- Preloaded with welcome content
- Perfect for practicing merge conflicts

### Gallery App 🖼️
- Grid layout with placeholder images
- Modal view for enlarged images
- Responsive design

### Calculator App 🧮
- **Full-featured calculator** with basic operations
- **Perfect for branching exercises** - add scientific functions!
- **Git exercise suggestions** built into the UI
- Clean, modern interface with theme support

## 🎯 Git Workshop Flow

This repository follows a structured learning path designed to teach Git concepts progressively:

\`\`\`
Workshop Flow:
├── 1. Setup & Clone
├── 2. Basic Git (add, commit, push)
├── 3. Branching & Merging
├── 4. Merge Conflicts (desktopConfig.ts)
├── 5. Advanced Git (stash, cherry-pick)
└── 6. Collaboration (Pull Requests)
\`\`\`

### Git Workflow Visualization

\`\`\`
main     ●─●─●─●─●─●─●
          │   ╲   ╱   │
feature   │    ●─●    │
          │           │
hotfix    ●───────────●
\`\`\`

## 🎓 Hands-On Git Exercises

### 1. Repository Setup
\`\`\`bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/minios.git
cd minios
npm install
npm run dev
\`\`\`

### 2. Basic Git Workflow
\`\`\`bash
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "Add my first change"

# Push to GitHub
git push origin main
\`\`\`

### 3. Branching Practice
\`\`\`bash
# Create and switch to feature branch
git checkout -b feature/calculator-improvements

# Make changes to calculator app
# Add scientific functions (sin, cos, sqrt)

# Commit your changes
git add .
git commit -m "Add scientific functions to calculator"

# Push feature branch
git push origin feature/calculator-improvements
\`\`\`

### 4. **Merge Conflict Practice** 🎯
**Target File**: `data/desktopConfig.ts`

Each student adds their own app to create **inevitable conflicts**:

\`\`\`typescript
// Student A adds:
{
  id: 'music-player',
  name: 'Music Player',
  icon: '🎵',
  color: 'bg-pink-500',
  component: 'MusicPlayerApp'
}

// Student B adds (same location):
{
  id: 'weather-app',
  name: 'Weather',
  icon: '🌤️',
  color: 'bg-sky-500',
  component: 'WeatherApp'
}
\`\`\`

**Conflict Resolution Process:**
\`\`\`bash
# When merging, Git shows:
<<<<<<< HEAD
  // Your changes
  { id: 'music-player', name: 'Music Player', icon: '🎵' }
=======
  // Their changes  
  { id: 'weather-app', name: 'Weather', icon: '🌤️' }
>>>>>>> feature/weather-app

# Resolution: Keep both apps
  { id: 'music-player', name: 'Music Player', icon: '🎵' },
  { id: 'weather-app', name: 'Weather', icon: '🌤️' }

# Complete the merge
git add .
git commit -m "Resolve merge conflict: keep both apps"
\`\`\`

### 5. Git Stash Practice
\`\`\`bash
# Start working on theme improvements
# Suddenly need to switch branches

# Stash your work
git stash push -m "Working on neon theme improvements"

# Switch branches for urgent fix
git checkout main
# ... make urgent changes ...

# Return to your work
git checkout feature/theme-improvements
git stash pop
\`\`\`

### 6. Cherry-Pick Exercise
\`\`\`bash
# Instructor creates a "Daily Quote" feature
# Students practice cherry-picking specific commits

git log --oneline
git cherry-pick abc1234  # Pick the quote feature commit
\`\`\`

### 7. Pull Request Workflow
\`\`\`bash
# Push your feature branch
git push origin feature/my-awesome-feature

# Create Pull Request on GitHub
# Practice code review process
# Merge when approved
\`\`\`

## 🎨 Customization Challenges

### Beginner Level
- [ ] Change desktop background gradient
- [ ] Add your name to the Notes app welcome message
- [ ] Modify calculator button colors
- [ ] Add a new theme color scheme

### Intermediate Level
- [ ] Create a new simple app (Clock, Weather display)
- [ ] Add sound effects to calculator buttons
- [ ] Implement dark mode for all apps
- [ ] Add keyboard shortcuts (Ctrl+N for new note)

### Advanced Level
- [ ] Add window resize handles
- [ ] Implement local storage for app data
- [ ] Create a file manager app
- [ ] Add drag-and-drop between apps

## 🔧 Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
minios/
├── app/
│   ├── page.tsx              # Main desktop environment
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles & themes
├── components/
│   ├── apps/                 # Individual applications
│   │   ├── workshop-guide.tsx    # 📚 Interactive Git tutorials
│   │   ├── todo-app.tsx          # ✓ Task management
│   │   ├── notes-app.tsx         # 📝 Markdown editor
│   │   ├── gallery-app.tsx       # 🖼️ Image gallery
│   │   └── calculator-app.tsx    # 🧮 Calculator with Git exercises
│   ├── desktop-icon.tsx      # Desktop app icons
│   ├── dock.tsx              # Bottom dock with animations
│   ├── system-menu.tsx       # Theme switcher
│   └── window-manager.tsx    # Draggable windows system
├── data/
│   └── desktopConfig.ts      # 🎯 MERGE CONFLICT TARGET FILE
└── README.md                 # This comprehensive guide
\`\`\`

## 🎓 Learning Objectives

By completing this workshop, students will master:

### Git Fundamentals
- ✅ Repository initialization and cloning
- ✅ Staging and committing changes
- ✅ Pushing and pulling from remote repositories
- ✅ Understanding Git status and history

### Branching & Merging
- ✅ Creating and switching branches
- ✅ Merging branches back to main
- ✅ Resolving merge conflicts confidently
- ✅ Understanding Git workflow patterns

### Advanced Git Operations
- ✅ Using git stash for temporary storage
- ✅ Cherry-picking specific commits
- ✅ Rebasing vs merging strategies
- ✅ Understanding HEAD and Git references

### Collaboration Skills
- ✅ Forking and cloning repositories
- ✅ Creating and reviewing Pull Requests
- ✅ Code review best practices
- ✅ Collaborative Git workflows

## 🚨 Common Git Scenarios & Solutions

### Scenario 1: "I made a mistake in my last commit"
\`\`\`bash
# Amend the last commit
git commit --amend -m "Corrected commit message"

# Or reset to previous commit (careful!)
git reset --soft HEAD~1
\`\`\`

### Scenario 2: "I need to undo changes"
\`\`\`bash
# Discard unstaged changes
git checkout -- filename.txt

# Discard all unstaged changes
git checkout -- .

# Reset to last commit (nuclear option)
git reset --hard HEAD
\`\`\`

### Scenario 3: "I'm in the middle of a merge conflict"
\`\`\`bash
# Check which files have conflicts
git status

# After resolving conflicts manually
git add .
git commit  # No message needed for merge commits
\`\`\`

### Scenario 4: "I want to see what changed"
\`\`\`bash
# See unstaged changes
git diff

# See staged changes
git diff --cached

# See changes between commits
git diff HEAD~1 HEAD
\`\`\`

## 🎉 Workshop Success Tips

### For Students
- **🚀 Start with the Workshop Guide app** - it has everything you need!
- **🤝 Work in pairs** - Git is better learned together
- **💥 Make mistakes intentionally** - they're the best teachers
- **❓ Ask questions** - Git concepts can be tricky at first
- **🔄 Practice repeatedly** - muscle memory is key

### For Instructors
- **📋 Use the built-in guide** - all exercises are self-contained
- **⏰ Allow time for conflicts** - they're the most valuable learning moments
- **👥 Encourage collaboration** - real-world Git is team-based
- **🎯 Focus on practical scenarios** - relate to real development workflows
- **🏆 Celebrate small wins** - every resolved conflict is progress!

## 📚 Additional Learning Resources

### Interactive Learning
- [Learn Git Branching](https://learngitbranching.js.org/) - Visual, interactive Git tutorial
- [GitHub Skills](https://skills.github.com/) - Hands-on GitHub courses
- [Git Immersion](http://gitimmersion.com/) - Step-by-step Git tutorial

### Reference Materials
- [Git Documentation](https://git-scm.com/doc) - Official Git docs
- [GitHub Guides](https://guides.github.com/) - GitHub-specific guides
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) - Quick reference

### Advanced Topics
- [Pro Git Book](https://git-scm.com/book) - Comprehensive Git guide
- [Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows) - Team collaboration patterns
- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) - Automation with Git

---

## 🎊 Ready to Start?

1. **Fork this repository** on GitHub
2. **Clone your fork** locally
3. **Run `npm install && npm run dev`**
4. **Open the Workshop Guide app** in MiniOS
5. **Follow the step-by-step exercises**
6. **Start collaborating and learning Git!**

**Happy coding and Git mastering!** 🚀✨

Built with ❤️ for hands-on Git education | Perfect for coding bootcamps, computer science courses, and developer workshops
