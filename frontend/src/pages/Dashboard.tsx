import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { PencilRuler } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const handleNewWidgetCreation = () => {
    // Logic to create a new widget goes here
     navigate("/new-widget");
    console.log("New widget created!");
  }

  return (
   <div className="flex bg-gray-50">
      {/* First grid - 20% width */}
      <div className="fixed left-0 top-0 w-[20%]">
        <Card className="h-full p-6 border-none bg-gray-50 rounded-none">
          <Sidebar />
        </Card>
      </div>

      {/* Second grid - 80% width */}
      <div className="h-screen ml-[20%] w-[80%] overflow-y-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Card className="h-full p-6 border-none rounded-none outline-none shadow-none">
          <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
          <p className="text-muted-foreground">This section takes 80% of the screen width.</p>
        </Card>
       <Card className="h-full p-6 border-none rounded-none outline-none shadow-none flex justify-end items-center">
         <Button variant="outline" onClick={handleNewWidgetCreation} className="bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2 rounded-full hover:text-white">
          <PencilRuler className="h-4 w-4 mr-2" />
          Create New Widget
          </Button>
        </Card>
        </div>
        
      </div>
    </div>
  );
};
