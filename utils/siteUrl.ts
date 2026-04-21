export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metalview.in';

  return configuredUrl.replace(/\/$/, '');
}
