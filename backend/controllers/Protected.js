export const Dashboard = async (req, res) => {
  try {
    await res.json({ message: "Welcome to the dashboard" });
  } catch (error) {}
};
