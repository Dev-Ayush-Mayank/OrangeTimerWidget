import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { PencilRuler } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WidgetList } from "@/components/WidgetList";

export const ManageWidgets = () => {
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
          <Card className="h-full p-2 border-none rounded-none outline-none shadow-none">
          <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
          <p className="text-muted-foreground">This section takes 80% of the screen width.</p>
        </Card>
        </div>
        <div className="px-6 mb-4">
         <WidgetList />
         </div>
      </div>
    </div>
  );
};
