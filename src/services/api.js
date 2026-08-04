const API_BASE = "/api/v1/song";

export function countrySlugFromUrl(url) {
  const match = url.match(/country\/(.+)\.html$/);
  return match ? match[1] : encodeURIComponent(url);
}

export function countryUrlFromSlug(slug) {
  return `https://kworb.net/spotify/country/${slug}.html`;
}

export function countryNameFromUrl(url) {
  const slug = countrySlugFromUrl(url);

  const names = {
    global_daily: "Global",
    us_daily: "United States",
    gb_daily: "United Kingdom",
    ar_daily: "Argentina",
    au_daily: "Australia",
    br_daily: "Brazil",
    ca_daily: "Canada",
    co_daily: "Colombia",
    de_daily: "Germany",
    es_daily: "Spain",
    fr_daily: "France",
    id_daily: "Indonesia",
    in_daily: "India",
    it_daily: "Italy",
    jp_daily: "Japan",
    kr_daily: "South Korea",
    mx_daily: "Mexico",
    nl_daily: "Netherlands",
    pe_daily: "Peru",
    ph_daily: "Philippines",
    pl_daily: "Poland",
    th_daily: "Thailand",
    tr_daily: "Turkey",
    tw_daily: "Taiwan",
    vn_daily: "Vietnam",
  };

  return names[slug] || slug.replace(/_daily$/, "").toUpperCase();
}

export async function getSongs() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("Failed to fetch songs");
  return response.json();
}

export async function getSongsByCountry(countryUrl) {
  const response = await fetch(
    `${API_BASE}?countryUrl=${encodeURIComponent(countryUrl)}`
  );
  if (!response.ok) throw new Error("Failed to fetch songs for country");
  return response.json();
}

export async function getCountries() {
  const songs = await getSongs();
  const countryMap = new Map();

  songs.forEach((song) => {
    const url = song.countryUrl;
    if (!url) return;

    if (!countryMap.has(url)) {
      countryMap.set(url, {
        url,
        slug: countrySlugFromUrl(url),
        name: countryNameFromUrl(url),
        songCount: 0,
      });
    }

    countryMap.get(url).songCount += 1;
  });

  return Array.from(countryMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
