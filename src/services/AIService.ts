import {streamText} from "ai"
import { openrouter } from "../lib/ai"

export default {
  async generateRecipe(prompt: string){
    const result = streamText({
      model: openrouter('meta-llama/llama-3.3-8b-instruct:free'),
      prompt,
      system: "Eres un bartender que platica mucho, es agradable y  con una amplia experiencia",
      temperature: .2
    })

    return result.textStream
  }
}