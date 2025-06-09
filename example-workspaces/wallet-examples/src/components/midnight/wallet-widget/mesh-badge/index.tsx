import { MeshLogo } from "./mesh-logo";

export const MeshBadge = ({ isDark = false }) => (
  <a
    className={`flex max-w-fit flex-col items-center rounded-md border border-solid border-current p-1 text-xl font-semibold no-underline ${isDark ? `bg-neutral-950	text-neutral-50` : `bg-neutral-50	text-neutral-950`}`}
    style={{
      color: isDark ? "#EEEEEE" : "#111111",
      backgroundColor: isDark ? "#111111" : "#EEEEEE",
    }}
    href="https://meshjs.dev/"
    rel="noopener noreferrer"
    target="_blank"
  >
    <MeshLogo />
    Mesh
  </a>
);
