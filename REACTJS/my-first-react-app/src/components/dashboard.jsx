import UserCard from "./UserCard";

function Dashboard() {
  return (
    <div
      style={{
        border: "2px solid gray",
        padding: "20px",
        width: "300px",
        margin: "50px auto",
        textAlign: "center",
      }}
    >
      <h1>Dashboard</h1>

  <UserCard/>
    </div>
  );
}

export default Dashboard;