const platform = process.env.RE_PLATFORM || process.env.PLATFORM || 'web'
export const getPlatform = () => platform
