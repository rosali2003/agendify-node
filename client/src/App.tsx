import React from "react";
import TasksCard from "./components/TasksCard";
import LoginHome from "./components/LoginHome";

function App() {
  return (
    <div className="bg-primary h-screen w-screen">
      <div>
        {/* <div className="flex justify-end">
          <LoginHome />
        </div> */}
        <h1>hi</h1>
        <div className="flex items-center justify-center">
          <TasksCard />
        </div>
      </div>
    </div>
  );
}

export default App;
