declare global {
  interface Window {
    globalConfig: {
      apiUrl: string;
      appName: string;
      appType?: string;
    };
  }
}

export {};
