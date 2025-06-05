import {streamText} from 'ai'
import { openrouter } from '../lib/ai'

export default {
  async generateRecipe(prompt: string){
    const result = streamText({
      model: openrouter('meta-llama/llama-3.3-8b-instruct:free'),
      prompt,
      system: 'Eres un bartender con experienca',
      temperature: 0.5
    })

    return result.textStream
  }
}