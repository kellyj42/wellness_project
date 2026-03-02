# Google Reviews API Setup Guide

This guide will help you set up the Google Places API to automatically fetch your Google Business reviews.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Name your project (e.g., "Green Bean Website")
4. Click "Create"

## Step 2: Enable Places API

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Places API"
3. Click on "Places API" and click **"Enable"**

## Step 3: Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy your API key (keep it safe!)
4. Click **"Restrict Key"** (recommended for security)

### Restrict Your API Key (Recommended):

- Under "API restrictions":
  - Select "Restrict key"
  - Check "Places API"
- Under "Website restrictions" (if deploying):
  - Add your domain: `https://yourdomain.com/*`
- Click "Save"

## Step 4: Find Your Google Place ID

### Method 1: Using Place ID Finder

1. Go to [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for "Green Bean Cafe Kampala"
3. Click on your business
4. Copy the **Place ID** (it looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

### Method 2: Using Google Maps URL

1. Go to your Google Business Profile
2. Look at the URL - the Place ID might be visible
3. Or use the map link from your Google reviews page

## Step 5: Add to Environment Variables

Open `.env.local` in your project and update:

```env
GOOGLE_PLACES_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxx
GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
```

## Step 6: Restart Development Server

After adding your credentials:

```bash
npm run dev
```

The reviews should now load automatically from Google!

## Important Notes

### Free Tier Limits

- Google Places API offers **$200 free credit per month**
- Each request costs approximately **$0.017**
- With 1-hour caching, you'll use ~720 requests/month = **~$12/month**
- This stays within the free tier!

### Caching

- Reviews are cached for 1 hour to minimize API calls
- This keeps costs low and improves performance

### Review Limitations

- Google returns a maximum of **5 reviews** by default
- Reviews are the most recent and most relevant
- To show more reviews, you may need to manually curate them

### Security

- Never commit `.env.local` to GitHub
- API keys should remain private
- Use API restrictions to prevent unauthorized use

## Troubleshooting

### "Missing API key or Place ID" Error

- Check that `.env.local` has both values set
- Restart your development server after adding them

### "Failed to fetch reviews" Error

- Verify your API key is correct
- Check that Places API is enabled in Google Cloud Console
- Verify your Place ID is correct

### No Reviews Showing

- Check browser console for errors
- Verify your Google Business has reviews
- Test your API key and Place ID in the Place ID Finder

## Need Help?

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Place ID Finder Tool](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
- [Google Cloud Console](https://console.cloud.google.com/)
