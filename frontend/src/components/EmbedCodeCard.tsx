import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import type { TimerConfig } from "../lib/timer";

interface EmbedCodeCardProps {
  config: TimerConfig;
}

export const EmbedCodeCard = ({ config }: EmbedCodeCardProps) => {
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    const configJSON = JSON.stringify(config, null, 2);

    return ` Timer Widget Embed Code
<div id="countdown-timer-widget"></div>
<script>
(function() {
  const config = ${configJSON};
  
  // Parse custom CSS
  function parseCustomCSS(cssString) {
    const styles = {};
    if (!cssString) return styles;
    const declarations = cssString.split(';').filter(d => d.trim());
    declarations.forEach(decl => {
      const [prop, value] = decl.split(':').map(s => s.trim());
      if (prop && value) {
        const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styles[camelProp] = value;
      }
    });
    return styles;
  }

  const textStyles = parseCustomCSS(config.customTextCSS);
  const buttonStyles = parseCustomCSS(config.customButtonCSS);
  const timerStyles = parseCustomCSS(config.customTimerCSS);

  // Create widget container
  const container = document.getElementById('countdown-timer-widget');
  container.style.cssText = \`
    background: \${config.backgroundImage ? \`url(\${config.backgroundImage}) center/cover\` : config.backgroundColor};
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    min-height: 400px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  \`;

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = config.text;
  heading.style.cssText = \`
    font-size: 32px;
    font-weight: bold;
    color: \${config.textColor};
    text-align: center;
    margin: 0;
  \`;
  Object.assign(heading.style, textStyles);

  // Create timer container
  const timerContainer = document.createElement('div');
  timerContainer.style.cssText = \`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  \`;

  // Timer update function
  function updateTimer() {
    const now = new Date().getTime();
    const target = new Date(config.targetDate).getTime();
    const distance = target - now;

    if (distance < 0) {
      timerContainer.innerHTML = '<div style="font-size: 24px; color: ' + config.textColor + ';">Timer Expired</div>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeUnits = [
      { value: days, label: config.labelDays },
      { value: hours, label: config.labelHours },
      { value: minutes, label: config.labelMinutes },
      { value: seconds, label: config.labelSeconds }
    ];

    timerContainer.innerHTML = '';
    timeUnits.forEach(unit => {
      const unitDiv = document.createElement('div');
      unitDiv.style.cssText = \`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      \`;

      const valueDiv = document.createElement('div');
      const borderRadius = config.timerStyle === 'circle' ? '50%' : 
                          config.timerStyle === 'rounded' ? '12px' : 
                          config.timerStyle === 'square' ? '4px' : '0';
      valueDiv.style.cssText = \`
        background: \${config.timerColor};
        color: \${config.timerTextColor};
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: bold;
        border-radius: \${borderRadius};
        \${config.showTimerShadow ? 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);' : ''}
      \`;
      valueDiv.textContent = String(unit.value).padStart(2, '0');
      Object.assign(valueDiv.style, timerStyles);

      if (config.showLabels) {
        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = \`
          font-size: 14px;
          color: \${config.textColor};
          opacity: 0.7;
        \`;
        labelDiv.textContent = unit.label;
        unitDiv.appendChild(valueDiv);
        unitDiv.appendChild(labelDiv);
      } else {
        unitDiv.appendChild(valueDiv);
      }

      timerContainer.appendChild(unitDiv);
    });
  }

  // Create button
  const button = config.showButton ? document.createElement('a') : null;
  if (button) {
    button.href = config.buttonUrl;
    button.textContent = config.buttonText;
    button.style.cssText = \`
      background: \${config.buttonColor};
      color: \${config.buttonTextColor};
      padding: 12px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s;
      \${config.showButtonShadow ? 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);' : ''}
    \`;
    Object.assign(button.style, buttonStyles);
    button.onmouseover = () => button.style.background = config.buttonHoverColor;
    button.onmouseout = () => button.style.background = config.buttonColor;
  }

  // Append elements based on position
  if (config.textPosition === 'top') container.appendChild(heading);
  container.appendChild(timerContainer);
  if (config.textPosition === 'bottom') container.appendChild(heading);
  if (button) container.appendChild(button);

  // Start timer
  updateTimer();
  setInterval(updateTimer, 1000);
})();
</script>`;
  };

  const handleCopy = async () => {
    const code = generateEmbedCode();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Code</CardTitle>
        <CardDescription>
          Copy this code and paste it into your website where you want the timer
          to appear
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='relative'>
          <pre className='bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto'>
            <code>{generateEmbedCode()}</code>
          </pre>
          <Button
            onClick={handleCopy}
            size='sm'
            className='absolute top-2 right-2 mr-4'
            variant='secondary'
          >
            {copied ? (
              <>
                <Check className='h-4 w-4' />
                Copied!
              </>
            ) : (
              <>
                <Copy className='h-4 w-4' />
                Copy Code
              </>
            )}
          </Button>
        </div>
        <div className='text-sm text-muted-foreground'>
          <p className='font-semibold mb-2'>How to use:</p>
          <ol className='list-decimal list-inside space-y-1'>
            <li>Copy the embed code above</li>
            <li>Paste it into your HTML file where you want the timer</li>
            <li>The timer will automatically start counting down</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
