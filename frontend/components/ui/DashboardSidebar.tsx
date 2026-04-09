import { Upload, Users, AlertTriangle, MessageSquareQuote, LinkIcon, Scale, LayoutDashboard } from "lucide-react";
import { NavLink } from "./Navlink";
//import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "./Sidebar";

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Upload Evidence", url: "/dashboard/upload", icon: Upload },
  { title: "Detected Parties", url: "/dashboard/parties", icon: Users },
  { title: "Conflicts", url: "/dashboard/conflicts", icon: AlertTriangle },
  { title: "Deposition Questions", url: "/dashboard/deposition", icon: MessageSquareQuote },
  { title: "Source Evidence", url: "/dashboard/evidence", icon: LinkIcon },
];


export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border flex justify-between items-center">
        <a href="/" className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-primary flex-shrink-0" />
          {!collapsed && <span className="font-display text-lg font-bold">LegalAI</span>}
        </a>
      </SidebarHeader>
      <SidebarContent className="text-white">
        <SidebarGroup>
          <SidebarGroupLabel>Case Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent/50 ${
                          isActive ? "bg-sidebar-accent text-primary font-medium" : ""
                        }`
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}