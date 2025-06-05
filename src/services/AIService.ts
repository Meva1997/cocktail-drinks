import {streamText} from 'ai'
import { openrouter } from '../lib/ai'

export default {
  async generateRecipe(prompt: string){
    const result = streamText({
      model: openrouter('nvidia/llama-3.3-nemotron-super-49b-v1:free'),
      prompt,
      system: 'Eres un bartender con experienca',
      temperature: 0.5
    })

    return result.textStream
  }
} 