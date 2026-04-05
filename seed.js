/**
 * Batclim - Strapi Seed Script (Final Fix)
 * Usage: STRAPI_TOKEN=your_token node seed.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = 'dd18c55371218da1b237e5b814c2ba32f8a3226f5352eadad9e6145c82f2bf9d6795750380bb53dce81ca9ecb9989f78dc21fd77dfa93c55238994620cc8312a11a9847cdcfacb67ae7f2e8453d8419bb65ec3aa609ca3a809fbbf48334f76736d70a431480509b6e683a84598e5fe80efe77a4ec7f2f73fa188f35779052a20';

if (!STRAPI_TOKEN) {
  console.error('\n❌ STRAPI_TOKEN is missing. Add it to your .env file.');
  process.exit(1);
}
 
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`,
};
 
// ─── HTTP Helpers ─────────────────────────────────────────────────────────────
 
async function post(endpoint, data) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ data }) });
  const json = await res.json();
  if (!res.ok) {
    console.error(`❌ POST /${endpoint} failed:`, JSON.stringify(json?.error || json, null, 2));
    return null;
  }
  console.log(`✅ Created /${endpoint} — id: ${json.data?.id}`);
  return json.data;
}
 
async function put(endpoint, data) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const res = await fetch(url, { method: 'PUT', headers, body: JSON.stringify({ data }) });
  const json = await res.json();
  if (!res.ok) {
    console.error(`❌ PUT /${endpoint} failed:`, JSON.stringify(json?.error || json, null, 2));
    return null;
  }
  console.log(`✅ Updated /${endpoint}`);
  return json.data;
}
 
async function get(endpoint) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
 
// ─── Component Inspector — reveals real sub-field names ──────────────────────
 
async function getComponentFields(componentUid) {
  const url = `${STRAPI_URL}/api/content-type-builder/components/${componentUid}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const json = await res.json();
  return Object.keys(json?.data?.schema?.attributes || {});
}
 
async function inspectAllSchemas() {
  console.log('\n🔍 Content type field names:');
  const types = [
    'api::service.service',
    'api::industry.industry',
    'api::benefit.benefit',
    'api::site-setting.site-setting',
  ];
  for (const uid of types) {
    const url = `${STRAPI_URL}/api/content-type-builder/content-types/${uid}`;
    const res = await fetch(url, { headers });
    if (res.ok) {
      const json = await res.json();
      const attrs = json?.data?.schema?.attributes || {};
      const name = uid.split('::')[1].split('.')[0];
      console.log(`   ${name}: [${Object.keys(attrs).join(', ')}]`);
 
      // For each component field, also print its sub-fields
      for (const [field, def] of Object.entries(attrs)) {
        if (def.type === 'component' && def.component) {
          const subFields = await getComponentFields(def.component);
          if (subFields) {
            console.log(`      └─ ${field} (${def.component}): [${subFields.join(', ')}]`);
          }
        }
      }
    }
  }
}
 
// ─── Services ─────────────────────────────────────────────────────────────────
 
async function seedServices() {
  console.log('\n📌 Seeding Services...');
 
  await post('services', {
    Title: 'Cold Rooms / Freeze Rooms',
    slug: 'cold-rooms-freeze-rooms',
    description: [{ type: 'paragraph', children: [{ type: 'text', text: 'Custom-designed chambres froides for optimal temperature control and energy efficiency. Perfect for food storage, pharmaceuticals, and industrial applications.' }] }],
    icon: 'Snowflake',
    order: 1,
    publishedAt: new Date().toISOString(),
    features: [
      { feature: 'Custom sizes and configurations' },
      { feature: 'Temperature range: -40°C to +15°C' },
      { feature: 'Energy-efficient insulation panels' },
      { feature: 'Professional installation and setup' },
    ],
  });
 
  await post('services', {
    Title: 'Multi-tube Chillers',
    slug: 'multi-tube-chillers',
    description: [{ type: 'paragraph', children: [{ type: 'text', text: 'High-performance refroidisseurs multitubes designed for industrial cooling processes. Reliable, efficient, and built to handle demanding environments.' }] }],
    icon: 'Gauge',
    order: 2,
    publishedAt: new Date().toISOString(),
    features: [
      { feature: 'High cooling capacity systems' },
      { feature: 'Corrosion-resistant materials' },
      { feature: 'Easy maintenance and monitoring' },
      { feature: 'Advanced temperature control' },
    ],
  });
}
 
// ─── Site Settings ────────────────────────────────────────────────────────────
 
async function seedSiteSettings() {
  console.log('\n📌 Seeding Site Settings...');
 
  // Fetch real sub-field names for each component before sending data
  const hoursFields   = await getComponentFields('site-setting.hours')
                     || await getComponentFields('shared.hours')
                     || await getComponentFields('components.hours');
 
  const socialFields  = await getComponentFields('site-setting.social-link')
                     || await getComponentFields('shared.social-link')
                     || await getComponentFields('components.social-link');
 
  const footerFields  = await getComponentFields('site-setting.footer-link')
                     || await getComponentFields('shared.footer-link')
                     || await getComponentFields('components.footer-link');
 
  console.log(`   Hours component fields:   [${hoursFields?.join(', ') ?? 'not found'}]`);
  console.log(`   Social component fields:  [${socialFields?.join(', ') ?? 'not found'}]`);
  console.log(`   Footer component fields:  [${footerFields?.join(', ') ?? 'not found'}]`);
 
  // Build Hours entries using real field names
  // Common patterns: {day, hours} or {Day, Hours} or {label, value} or {dayRange, time}
  const buildHours = (dayVal, hoursVal) => {
    const entry = {};
    // Try all common field name patterns
    const dayKey   = hoursFields?.find(f => ['day', 'Day', 'label', 'Label', 'dayRange', 'name'].includes(f));
    const hoursKey = hoursFields?.find(f => ['hours', 'Hours', 'time', 'Time', 'value', 'Value'].includes(f));
    if (dayKey)   entry[dayKey]   = dayVal;
    if (hoursKey) entry[hoursKey] = hoursVal;
    // Fallback: if still empty, try lowercase versions of whatever fields exist
    if (Object.keys(entry).length === 0 && hoursFields?.length) {
      entry[hoursFields[0]] = dayVal;
      if (hoursFields[1]) entry[hoursFields[1]] = hoursVal;
    }
    return entry;
  };
 
  const buildSocial = (platformVal, urlVal) => {
    const entry = {};
    const platformKey = socialFields?.find(f => ['platform', 'Platform', 'name', 'Name', 'label', 'Label'].includes(f));
    const urlKey      = socialFields?.find(f => ['url', 'Url', 'URL', 'href', 'link', 'Link'].includes(f));
    if (platformKey) entry[platformKey] = platformVal;
    if (urlKey)      entry[urlKey]      = urlVal;
    if (Object.keys(entry).length === 0 && socialFields?.length) {
      entry[socialFields[0]] = platformVal;
      if (socialFields[1]) entry[socialFields[1]] = urlVal;
    }
    return entry;
  };
 
  const buildFooter = (labelVal, urlVal) => {
    const entry = {};
    const labelKey = footerFields?.find(f => ['label', 'Label', 'name', 'Name', 'title', 'Title'].includes(f));
    const urlKey   = footerFields?.find(f => ['url', 'Url', 'URL', 'href', 'link', 'Link'].includes(f));
    if (labelKey) entry[labelKey] = labelVal;
    if (urlKey)   entry[urlKey]   = urlVal;
    if (Object.keys(entry).length === 0 && footerFields?.length) {
      entry[footerFields[0]] = labelVal;
      if (footerFields[1]) entry[footerFields[1]] = urlVal;
    }
    return entry;
  };
 
  const data = {
    companyName:        'BATCLIM',
    companyDescription: "Algeria's trusted partner for industrial refrigeration solutions.",
    contactEmail:       'contact@batclim.dz',
    contactPhone:       '+213 XXX XXX XXX',
    emergencyPhone:     '+213 XXX XXX XXX',
    address:            'Algeria — Serving nationwide',
    Hours: [
      buildHours('Saturday - Thursday', '8:00 AM - 6:00 PM'),
      buildHours('Friday', 'Closed'),
    ],
    SocialLinks: [
      buildSocial('Facebook', '#'),
      buildSocial('LinkedIn', '#'),
    ],
    FooterLinks: [
      buildFooter('Privacy Policy', '#'),
      buildFooter('Terms of Service', '#'),
    ],
  };
 
  console.log('\n   Sending data:');
  console.log(`   Hours[0]:      ${JSON.stringify(data.Hours[0])}`);
  console.log(`   SocialLinks[0]: ${JSON.stringify(data.SocialLinks[0])}`);
  console.log(`   FooterLinks[0]: ${JSON.stringify(data.FooterLinks[0])}`);
 
  await put('site-setting', data);
}
 
// ─── Main ─────────────────────────────────────────────────────────────────────
 
async function main() {
  console.log('🚀 Batclim Strapi Seed Script');
  console.log(`📡 URL: ${STRAPI_URL}`);
  console.log('─'.repeat(50));
 
  const test = await get('services');
  if (test === null) {
    console.error('\n❌ Cannot reach Strapi. Is it running? Is the token valid?');
    process.exit(1);
  }
  console.log('✅ Connected to Strapi');
 
  await inspectAllSchemas();
 
  // Services
  const existingServices = await get('services');
  if (existingServices?.length > 0) {
    console.log('\n⚠️  Services already exist — skipping. Delete in Admin to re-seed.');
  } else {
    await seedServices();
  }
 
  // Industries
  const existingIndustries = await get('industries');
  if (existingIndustries?.length > 0) {
    console.log('⚠️  Industries already exist — skipping.');
  }
 
  // Benefits
  const existingBenefits = await get('benefits');
  if (existingBenefits?.length > 0) {
    console.log('⚠️  Benefits already exist — skipping.');
  }
 
  // Site settings
  await seedSiteSettings();
 
  console.log('\n' + '─'.repeat(50));
  console.log('🎉 Done!');
  console.log('   Frontend → http://localhost:3000');
  console.log('   Admin    → http://localhost:1337/admin');
}
 
main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});