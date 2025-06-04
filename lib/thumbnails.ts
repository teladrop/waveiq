import Replicate from 'replicate';
import sharp from 'sharp';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export interface ThumbnailOptions {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
  style?: 'cinematic' | 'anime' | 'digital-art' | 'photographic';
}

export async function generateThumbnail(options: ThumbnailOptions) {
  try {
    // Default options
    const {
      prompt,
      negativePrompt = 'blurry, low quality, distorted, ugly, bad anatomy',
      width = 1280,
      height = 720,
      numInferenceSteps = 50,
      guidanceScale = 7.5,
      style = 'cinematic',
    } = options;

    // Add style to prompt
    const enhancedPrompt = `${prompt}, ${style} style, high quality, detailed, professional thumbnail`;

    // Generate image using Stable Diffusion
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: enhancedPrompt,
          negative_prompt: negativePrompt,
          width,
          height,
          num_inference_steps: numInferenceSteps,
          guidance_scale: guidanceScale,
        }
      }
    );

    if (!output || typeof output !== 'string') {
      throw new Error('Failed to generate thumbnail');
    }

    // Optimize the image for web
    const optimizedImage = await optimizeImage(output);

    return {
      url: optimizedImage,
      prompt: enhancedPrompt,
      negativePrompt,
      width,
      height,
    };
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
}

async function optimizeImage(imageUrl: string) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    // Optimize using sharp
    const optimized = await sharp(Buffer.from(buffer))
      .resize(1280, 720, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .jpeg({
        quality: 90,
        progressive: true
      })
      .toBuffer();

    // Convert to base64
    return `data:image/jpeg;base64,${optimized.toString('base64')}`;
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
} 