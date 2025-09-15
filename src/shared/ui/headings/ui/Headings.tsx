interface HeadingsProps {
  children: React.ReactNode;
}

export const H1 = ({ children }: HeadingsProps) => {
  return <h1 className="text-3xl font-bold md:text-4xl">{children}</h1>;
};

export const H2 = ({ children }: HeadingsProps) => {
  return <h2 className="text-xl font-bold md:text-2xl">{children}</h2>;
};

export const H3 = ({ children }: HeadingsProps) => {
  return <h3 className="text-lg font-bold md:text-xl">{children}</h3>;
};
