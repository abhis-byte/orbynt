const apiKeys = {
  default: import.meta.env.REACT_APP_GEMINI_API_KEY,

  gemini: import.meta.env.REACT_APP_GEMINI_API_KEY,
  replicate: import.meta.env.REACT_APP_REPLICATE_API_TOKEN,
  stability: import.meta.env.REACT_APP_STABILITY_API_KEY,
  elevenlabs: import.meta.env.REACT_APP_ELEVENLABS_API_KEY,

  finnhub: import.meta.env.REACT_APP_FINNHUB_API_KEY,
  removeBg: import.meta.env.REACT_APP_REMOVE_BG_API_KEY,
  deepai: import.meta.env.REACT_APP_DEEPAI_API_KEY
};

export default apiKeys;