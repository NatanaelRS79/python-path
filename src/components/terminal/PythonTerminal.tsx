import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

interface PythonTerminalProps {
  initialCode?: string;
  onRun?: (code: string, output: string) => void;
  readOnly?: boolean;
  height?: string;
}

const PythonTerminal = ({ 
  initialCode = '', 
  onRun,
  readOnly = false,
  height = '300px'
}: PythonTerminalProps) => {
  const [code, setCode] = useState(initialCode);
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', content: '>>> Python 3.11.0 - Simulador PyPandas' },
    { type: 'system', content: '>>> Digite seu código e pressione Run (▶)' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);
  
  // Simple Python interpreter simulation
  const interpretPython = (code: string): { output: string; isError: boolean } => {
    const lines = code.split('\n').filter(l => l.trim());
    let output = '';
    let isError = false;
    const variables: Record<string, any> = {};
    
    try {
      for (const line of lines) {
        const trimmed = line.trim();
        
        // Handle print statements
        const printMatch = trimmed.match(/^print\s*\(\s*(.+)\s*\)$/);
        if (printMatch) {
          let value = printMatch[1];
          
          // Handle f-strings
          if (value.startsWith('f"') || value.startsWith("f'")) {
            const quote = value[1];
            const content = value.slice(2, -1);
            value = content.replace(/\{([^}]+)\}/g, (_, expr) => {
              return evaluateExpression(expr, variables);
            });
            output += value + '\n';
          }
          // Handle string literals
          else if ((value.startsWith('"') && value.endsWith('"')) || 
                   (value.startsWith("'") && value.endsWith("'"))) {
            output += value.slice(1, -1) + '\n';
          }
          // Handle variables and expressions
          else {
            output += evaluateExpression(value, variables) + '\n';
          }
          continue;
        }
        
        // Handle variable assignments
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          const [, varName, valueExpr] = assignMatch;
          variables[varName] = evaluateExpression(valueExpr, variables);
          continue;
        }
        
        // Handle type() calls
        const typeMatch = trimmed.match(/^type\s*\(\s*(\w+)\s*\)$/);
        if (typeMatch) {
          const varName = typeMatch[1];
          if (varName in variables) {
            const value = variables[varName];
            const type = typeof value === 'number' 
              ? (Number.isInteger(value) ? "<class 'int'>" : "<class 'float'>")
              : typeof value === 'string' ? "<class 'str'>"
              : typeof value === 'boolean' ? "<class 'bool'>"
              : Array.isArray(value) ? "<class 'list'>"
              : "<class 'object'>";
            output += type + '\n';
          } else {
            throw new Error(`NameError: name '${varName}' is not defined`);
          }
          continue;
        }
        
        // Handle len() calls
        const lenMatch = trimmed.match(/^len\s*\(\s*(\w+)\s*\)$/);
        if (lenMatch) {
          const varName = lenMatch[1];
          if (varName in variables) {
            const value = variables[varName];
            if (typeof value === 'string' || Array.isArray(value)) {
              output += value.length + '\n';
            } else {
              throw new Error(`TypeError: object has no len()`);
            }
          } else {
            throw new Error(`NameError: name '${varName}' is not defined`);
          }
          continue;
        }
      }
    } catch (e: any) {
      output = e.message || 'Error';
      isError = true;
    }
    
    return { output: output.trim(), isError };
  };
  
  const evaluateExpression = (expr: string, variables: Record<string, any>): any => {
    expr = expr.trim();
    
    // Handle string literals
    if ((expr.startsWith('"') && expr.endsWith('"')) || 
        (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    
    // Handle numbers
    if (!isNaN(Number(expr))) {
      return Number(expr);
    }
    
    // Handle booleans
    if (expr === 'True') return true;
    if (expr === 'False') return false;
    
    // Handle lists
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const content = expr.slice(1, -1);
      if (!content.trim()) return [];
      return content.split(',').map(item => evaluateExpression(item, variables));
    }
    
    // Handle variables
    if (expr in variables) {
      return variables[expr];
    }
    
    // Handle simple arithmetic
    const arithmeticMatch = expr.match(/^(.+?)\s*([\+\-\*\/])\s*(.+)$/);
    if (arithmeticMatch) {
      const [, left, op, right] = arithmeticMatch;
      const leftVal = evaluateExpression(left, variables);
      const rightVal = evaluateExpression(right, variables);
      
      switch (op) {
        case '+': return leftVal + rightVal;
        case '-': return leftVal - rightVal;
        case '*': return leftVal * rightVal;
        case '/': return leftVal / rightVal;
      }
    }
    
    return expr;
  };
  
  const runCode = () => {
    setIsRunning(true);
    
    // Add input to history
    const inputLines = code.split('\n').map(line => ({
      type: 'input' as const,
      content: `>>> ${line}`
    }));
    
    setTimeout(() => {
      const { output, isError } = interpretPython(code);
      
      const outputLine: TerminalLine = {
        type: isError ? 'error' : 'output',
        content: output || '(no output)'
      };
      
      setHistory(prev => [...prev, ...inputLines, outputLine]);
      onRun?.(code, output);
      setIsRunning(false);
    }, 300);
  };
  
  const resetTerminal = () => {
    setHistory([
      { type: 'system', content: '>>> Terminal reiniciado' },
    ]);
    setCode(initialCode);
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="rounded-xl border border-terminal-text/20 overflow-hidden bg-terminal-bg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-terminal-text/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-warning/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-2">
            python3
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCode}
            className="h-7 px-2 text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTerminal}
            className="h-7 px-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="terminal"
            size="sm"
            onClick={runCode}
            disabled={isRunning || !code.trim()}
            className="h-7 gap-1"
          >
            <Play className="w-3 h-3" />
            Run
          </Button>
        </div>
      </div>
      
      {/* Output Area */}
      <div 
        ref={outputRef}
        className="p-4 font-mono text-sm overflow-y-auto"
        style={{ height: `calc(${height} - 100px)` }}
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={cn(
              "whitespace-pre-wrap",
              line.type === 'input' && 'text-terminal-text',
              line.type === 'output' && 'text-foreground',
              line.type === 'error' && 'text-destructive',
              line.type === 'system' && 'text-muted-foreground italic'
            )}
          >
            {line.content}
          </div>
        ))}
        {isRunning && (
          <div className="text-terminal-cursor animate-pulse">
            Executando...
          </div>
        )}
      </div>
      
      {/* Code Input */}
      {!readOnly && (
        <div className="border-t border-terminal-text/10">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="# Digite seu código Python aqui..."
            className={cn(
              "w-full p-4 bg-terminal-bg text-terminal-text font-mono text-sm",
              "resize-none focus:outline-none focus:ring-1 focus:ring-terminal-cursor",
              "placeholder:text-muted-foreground/50"
            )}
            style={{ height: '100px' }}
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
};

export default PythonTerminal;