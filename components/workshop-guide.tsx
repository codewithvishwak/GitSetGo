"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, CheckCircle, Circle, FileText, Lightbulb, ExternalLink } from "lucide-react"

interface GitExercise {
  id: string
  title: string
  description: string
  commands: string[]
  explanation: string
  tip: string
  fileToEdit: string
  codeToUncomment: string
}

const progressiveExercises: GitExercise[] = [
  {
    id: "step1-enable-todo",
    title: "Step 1: Enable Todo App",
    description: "Uncomment the Todo app in desktopConfig.ts - that's it!",
    commands: [
      "# 1. Open data/desktopConfig.ts",
      "# 2. Find the commented todo app (around line 25)",
      "# 3. Remove the // from the start of each line in the todo object",
      "git add data/desktopConfig.ts",
      'git commit -m "Enable Todo app"',
      "# 4. Click the Todo icon on desktop to test! ✅",
    ],
    explanation:
      "Start simple! Just uncomment one app to learn basic Git workflow. The Todo app is fully functional once uncommented.",
    tip: "Look for the todo object with // at the start of each line. Remove all the // symbols!",
    fileToEdit: "data/desktopConfig.ts",
    codeToUncomment: "Todo app object (remove // from each line)",
  },
  {
    id: "step2-enable-notes",
    title: "Step 2: Enable Notes App",
    description: "Uncomment Notes app and personalize the welcome message",
    commands: [
      "# 1. Open data/desktopConfig.ts",
      "# 2. Find and uncomment the notes app object",
      "git add data/desktopConfig.ts",
      'git commit -m "Enable Notes app"',
      "# 3. Open components/notes-app.tsx",
      "# 4. Replace [ADD YOUR NAME HERE] with your actual name",
      "# 5. Replace [WHAT DO YOU WANT TO LEARN?] with your goal",
      "git add components/notes-app.tsx",
      'git commit -m "Personalize notes with my info"',
    ],
    explanation:
      "Two commits: enable the app, then personalize it. This creates clean Git history and sets up future merge conflicts when everyone adds their names!",
    tip: "Make two separate commits! First uncomment the app config, then edit the notes content. Good Git practice!",
    fileToEdit: "data/desktopConfig.ts, then components/notes-app.tsx",
    codeToUncomment: "Notes app object, then replace placeholder text",
  },
  {
    id: "step3-enable-gallery",
    title: "Step 3: Enable Gallery App",
    description: "Uncomment Gallery - it works immediately!",
    commands: [
      "# 1. Open data/desktopConfig.ts",
      "# 2. Find and uncomment the gallery app object",
      "git add data/desktopConfig.ts",
      'git commit -m "Enable Gallery app"',
      "# 3. Test by clicking Gallery icon - instant photo viewer! 📸",
    ],
    explanation:
      "Gallery is ready to go! Just uncomment and commit. Notice how each app adds more functionality to your desktop environment.",
    tip: "Gallery works immediately - no customization needed. Perfect for a quick confidence boost!",
    fileToEdit: "data/desktopConfig.ts",
    codeToUncomment: "Gallery app object only",
  },
  {
    id: "step4-enable-calculator",
    title: "Step 4: Enable Calculator + Features",
    description: "Uncomment Calculator and enable advanced features",
    commands: [
      "# 1. Open data/desktopConfig.ts",
      "# 2. Uncomment the calculator app object",
      "git add data/desktopConfig.ts",
      'git commit -m "Enable Calculator app"',
      "# 3. Open components/calculator-app.tsx",
      "# 4. Find 'showHistory: false' and change to 'showHistory: true'",
      "# 5. Uncomment the scientific functions section (big comment block)",
      "git add components/calculator-app.tsx",
      'git commit -m "Enable calculator advanced features"',
    ],
    explanation:
      "Calculator has hidden features! Enable history and scientific functions. This teaches you to modify existing code, not just uncomment it.",
    tip: "Two changes: showHistory: false → true, and uncomment the scientific functions block. Calculator becomes much more powerful!",
    fileToEdit: "data/desktopConfig.ts, then components/calculator-app.tsx",
    codeToUncomment: "Calculator app object, then enable features inside the component",
  },
  {
    id: "step5-create-branch",
    title: "Step 5: Create Feature Branch",
    description: "Learn branching by adding your personal app",
    commands: [
      "git checkout -b add-my-personal-app",
      "# 1. Open data/desktopConfig.ts",
      "# 2. Scroll to EXERCISE APPS section",
      "# 3. Pick ONE app: music-player, weather, or chat",
      "# 4. Uncomment your chosen app completely",
      "# 5. Change 'Your Name Here' to your actual name",
      "git add data/desktopConfig.ts",
      'git commit -m "Add my personal [APP_NAME] app"',
      "git checkout main",
      "git log --oneline --all --graph",
    ],
    explanation:
      "Branches let you experiment safely! Your personal app is isolated until you merge. This is where merge conflicts will happen when everyone adds different apps!",
    tip: "Branch names should describe your work. Pick just ONE app and make it yours by changing the author field!",
    fileToEdit: "data/desktopConfig.ts",
    codeToUncomment: "ONE custom app from exercise section + personalize it",
  },
  {
    id: "step6-merge-conflicts",
    title: "Step 6: Create Merge Conflicts",
    description: "Merge your branch and resolve conflicts with teammates",
    commands: [
      "git checkout main",
      "git pull origin main  # Get teammates' changes",
      "git merge add-my-personal-app",
      "# If conflicts appear (they will!):",
      "git status  # See conflicted files",
      "# Open data/desktopConfig.ts",
      "# Look for <<<<<<< ======= >>>>>>> markers",
      "# Keep all the apps (yours + teammates')",
      "# Delete the conflict markers",
      "git add data/desktopConfig.ts",
      'git commit -m "Resolve merge conflicts - keep all apps"',
    ],
    explanation:
      "This is the main learning moment! When everyone merges their personal apps, Git can't decide which version to keep. You'll resolve conflicts by keeping everyone's contributions.",
    tip: "Conflict markers show the choices. Keep ALL the apps from different students, just remove the <<<< ==== >>>> lines!",
    fileToEdit: "Resolve conflicts in data/desktopConfig.ts",
    codeToUncomment: "Resolve conflicts by keeping all students' apps",
  },
  {
    id: "step7-advanced-features",
    title: "Step 7: Advanced Git Techniques",
    description: "Practice cherry-pick, stash, and interactive rebase",
    commands: [
      "# Create experimental branch",
      "git checkout -b experimental-features",
      "# Make some changes to themes/colors",
      "git add . && git commit -m 'Experiment with themes'",
      "# Go back to main and cherry-pick just one commit",
      "git checkout main",
      "git cherry-pick experimental-features",
      "# Practice stashing",
      "# Make some changes but don't commit",
      "git stash",
      "git stash pop",
      "# Interactive rebase to clean up history",
      "git rebase -i HEAD~3",
    ],
    explanation:
      "Advanced Git techniques for real-world workflows. Cherry-pick lets you grab specific commits, stash saves work temporarily, and interactive rebase cleans up history.",
    tip: "These are power-user features! Don't worry if they seem complex - they become essential as you work on bigger projects.",
    fileToEdit: "Various files for experimentation",
    codeToUncomment: "Practice advanced Git workflows",
  },
]

