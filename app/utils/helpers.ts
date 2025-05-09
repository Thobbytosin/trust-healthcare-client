export function getInitials(name: string) {
  if (!name) return "";

  const newNameArray = name.trim().split(" ");

  const initialsArray = newNameArray.map((n) => n.charAt(0).toUpperCase());

  if (initialsArray.length > 2) {
    initialsArray.pop();
    const initials = initialsArray.join("");
    return initials;
  } else {
    const initials = initialsArray.join("");
    return initials;
  }
}

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return;

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length >= 2) {
    const part = parts.pop();
    if (part) return part.split(";").shift();
  }

  return undefined;
}

export function getAccessToken(name: string): string | undefined {
  if (typeof document === "undefined") return;

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length >= 2) {
    const part = parts.pop();
    if (part) return part.split(";").shift();
  }

  return undefined;
}
