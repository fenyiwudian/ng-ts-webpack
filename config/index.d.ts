
declare module 'config' {
  export default config;
}

interface Config {
  env: string;
  host: string;
}


declare const config: Config;
