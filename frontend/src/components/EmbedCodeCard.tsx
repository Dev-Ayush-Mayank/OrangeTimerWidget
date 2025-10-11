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
<div id="timer-widget-container"></div>
<script>
 TimerWidget.init({
    container: '#timer-widget-container',
    config: ${configJSON}
  });
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
            <li>Replace "https://your-domain.com/timer-widget.js" with your hosted widget URL</li>
            <li>Copy the embed code above</li>
            <li>Paste it into your HTML file where you want the timer</li>
            <li>The timer will automatically initialize with your configuration</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
