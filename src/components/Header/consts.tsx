interface HeaderList {
  title: string;
  link: string;
}

export const headerList: HeaderList[] = [
  {
    title: "Inicio",
    link: "/",
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

export const userList: HeaderList[] = [
  {
    title: "Inicio",
    link: "/",
  },
  {
    title: "Organizaciones",
    link: "/organizations",
  }
];

export const organizationList: HeaderList[] = [
  {
    title: "Inicio",
    link: "/",
  },
  {
    title: "Organizaciones",
    link: "/organizations",
  },
  {
    title: "Mi Organización",
    link: "/organization",
  }
];
