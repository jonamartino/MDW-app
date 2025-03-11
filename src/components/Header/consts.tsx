// consts.tsx
interface HeaderList {
  title: string;
  link: string;
}

// Menú para usuarios no autenticados
export const headerList: HeaderList[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Login",
    link: "/login",
  },
  {
    title: "Sign Up",
    link: "/signup",
  },
];

// Menú para usuarios regulares (role: "user")
export const userList: HeaderList[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Organizations",
    link: "/organizations",
  },
  {
    title: "Profile",
    link: "/profile",
  },
];

// Menú para organizaciones (role: "organization")
export const organizationList: HeaderList[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Organizations",
    link: "/organizations",
  },
  {
    title: "Organization",
    link: "/organization",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Profile",
    link: "/profile",
  },
];