"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const calculatorConfig = {
  // STEP 3: Students will change these settings differently, creating conflicts
  theme: "default", // "default" | "scientific" | "programmer" | "colorful"
  precision: 10, // Different students prefer different precision
  showHistory: false, // STEP 3: Some students will want true
  playSound: false, // STEP 3: Some students will want true
  buttonStyle: "rounded", // "rounded" | "square" | "circular"

  // STEP 5: Advanced preferences - uncomment and customize these
  // displayMode: "standard", // "standard" | "scientific" | "engineering"
  // memorySlots: 3, // How many memory slots (M1, M2, M3)
  // autoSave: true, // Save calculations between sessions
  // keyboardShortcuts: true, // Enable keyboard input
  // animations: true, // Button press animations

  // STEP 3: Students will add their own custom functions here
  customFunctions: [
    // STEP 3: Uncomment these and add your own!
    // { name: "square", symbol: "x²", operation: (x) => x * x },
    // { name: "cube", symbol: "x³", operation: (x) => x * x * x },
    // { name: "sqrt", symbol: "√", operation: (x) => Math.sqrt(x) },
    // { name: "factorial", symbol: "n!", operation: (x) => x <= 1 ? 1 : x * factorial(x-1) },
    // Students add different functions, creating merge conflicts
  ],

  // STEP 5: Different students will prefer different layouts
  // layout: "standard", // "standard" | "compact" | "extended" | "scientific"

  // STEP 3: Students customize these colors differently - MAJOR CONFLICT ZONE!
  colors: {
    primary: "#3b82f6", // Student A might prefer blue
    secondary: "#10b981", // Student B might prefer green
    accent: "#f59e0b", // Student C might prefer orange
    // STEP 3: Add your favorite colors here!
    // danger: "#ef4444", // For clear/delete buttons
    // success: "#22c55e", // For equals button
    // This creates perfect color conflicts!
  },

  // STEP 5: Advanced theming options - uncomment in Step 5
  // advancedTheme: {
  //   gradients: false, // Enable gradient buttons
  //   shadows: true, // Drop shadows on buttons
  //   borderRadius: "medium", // "small" | "medium" | "large" | "full"
  //   fontSize: "normal", // "small" | "normal" | "large"
  //   buttonSpacing: "normal", // "tight" | "normal" | "loose"
  // }
}

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  // const [memory, setMemory] = useState<number[]>([0, 0, 0]) // STEP 5: Uncomment for memory functions

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      const calculation = `${previousValue} ${operation} ${inputValue} = ${newValue}`

      if (calculatorConfig.showHistory) {
        setHistory((prev) => [calculation, ...prev.slice(0, 9)]) // Keep last 10
      }

      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  // STEP 3: Uncomment this function and the scientific buttons below
  // const advancedOperation = (func: string) => {
  //   const value = Number.parseFloat(display)
  //   let result: number

  //   switch (func) {
  //     case "sqrt":
  //       result = Math.sqrt(value)
  //       break
  //     case "square":
  //       result = value * value
  //       break
  //     case "cube":
  //       result = value * value * value
  //       break
  //     case "sin":
  //       result = Math.sin((value * Math.PI) / 180) // Convert to radians
  //       break
  //     case "cos":
  //       result = Math.cos((value * Math.PI) / 180)
  //       break
  //     case "tan":
  //       result = Math.tan((value * Math.PI) / 180)
  //       break
  //     case "log":
  //       result = Math.log10(value)
  //       break
  //     case "ln":
  //       result = Math.log(value)
  //       break
  //     case "factorial":
  //       result = value <= 1 ? 1 : Array.from({length: value}, (_, i) => i + 1).reduce((a, b) => a * b, 1)
  //       break
  //     default:
  //       return
  //   }

  //   setDisplay(String(result))
  //   setWaitingForOperand(true)
  // }

  // STEP 5: Memory functions - uncomment these
  // const memoryStore = (slot: number) => {
  //   const value = Number.parseFloat(display)
  //   setMemory(prev => {
  //     const newMemory = [...prev]
  //     newMemory[slot] = value
  //     return newMemory
  //   })
  // }

  // const memoryRecall = (slot: number) => {
  //   setDisplay(String(memory[slot]))
  //   setWaitingForOperand(true)
  // }

  const buttonClass = "h-12 text-lg font-semibold transition-all duration-200 hover:scale-105"
  const numberButtonClass = `${buttonClass} bg-muted hover:bg-muted/80`
  const operatorButtonClass = `${buttonClass} bg-primary hover:bg-primary/90 text-primary-foreground`
  const equalsButtonClass = `${buttonClass} bg-green-500 hover:bg-green-600 text-white`
  const scientificButtonClass = `${buttonClass} bg-purple-500 hover:bg-purple-600 text-white text-sm`
  // const memoryButtonClass = `${buttonClass} bg-orange-500 hover:bg-orange-600 text-white text-xs` // STEP 5

  return (
    <div className="h-full flex flex-col bg-background p-4">
      <div className="flex gap-4 h-full">
        {/* Main Calculator */}
        <Card className="flex-1 max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">
              Calculator v{calculatorConfig.theme === "scientific" ? "2.0" : "1.0"}
              {/* STEP 3: This version number will change based on features enabled */}
            </CardTitle>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-right text-2xl font-mono font-bold min-h-[2rem] flex items-center justify-end">
                {display}
              </div>
              {/* STEP 5: Uncomment for operation display
              {operation && previousValue !== null && (
                <div className="text-right text-sm text-muted-foreground">
                  {previousValue} {operation}
                </div>
              )}
              */}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
              <Button onClick={clear} className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white col-span-2`}>
                Clear
              </Button>
              <Button onClick={() => inputOperation("÷")} className={operatorButtonClass}>
                ÷
              </Button>
              <Button onClick={() => inputOperation("×")} className={operatorButtonClass}>
                ×
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button onClick={() => inputNumber("7")} className={numberButtonClass}>
                7
              </Button>
              <Button onClick={() => inputNumber("8")} className={numberButtonClass}>
                8
              </Button>
              <Button onClick={() => inputNumber("9")} className={numberButtonClass}>
                9
              </Button>
              <Button onClick={() => inputOperation("-")} className={operatorButtonClass}>
                -
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button onClick={() => inputNumber("4")} className={numberButtonClass}>
                4
              </Button>
              <Button onClick={() => inputNumber("5")} className={numberButtonClass}>
                5
              </Button>
              <Button onClick={() => inputNumber("6")} className={numberButtonClass}>
                6
              </Button>
              <Button onClick={() => inputOperation("+")} className={operatorButtonClass}>
                +
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button onClick={() => inputNumber("1")} className={numberButtonClass}>
                1
              </Button>
              <Button onClick={() => inputNumber("2")} className={numberButtonClass}>
                2
              </Button>
              <Button onClick={() => inputNumber("3")} className={numberButtonClass}>
                3
              </Button>
              <Button onClick={performCalculation} className={`${equalsButtonClass} row-span-2`}>
                =
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button onClick={() => inputNumber("0")} className={`${numberButtonClass} col-span-2`}>
                0
              </Button>
              <Button onClick={() => inputNumber(".")} className={numberButtonClass}>
                .
              </Button>
            </div>

            {/* STEP 3: Uncomment this section for scientific functions */}
            {/* 
            <div className="grid grid-cols-4 gap-1 mt-3 pt-3 border-t">
              <Button onClick={() => advancedOperation("sqrt")} className={scientificButtonClass}>
                √
              </Button>
              <Button onClick={() => advancedOperation("square")} className={scientificButtonClass}>
                x²
              </Button>
              <Button onClick={() => advancedOperation("cube")} className={scientificButtonClass}>
                x³
              </Button>
              <Button onClick={() => advancedOperation("sin")} className={scientificButtonClass}>
                sin
              </Button>
              <Button onClick={() => advancedOperation("cos")} className={scientificButtonClass}>
                cos
              </Button>
              <Button onClick={() => advancedOperation("tan")} className={scientificButtonClass}>
                tan
              </Button>
              <Button onClick={() => advancedOperation("log")} className={scientificButtonClass}>
                log
              </Button>
              <Button onClick={() => advancedOperation("ln")} className={scientificButtonClass}>
                ln
              </Button>
            </div>
            */}

            {/* STEP 5: Memory functions - uncomment these
            <div className="grid grid-cols-3 gap-1 mt-2 pt-2 border-t">
              <Button onClick={() => memoryStore(0)} className={memoryButtonClass}>
                MS1
              </Button>
              <Button onClick={() => memoryStore(1)} className={memoryButtonClass}>
                MS2
              </Button>
              <Button onClick={() => memoryStore(2)} className={memoryButtonClass}>
                MS3
              </Button>
              <Button onClick={() => memoryRecall(0)} className={memoryButtonClass}>
                MR1
              </Button>
              <Button onClick={() => memoryRecall(1)} className={memoryButtonClass}>
                MR2
              </Button>
              <Button onClick={() => memoryRecall(2)} className={memoryButtonClass}>
                MR3
              </Button>
            </div>
            */}
          </CardContent>
        </Card>

        {/* STEP 3: History Panel - Students can enable this by setting showHistory to true */}
        {calculatorConfig.showHistory && (
          <Card className="w-64">
            <CardHeader>
              <CardTitle className="text-sm">Calculation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-xs font-mono">
                {history.length === 0 ? (
                  <p className="text-muted-foreground">No calculations yet</p>
                ) : (
                  history.map((calc, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-xs">
                      {calc}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Git Exercise Instructions */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">🎯 Progressive Git Exercises:</p>
        <div className="text-xs text-blue-600 dark:text-blue-200 mt-1 space-y-1">
          <p>
            <strong>Step 3:</strong> Set showHistory to true and uncomment scientific functions
          </p>
          <p>
            <strong>Step 5:</strong> Uncomment advanced theme options and memory functions
          </p>
          <p>
            <strong>Step 6:</strong> Create "feature-calculator-pro" branch for advanced features
          </p>
          <p>
            <strong>Step 7:</strong> Merge branches and resolve config conflicts! 🔥
          </p>
        </div>
      </div>

      {/* Configuration Display for Learning */}
      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
        <p className="font-semibold text-yellow-700 dark:text-yellow-300">Current Config (Conflict Zone!):</p>
        <p className="text-yellow-600 dark:text-yellow-200">
          Theme: {calculatorConfig.theme} | History: {calculatorConfig.showHistory ? "ON" : "OFF"} | Functions:{" "}
          {calculatorConfig.customFunctions.length} | Colors: {Object.keys(calculatorConfig.colors).length} defined
        </p>
        <p className="text-yellow-500 dark:text-yellow-300 text-xs mt-1">
          💡 Different students will have different settings here - perfect for merge conflicts!
        </p>
      </div>
    </div>
  )
}
