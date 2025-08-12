"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface NotesAppProps {
  theme: "light" | "dark" | "neon"
}

const welcomeNote = `# Welcome to MiniOS Notes! 📝

**Student Name:** [ADD YOUR NAME HERE - STEP 2] 
**Workshop Goal:** [WHAT DO YOU WANT TO LEARN? - STEP 2]
**Favorite Git Command:** [YOUR FAVORITE COMMAND - STEP 2]
**Team Role:** [FRONTEND/BACKEND/FULLSTACK - STEP 2]

---

This is a **Markdown-powered** notes app built for the Git workshop.

## My Learning Journey - STEP 2: PERSONALIZE THIS SECTION

### Day 1 Goals (Uncomment and customize in Step 2)
- [ ] Learn basic Git commands
- [ ] Practice merge conflicts  
- [ ] Master branching
- [ ] [ADD YOUR OWN GOAL - STEP 2]
- [ ] [ADD ANOTHER GOAL - STEP 2]

### Favorite Features I Want to Build
- Real-time markdown preview
- Split-pane interface  
- Theme support (Light/Dark/Neon)
- Perfect for *merge conflict* practice!
- [ADD YOUR FEATURE IDEA - STEP 2]

## Personal Notes Section - MAJOR CONFLICT ZONE!
> **STEP 2 INSTRUCTION:** Each student should customize this section with their own content.
> This will create natural merge conflicts when multiple students edit the same areas!

### My Git Cheat Sheet (Customize in Step 2)
\`\`\`bash
# My most used commands (add your comments in Step 2):
git status    # [ADD YOUR COMMENT - STEP 2]
git add .     # [ADD YOUR COMMENT - STEP 2] 
git commit -m # [ADD YOUR COMMENT - STEP 2]
git push      # [ADD YOUR COMMENT - STEP 2]
git pull      # [ADD YOUR COMMENT - STEP 2]
\`\`\`

### Workshop Reflections (Fill this out in Step 2)
**What I learned today:**
- [STUDENT FILLS THIS IN - STEP 2]
- [DIFFERENT STUDENTS WILL ADD DIFFERENT POINTS - STEP 2]
- [CREATING PERFECT MERGE CONFLICTS - STEP 2]

**Challenges I faced:**
- [STUDENT EXPERIENCE 1 - STEP 2]
- [STUDENT EXPERIENCE 2 - STEP 2]

**My biggest "aha!" moment:**
- [DESCRIBE YOUR BREAKTHROUGH - STEP 2]

### Code Snippets I Want to Remember (Step 2)
\`\`\`javascript
// Each student adds their own code examples here in Step 2
function myFavoriteFunction() {
  console.log("Hello from [YOUR NAME - STEP 2]!");
  // Students will add different implementations
  // This creates multi-line merge conflicts!
}

// Add your own function here in Step 2:
// function [yourFunctionName]() {
//   // Your code here
// }
\`\`\`

### Links & Resources (Step 2 - Add your favorites)
- [My Favorite Git Tutorial](https://example.com) - [STUDENT ADDS THEIR LINK - STEP 2]
- [Useful Git Tool](https://example.com) - [ANOTHER STUDENT ADDS DIFFERENT LINK - STEP 2]
- [Git Visualization](https://example.com) - [THIRD STUDENT ADDS ANOTHER LINK - STEP 2]

---

## Team Collaboration Notes - STEP 4 CONFLICT ZONE
**Project Ideas (Add yours in Step 4):**
1. [STUDENT A's IDEA - STEP 4]
2. [STUDENT B's IDEA - STEP 4] 
3. [STUDENT C's IDEA - STEP 4]

**Who's working on what (Update in Step 4):**
- Calculator App: [STUDENT NAME - STEP 4]
- Music Player: [DIFFERENT STUDENT NAME - STEP 4]  
- Weather App: [ANOTHER STUDENT NAME - STEP 4]
- Chat App: [FOURTH STUDENT NAME - STEP 4]

**Our team's Git workflow:**
- Main branch: [DESCRIBE YOUR TEAM'S MAIN BRANCH STRATEGY - STEP 4]
- Feature branches: [HOW DOES YOUR TEAM HANDLE FEATURES? - STEP 4]
- Merge strategy: [MERGE COMMITS OR SQUASH? - STEP 4]

---

**Happy coding!** 🚀 **- [YOUR NAME - STEP 2]**

> **Merge Conflict Zone:** This note will be different for each student, creating educational merge conflicts when they customize it with their personal information, goals, and reflections.

## Advanced Git Scenarios to Practice

### Scenario 1: The Personal Touch (Step 2)
Each student adds their name, goals, and favorite commands in the header section. When merged, Git will show conflicts in the same lines.

### Scenario 2: The Learning Journey (Step 2)
Students add different learning goals and check off different items. Array-like conflicts in markdown lists.

### Scenario 3: The Code Examples (Step 2)
Different students add their own code snippets in the same code block areas, creating complex multi-line conflicts.

### Scenario 4: The Resource Wars (Step 2)
Students add their favorite links and tools, often replacing the same placeholder links with different URLs.

### Scenario 5: Team Collaboration Chaos (Step 4)
When students update the team section with different project assignments and workflows.

**Pro Tip:** Try editing this note in different branches, then merge them to see real conflicts in action! 🎯

## Step-by-Step Conflict Creation Guide

**Step 2 (Current):** Replace all [PLACEHOLDER] text with your personal information
**Step 4:** Update team collaboration section with your project assignments  
**Step 6:** Create theme-specific notes in feature branches
**Step 7:** Merge everything and resolve the beautiful chaos of conflicts!

Remember: Conflicts are not bugs - they're learning opportunities! 🌟
`

