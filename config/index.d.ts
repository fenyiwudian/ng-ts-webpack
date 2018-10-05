
declare module 'config' {
  export default config;
}

interface Config {
  env: string;
  host: string;
  cdn: string;
}


declare const config: Config;
