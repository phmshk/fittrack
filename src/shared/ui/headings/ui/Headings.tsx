interface HeadingsProps {
  children: React.ReactNode;
}

export const H1 = ({ children }: HeadingsProps) => {
  return <h1 className="text-3xl md:text-4xl font-bold">{children}</h1>;
};

export const H2 = ({ children }: HeadingsProps) => {
  return <h2 className="text-xl md:text-xl font-bold">{children}</h2>;
};

export const H3 = ({ children }: HeadingsProps) => {
  return <h3 className="text-lg md:text-xl font-bold">{children}</h3>;
};
