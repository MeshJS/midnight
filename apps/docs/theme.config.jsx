import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import {
  ROOT_URL,
  APP_NAME,
  APP_DESC,
  PROJECT_GITHUB_URL,
} from "./src/configs";

export default {
  head() {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      ROOT_URL + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);
    const title = `${frontMatter.title} - ${APP_NAME}` || APP_NAME;

    return (
      <>
        <title>{title} - Mesh Midnight</title>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={frontMatter.description || APP_DESC}
        />
      </>
    );
  },
  logo: (
    <>
      <svg
        width="24"
        height="24"
        enableBackground="new 0 0 300 200"
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="m289 127-45-60-45-60c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-37 49.3c-2 2.7-6 2.7-8 0l-37-49.3c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-45 60-45 60c-1.3 1.8-1.3 4.2 0 6l45 60c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l45-60c1.3-1.8 1.3-4.2 0-6zm-90-103.3 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-90 0 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-53 152.6-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0z" />
      </svg>
      <span style={{ marginLeft: ".4em", whiteSpace: "nowrap" }}>
        Mesh Midnight
      </span>
    </>
  ),
  faviconGlyph: "M",
  project: {
    link: PROJECT_GITHUB_URL,
  },
  footer: {
    component: null,
    content: null,
  },
  feedback: {
    component: null,
    content: null,
  },
  editLink: {
    component: null,
  },
  chat: {
    link: "https://x.com/meshsdk",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
      </svg>
    ),
  },
  i18n: [{ locale: "en", name: "English" }],
  darkMode: true
};
