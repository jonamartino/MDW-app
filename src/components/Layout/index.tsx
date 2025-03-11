import Footer from "../Footer";
import Header from "../Header";

const Layout = ({
  children,
}: {
  children:
    | string
    | number
    | React.ReactElement<
        unknown,
        string | React.JSXElementConstructor<unknown>
      >;
}) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
