const getEnvValue = (key: string, defaultValue: string) => {
  if (window._env_ && window._env_[key]) {
    return window._env_[key];
  }
  return import.meta.env[`VITE_${key}`] || defaultValue;
};

const envConfig = {
  SERVICE_KEY: getEnvValue(
    'SERVICE_KEY',
    '%2F5qF%2FDiluQe4p9Xir2WejBjeDhLblJMP6lXDxkRm%2F%2FvozkXLnlyHUGqP%2BLc0XdX9hWo7x2GuA0TGKDLtGA3tyQ%3D%3D',
  ),
};

export default envConfig;
