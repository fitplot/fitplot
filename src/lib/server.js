export const isServer = () => typeof window === 'undefined';

export const isBrowser = () => !isServer();

export const getBuildId = () => process.env.BUILD_ID;
