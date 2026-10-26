export function getSession() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}