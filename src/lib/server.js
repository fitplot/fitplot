export const isServer = () => typeof window === 'undefined';

export const isBrowser = () => !isServer();

export const isFly = () => Boolean(process.env.FLY);

export const getBuildId = () => process.env.BUILD_ID;
