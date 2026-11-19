import { cn } from "../../lib/utlis";
import defaultLogo from "../../assets/default/logo.svg";
import { Link } from "react-router";
import { useSettings } from "../../context/SettingsContext";

export default function Logo({
  size = "h-10 w-auto",
  className,
  variant = "light", // "light" | "dark"
}) {
  const { settings, resolveAssetUrl } = useSettings();

  const isDark = variant === "dark";
  const darkLogo = settings?.frontend_logo_dark;
  const lightLogo = settings?.frontend_logo;

  let logoSrc = defaultLogo;
  let forceInvert = false;

  if (isDark) {
    if (darkLogo) {
      logoSrc = resolveAssetUrl(darkLogo, defaultLogo);
    } else if (lightLogo) {
      logoSrc = resolveAssetUrl(lightLogo, defaultLogo);
      forceInvert = true;
    }
  } else {
    logoSrc = lightLogo ? resolveAssetUrl(lightLogo, defaultLogo) : defaultLogo;
  }

  const siteTitle = settings?.site_title || "Classy Missy";

  return (
    <Link to="/" className={cn("inline-flex items-center", className)}>
      <img
        src={logoSrc}
        alt={siteTitle}
        className={cn(
          "object-contain",
          size,
          forceInvert && "brightness-0 invert"
        )}
        onError={(e) => {
          if (e.currentTarget.src !== defaultLogo) {
            e.currentTarget.src = defaultLogo;
          }
        }}
      />
    </Link>
  );
}
