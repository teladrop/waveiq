'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ThumbnailGenerator() {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [options, setOptions] = useState({
    prompt: '',
    negativePrompt: 'blurry, low quality, distorted, ugly, bad anatomy',
    style: 'cinematic',
    numInferenceSteps: 50,
    guidanceScale: 7.5,
  });

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/thumbnails/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error('Failed to generate thumbnail');
      }

      const data = await response.json();
      setThumbnail(data.url);
      toast.success('Thumbnail generated successfully!');
    } catch (error) {
      toast.error('Failed to generate thumbnail');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!thumbnail) return;

    try {
      const response = await fetch(thumbnail);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'thumbnail.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Failed to download thumbnail');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">AI Thumbnail Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Prompt</label>
            <Textarea
              value={options.prompt}
              onChange={(e) => setOptions({ ...options, prompt: e.target.value })}
              placeholder="Describe your thumbnail..."
              className="h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Negative Prompt</label>
            <Textarea
              value={options.negativePrompt}
              onChange={(e) => setOptions({ ...options, negativePrompt: e.target.value })}
              placeholder="What to avoid in the image..."
              className="h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Style</label>
            <Select
              value={options.style}
              onValueChange={(value) => setOptions({ ...options, style: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cinematic">Cinematic</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="digital-art">Digital Art</SelectItem>
                <SelectItem value="photographic">Photographic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Inference Steps: {options.numInferenceSteps}
            </label>
            <Slider
              value={[options.numInferenceSteps]}
              onValueChange={([value]) => setOptions({ ...options, numInferenceSteps: value })}
              min={20}
              max={100}
              step={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Guidance Scale: {options.guidanceScale}
            </label>
            <Slider
              value={[options.guidanceScale]}
              onValueChange={([value]) => setOptions({ ...options, guidanceScale: value })}
              min={1}
              max={20}
              step={0.1}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !options.prompt}
            className="w-full"
          >
            {loading ? 'Generating...' : 'Generate Thumbnail'}
          </Button>
        </div>

        <div>
          <Card className="p-4">
            {thumbnail ? (
              <div className="space-y-4">
                <img
                  src={thumbnail}
                  alt="Generated thumbnail"
                  className="w-full h-auto rounded-lg"
                />
                <Button
                  onClick={handleDownload}
                  className="w-full"
                >
                  Download Thumbnail
                </Button>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Generated thumbnail will appear here</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 