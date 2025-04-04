declare global {
  interface Window {
    globalConfig: {
      apiUrl: string;
      appName: string;
      appType?: string;
      RouteType?:'WITH_ROUTE'|'WITH_TAB',
      IsNotProgressiveApp?:boolean,
    };
  }
}

export {};
