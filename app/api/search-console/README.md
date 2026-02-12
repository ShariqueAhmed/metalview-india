# Google Search Console API Integration Setup

This API route integrates with Google Search Console to fetch search performance data.

## Prerequisites

1. **Google Cloud Project** with Search Console API enabled
2. **OAuth 2.0 credentials** OR **Service Account** credentials
3. **Verified property** in Google Search Console

## Setup Options

### Option 1: OAuth 2.0 (Recommended for Development)

1. **Create OAuth 2.0 Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs
   - Copy Client ID and Client Secret

2. **Get Refresh Token:**
   - Use OAuth 2.0 Playground or implement OAuth flow
   - Exchange authorization code for refresh token

3. **Add Environment Variables:**
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REFRESH_TOKEN=your-refresh-token
   ```

### Option 2: Service Account (Recommended for Production)

1. **Create Service Account:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Grant "Search Console API User" role

2. **Create Key:**
   - Click on the service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download the key file

3. **Grant Access in Search Console:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Select your property
   - Go to "Settings" > "Users and permissions"
   - Add the service account email as an owner

4. **Add Environment Variables:**
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=your-private-key-from-json
   ```

## API Endpoints

### GET /api/search-console

Fetches search performance data from Google Search Console.

**Query Parameters:**
- `days` (optional): Number of days to fetch (default: 28)
- `startDate` (optional): Start date in YYYY-MM-DD format
- `endDate` (optional): End date in YYYY-MM-DD format

**Example:**
```
GET /api/search-console?days=30
GET /api/search-console?startDate=2024-01-01&endDate=2024-01-31
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalClicks": 1234,
    "totalImpressions": 56789,
    "averageCTR": 2.17,
    "averagePosition": 12.5,
    "topQueries": [
      {
        "query": "gold price mumbai",
        "clicks": 234,
        "impressions": 1234,
        "ctr": 18.96,
        "position": 3.2
      }
    ],
    "topPages": [
      {
        "page": "/gold/price-in/mumbai",
        "clicks": 456,
        "impressions": 2345,
        "ctr": 19.45,
        "position": 2.8
      }
    ],
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    }
  }
}
```

## Implementation Notes

The current implementation returns mock/empty data when credentials are not configured. To enable actual data fetching:

1. Implement OAuth token refresh logic (for OAuth 2.0)
2. Implement Service Account JWT signing (for Service Account)
3. Make actual API calls to Google Search Console API
4. Process and format the response data

## Google Search Console API Documentation

- [Official Documentation](https://developers.google.com/webmaster-tools/search-console-api-original)
- [API Reference](https://developers.google.com/webmaster-tools/search-console-api-original/v1)
- [Authentication Guide](https://developers.google.com/identity/protocols/oauth2)

## Security Notes

- Never commit credentials to version control
- Use environment variables for all sensitive data
- Rotate credentials regularly
- Use Service Account for production (more secure)
- Implement rate limiting to avoid API quota issues

## Troubleshooting

### "API not configured" message
- Check that environment variables are set correctly
- Verify credentials are valid
- Ensure Search Console API is enabled in Google Cloud Console

### "Access denied" errors
- Verify service account has access in Search Console
- Check OAuth scopes include Search Console API
- Ensure property is verified in Search Console

### No data returned
- Check date range (data may not be available for recent dates)
- Verify site has search traffic
- Ensure property is correctly configured
