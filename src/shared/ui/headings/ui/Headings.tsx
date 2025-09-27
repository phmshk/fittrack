interface HeadingsProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  additionalClasses?: string;
}

export const H1 = ({ children, additionalClasses }: HeadingsProps) => {
  return (
    <h1 className={`text-3xl font-bold md:text-4xl ${additionalClasses}`}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, additionalClasses }: HeadingsProps) => {
  return (
    <h2 className={`text-xl font-bold md:text-2xl ${additionalClasses}`}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, additionalClasses }: HeadingsProps) => {
  return (
    <h3 className={`text-lg font-bold md:text-xl ${additionalClasses}`}>
      {children}
    </h3>
  );
};