// Simple markdown parser for basic formatting
const parseMarkdown = (text: string): string => {
  return (
    text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-4">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code blocks
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg my-3 overflow-x-auto"><code>$2</code></pre>',
      )
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-blue-500 hover:text-blue-600 underline" target="_blank">$1</a>',
      )
      // Checkboxes
      .replace(
        /^- \[ \] (.*$)/gim,
        '<li class="ml-4 mb-1 flex items-center"><input type="checkbox" class="mr-2" disabled> $1</li>',
      )
      .replace(
        /^- \[x\] (.*$)/gim,
        '<li class="ml-4 mb-1 flex items-center"><input type="checkbox" class="mr-2" checked disabled> $1</li>',
      )
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-2">$1</blockquote>')
      // Horizontal rules
      .replace(/^---$/gim, '<hr class="border-gray-300 my-4">')
      // Line breaks
      .replace(/\n/g, "<br>")
  )
}

export function NotesApp({ theme }: NotesAppProps) {
  const [content, setContent] = useState(welcomeNote)

  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      textarea: "bg-white border-gray-200 text-gray-800",
      preview: "bg-gray-50",
      divider: "border-gray-200",
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-white",
      textarea: "bg-gray-900 border-gray-600 text-white",
      preview: "bg-gray-700",
      divider: "border-gray-600",
    },
    neon: {
      bg: "bg-purple-900",
      text: "text-cyan-300",
      textarea: "bg-purple-800 border-cyan-500/30 text-cyan-300",
      preview: "bg-purple-800/50",
      divider: "border-cyan-500/30",
    },
  }

  const styles = themeStyles[theme]

  return (
    <div className={`h-full ${styles.bg} ${styles.text} rounded-lg overflow-hidden flex`}>
      {/* Editor Pane */}
      <div className="flex-1 flex flex-col">
        <div className={`p-3 border-b ${styles.divider} flex-shrink-0`}>
          <h3 className="font-medium text-sm">Editor</h3>
          <p className="text-xs text-muted-foreground">Step 2: Replace [PLACEHOLDER] text with your info!</p>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your markdown..."
          className={`
            flex-1 p-4 resize-none border-0 outline-none font-mono text-sm
            ${styles.textarea}
            placeholder:text-gray-400
          `}
          style={{ background: "transparent" }}
        />
      </div>

      {/* Divider */}
      <div className={`w-px ${styles.divider} border-l`} />

      {/* Preview Pane */}
      <div className="flex-1 flex flex-col">
        <div className={`p-3 border-b ${styles.divider} flex-shrink-0`}>
          <h3 className="font-medium text-sm">Preview</h3>
          <p className="text-xs text-muted-foreground">Live markdown preview</p>
        </div>
        <div className={`flex-1 p-4 overflow-y-auto ${styles.preview}`}>
          <motion.div
            key={content}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(content),
            }}
            style={{
              color: "inherit",
            }}
          />
        </div>
      </div>
    </div>
  )
}
