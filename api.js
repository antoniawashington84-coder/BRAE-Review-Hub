export const API_CONFIG = Object.freeze({
  supabaseUrl: "https://myoalsblycsaybpccidm.supabase.co",
  supabasePublishableKey: "sb_publishable_KJ3otYSIBCcsHfGwju1CmA_TgvMbx36",
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxKfJurvkzilj727_y4_8nLgAsa1dsg1kzTOHJkFYDi4yrf9WmubGvpYnsznEKqg2M/exec",
});

if (!window.supabase?.createClient) throw new Error("Supabase failed to load.");

export const supabaseClient = window.supabase.createClient(
  API_CONFIG.supabaseUrl,
  API_CONFIG.supabasePublishableKey,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

export async function apiRequest(action, payload = {}) {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session?.access_token) throw new Error("Your login has expired. Please sign in again.");

  const response = await fetch(API_CONFIG.appsScriptUrl, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, accessToken: session.access_token, ...payload }),
  });
  if (!response.ok) throw new Error(`Google returned ${response.status}.`);
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "The Review Hub request failed.");
  return result;
}
