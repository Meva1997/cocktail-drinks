
import type { StateCreator } from "zustand";
import AIService from "../services/AIService";

export type AISlice = {
  recipe: string;
  isGenerating: boolean;
  generateRecipe: (prompt: string) => Promise<void>;
};

export const createAISlice: StateCreator<AISlice> = (set) => ({
  recipe: "",
  isGenerating: false,
  generateRecipe: async (prompt: string) => {
    set({ recipe: "", isGenerating: true });

    const { textStream } = await AIService.generateRecipe(prompt);

    for await (const chunk of textStream) {
      set((state) => ({ recipe: state.recipe + chunk }));
    }


    set({ isGenerating: false });
  },
});
