// lib/strapi.ts
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL ;

console.log('Strapi API URL:', API_URL); // This will help debug

// Helper to fetch data from Strapi
export async function fetchStrapi<T>(path: string): Promise<T> {
  const url = `${API_URL}/api${path}`;
  console.log('Fetching from:', url); // This will help debug
  const hasSeenWarning = localStorage.getItem('hasSeenRenderWarning');
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 90000);
  if(!hasSeenWarning){
  alert("The server is waking up! This may take up to 90 seconds.");
  localStorage.setItem('hasSeenRenderWarning','true');
  }
  const response = await fetch(url, {
    next: { revalidate: 60 },// ISR: revalidate every 60 seconds
    signal: controller.signal, 
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }
  clearTimeout(id);
  const data = await response.json();
  console.log('Strapi response:', data); // This will help debug
  return data.data;
}

// Fetch all industries
export async function getIndustries() {
  const query = '?sort=order:asc';
  return fetchStrapi<any[]>(`/industries${query}`);
}

export async function getBenefits() {
    const query = '?sort=order:asc';
    return fetchStrapi<any[]>(`/benefits${query}`);
}

// Helper to get full image URL
export function getStrapiMediaUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_URL}${url}`;
}
  


export async function getServices() {
    const query = '?populate[0]=features&sort=order:asc';
    return fetchStrapi<any[]>(`/services${query}`);
}

// lib/strapi.ts
export async function getHomePage() {
    // Use "Hero" with capital H (exact field name)
    return fetchStrapi<any>('/home-page?populate[Hero][populate]=Trust');
}

export async function getSiteSettings() {
  // Populate all the fields we need
  const query = '?populate[Hours]=true&populate[SocialLinks]=true&populate[FooterLinks]=true&populate[logo]=true';
  return fetchStrapi<any>(`/site-setting${query}`);
}
