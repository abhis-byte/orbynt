import apiKeys from '../config/apikeys';

export function getApiKey(toolId) {
  switch (toolId) {
    case 'image-generator':
    case 'video-generator':
      return apiKeys.stability;

    case 'voice-generator':
    case 'text-to-speech':
      return apiKeys.elevenlabs;

    case 'speech-to-text':
      return apiKeys.replicate;

    case 'trading-helper':
      return apiKeys.finnhub;

    case 'background-remover':
      return apiKeys.removeBg;

    case 'photo-enhancer':
      return apiKeys.deepai;

    default:
      return apiKeys.default;
  }
}