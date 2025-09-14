export const Dashboard = () => {
  const array = Array.from({ length: 100 }, (_, i) => i + 1);
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {array.map((item) => (
          <li key={item}>Item {item}</li>
        ))}
      </ul>
    </div>
  );
};