export default function WorkshopGuide() {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  const toggleExercise = (id: string) => {
    setExpandedExercise(expandedExercise === id ? null : id)
  }

  const markComplete = (id: string) => {
    setCompletedExercises((prev) => new Set([...prev, id]))
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          MiniOS Git Workshop Guide
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Learn Git by progressively building this desktop environment - one step at a time!
        </p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="progressive" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progressive">Step-by-Step</TabsTrigger>
            <TabsTrigger value="concepts">Git Concepts</TabsTrigger>
            <TabsTrigger value="help">Help & Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="progressive" className="space-y-4">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  🎯 Your Mission: Build MiniOS Step by Step
                </CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-200">
                  Right now, only this Workshop Guide works. Follow the steps below to unlock each app while learning
                  Git!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Current State:</strong> Only Workshop Guide is active 📚
                  </p>
                  <p>
                    <strong>Your Goal:</strong> Uncomment code → Commit changes → Create merge conflicts! 🔥
                  </p>
                  <p>
                    <strong>End Result:</strong> Fully functional desktop with Todo, Notes, Gallery, Calculator + your
                    personal app! 🚀
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Progressive Exercises</h3>
              <Badge variant="secondary">
                {completedExercises.size}/{progressiveExercises.length} Complete
              </Badge>
            </div>

            <div className="space-y-3">
              {progressiveExercises.map((exercise) => (
                <Card key={exercise.id} className="transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        {completedExercises.has(exercise.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        {exercise.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleExercise(exercise.id)}>
                          {expandedExercise === exercise.id ? "Hide" : "Show"} Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markComplete(exercise.id)}
                          disabled={completedExercises.has(exercise.id)}
                        >
                          {completedExercises.has(exercise.id) ? "✓ Done" : "Mark Done"}
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>

                  {expandedExercise === exercise.id && (
                    <CardContent className="pt-0 space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Files to Edit: {exercise.fileToEdit}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>What to uncomment:</strong> {exercise.codeToUncomment}
                        </p>
                      </div>

                      <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm">
                        <h4 className="text-white font-semibold mb-2">Git Commands:</h4>
                        {exercise.commands.map((command, index) => (
                          <div key={index} className="mb-1">
                            {command.startsWith("#") ? (
                              <span className="text-gray-400">{command}</span>
                            ) : (
                              <span className="text-green-400">{command}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-300">
                          Why This Matters:
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-200">{exercise.explanation}</p>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2 text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Pro Tip:
                        </h4>
                        <p className="text-sm text-yellow-600 dark:text-yellow-200">{exercise.tip}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concepts" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">🌱 Git Basics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Repository:</strong> Your project folder tracked by Git
                  </p>
                  <p>
                    <strong>Commit:</strong> A snapshot of your changes with a message
                  </p>
                  <p>
                    <strong>Branch:</strong> A parallel version of your code for experiments
                  </p>
                  <p>
                    <strong>Merge:</strong> Combining changes from different branches
                  </p>
                  <p>
                    <strong>Conflict:</strong> When Git can't decide which changes to keep
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">🔄 Common Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  <p>git status # See what changed</p>
                  <p>git add . # Stage all changes</p>
                  <p>git commit -m "msg" # Save with message</p>
                  <p>git push # Upload to remote</p>
                  <p>git pull # Download updates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">⚡ Conflict Resolution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>When conflicts happen:</strong> Multiple people edit the same lines
                  </p>
                  <p>
                    <strong>Look for markers:</strong> &lt;&lt;&lt;&lt;&lt;&lt;&lt; ======= &gt;&gt;&gt;&gt;&gt;&gt;&gt;
                  </p>
                  <p>
                    <strong>Your job:</strong> Keep the changes you want, delete the markers
                  </p>
                  <p>
                    <strong>Then:</strong> git add . && git commit -m "Resolve conflicts"
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="help" className="space-y-4">
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-300">🎉 Workshop Success Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  • <strong>Follow steps in order</strong> - each builds on the previous one 📈
                </p>
                <p>
                  • <strong>Don't fear mistakes</strong> - Git has your back with version history! 🛡️
                </p>
                <p>
                  • <strong>Celebrate conflicts</strong> - they mean you're collaborating successfully! 🎉
                </p>
                <p>
                  • <strong>Commit often</strong> - small commits are easier to understand and merge 📝
                </p>
                <p>
                  • <strong>Help teammates</strong> - resolve conflicts together, learn from each other 🤝
                </p>
                <p>
                  • <strong>Embrace the chaos</strong> - real projects are messy, this prepares you! 🌪️
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🆘 Stuck? Try These Commands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 p-3 rounded">
                <p>git status # What's happening?</p>
                <p>git log --oneline # Recent commits</p>
                <p>git diff # What changed?</p>
                <p>git checkout -- filename # Undo file changes</p>
                <p>git reset HEAD~1 # Undo last commit</p>
                <p>git stash # Save work temporarily</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📚 Learn More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a href="https://learngitbranching.js.org/" className="text-blue-500 hover:underline">
                    Interactive Git Branching Tutorial
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a href="https://git-scm.com/docs" className="text-blue-500 hover:underline">
                    Official Git Documentation
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a href="https://github.com/git-tips/tips" className="text-blue-500 hover:underline">
                    Git Tips & Tricks
                  </a>
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
