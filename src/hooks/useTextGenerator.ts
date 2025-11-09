import { useState, useCallback } from 'react';
import { getRandomLanguage, getRandomSignature } from '../utils/helpers';
import { TEXT_CONTENT, type Language } from '../utils/constants';

export interface TextConfig {
  language: Language;
  signature: string;
  parts: readonly string[];
  xOffsets: readonly number[];
  additionalXOffsets: readonly number[];
  additionalYOffsets: readonly number[];
}

/**
 * Hook to manage multilingual text generation
 */
export const useTextGenerator = () => {
  const [textConfig, setTextConfig] = useState<TextConfig>(() => {
    const language = getRandomLanguage();
    const content = TEXT_CONTENT[language];
    return {
      language,
      signature: getRandomSignature(),
      parts: content.parts,
      xOffsets: content.xOffsets,
      additionalXOffsets: content.additionalXOffsets,
      additionalYOffsets: content.additionalYOffsets,
    };
  });

  const regenerateText = useCallback(() => {
    const language = getRandomLanguage();
    const content = TEXT_CONTENT[language];
    setTextConfig({
      language,
      signature: getRandomSignature(),
      parts: content.parts,
      xOffsets: content.xOffsets,
      additionalXOffsets: content.additionalXOffsets,
      additionalYOffsets: content.additionalYOffsets,
    });
  }, []);

  return { textConfig, regenerateText };
};
