/**
 * ============================================================================
 * Rank Math SEO - Google Instant Indexing API Automation Script
 * Website: https://buypvagmail.com
 * Protocol: Google Indexing API v3 (indexing.googleapis.com)
 * ============================================================================
 * 
 * HOW TO USE THIS SCRIPT:
 * 1. Go to Google Cloud Console (https://console.cloud.google.com/)
 * 2. Create a project and Enable "Google Indexing API" (indexing.googleapis.com)
 * 3. Create a Service Account (e.g. indexer@your-project.iam.gserviceaccount.com)
 * 4. Create & Download JSON Key for this Service Account (save as `service_account.json` in the same directory)
 * 5. Go to Google Search Console (https://search.google.com/search-console/users)
 *    and add the Service Account Email as an "Owner" of https://buypvagmail.com/
 * 6. Run: npm install googleapis
 * 7. Run: node rankmath-google-instant-index.js
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Master List of BuyPvaGmail URLs to Instantly Index
const URLS_TO_INDEX = [
  // Core Landing & Service Catalog Pages
  'https://buypvagmail.com/',
  'https://buypvagmail.com/services',
  'https://buypvagmail.com/pricing',
  'https://buypvagmail.com/blog',
  'https://buypvagmail.com/faq',
  'https://buypvagmail.com/about',
  'https://buypvagmail.com/contact',
  'https://buypvagmail.com/warranty',
  'https://buypvagmail.com/terms',
  'https://buypvagmail.com/privacy',
  'https://buypvagmail.com/sitemap',

  // Product Service Pages
  'https://buypvagmail.com/services/usa-gmail-accounts',
  'https://buypvagmail.com/services/pva-gmail-accounts',
  'https://buypvagmail.com/services/aged-mix-country-gmail',
  'https://buypvagmail.com/services/aged-gmail-for-reviews',
  'https://buypvagmail.com/services/aged-gmail-for-google-ads',
  'https://buypvagmail.com/services/new-gmail-accounts',

  // Vintage 2008-2025 Aged Gmail Pages
  'https://buypvagmail.com/services/aged-2008-gmail-accounts',
  'https://buypvagmail.com/services/aged-2009-gmail-accounts',
  'https://buypvagmail.com/services/aged-2010-gmail-accounts',
  'https://buypvagmail.com/services/aged-2011-gmail-accounts',
  'https://buypvagmail.com/services/aged-2012-gmail-accounts',
  'https://buypvagmail.com/services/aged-2013-gmail-accounts',
  'https://buypvagmail.com/services/aged-2014-gmail-accounts',
  'https://buypvagmail.com/services/aged-2015-gmail-accounts',
  'https://buypvagmail.com/services/aged-2016-gmail-accounts',
  'https://buypvagmail.com/services/aged-2017-gmail-accounts',
  'https://buypvagmail.com/services/aged-2018-gmail-accounts',
  'https://buypvagmail.com/services/aged-2019-gmail-accounts',
  'https://buypvagmail.com/services/aged-2020-gmail-accounts',
  'https://buypvagmail.com/services/aged-2021-gmail-accounts',
  'https://buypvagmail.com/services/aged-2022-gmail-accounts',
  'https://buypvagmail.com/services/aged-2023-gmail-accounts',
  'https://buypvagmail.com/services/aged-2024-gmail-accounts',
  'https://buypvagmail.com/services/aged-2025-gmail-accounts'
];

async function submitInstantIndexing() {
  console.log('====================================================');
  console.log('🚀 Rank Math Google Instant Indexing Dispatcher');
  console.log(`🌐 Target Domain: https://buypvagmail.com`);
  console.log(`📄 Total URLs to submit: ${URLS_TO_INDEX.length}`);
  console.log('====================================================\n');

  const keyFilePath = path.join(__dirname, 'service_account.json');

  if (!fs.existsSync(keyFilePath)) {
    console.error('❌ ERROR: `service_account.json` not found in the current directory!');
    console.log('👉 Please download your Google Service Account key JSON file and rename it to `service_account.json`');
    process.exit(1);
  }

  try {
    const key = require(keyFilePath);
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/indexing'],
      null
    );

    console.log(`🔑 Authenticating as: ${key.client_email}...`);
    await jwtClient.authorize();
    console.log('✅ Google API JWT Authentication Successful!\n');

    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < URLS_TO_INDEX.length; i++) {
      const url = URLS_TO_INDEX[i];
      process.stdout.write(`[${i + 1}/${URLS_TO_INDEX.length}] Submitting ${url} ... `);

      try {
        const response = await google.indexing({
          version: 'v3',
          auth: jwtClient
        }).urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED' // Options: 'URL_UPDATED' or 'URL_DELETED'
          }
        });

        if (response.status === 200) {
          console.log(`✅ OK (Notified at: ${response.data.urlNotificationMetadata?.latestUpdate?.notifyTime || 'Just now'})`);
          successCount++;
        } else {
          console.log(`⚠️ Status: ${response.status}`);
        }
      } catch (err) {
        console.log(`❌ FAILED: ${err.message}`);
        failureCount++;
      }

      // 200ms delay between API calls to avoid rate limit spikes
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log('\n====================================================');
    console.log(`🎉 Instant Indexing Batch Complete!`);
    console.log(`✅ Success: ${successCount} URLs`);
    console.log(`❌ Failed:  ${failureCount} URLs`);
    console.log('====================================================');
  } catch (err) {
    console.error('Fatal execution error:', err);
  }
}

submitInstantIndexing();
