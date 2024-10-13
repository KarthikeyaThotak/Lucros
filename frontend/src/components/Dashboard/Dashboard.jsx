"use client";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import DashboardCard06 from './partials/dashboard/DashboardCard06';
import DashboardCard07 from './partials/dashboard/DashboardCard07';
import Webull from "./Webull/Webull";
import News from "./News/News";
const Dashboard = ({ user, setToken, setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    // If there's no user, redirect to login page
    navigate("/login");
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
              </div>


            </div>

            {/* Cards */}
            <div className="grid grid-cols-8 gap-6">
              <Webull />
              <DashboardCard07 />
              <News/>
              
              
            </div>

          </div>
        </main>

        

      </div>
    </div>
  );
};

export default Dashboard;
