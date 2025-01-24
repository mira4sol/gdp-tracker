"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { login } from "@/app/actions";
import { useAuth } from "@/contexts/auth.context";
import { PlusIcon, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type User = {
  role: "admin" | "moderator" | "user";
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
};
 

const AppBar = () => {
  const { isLoggedIn, user } = useAuth() as AuthContextType;
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/analytics" },
  ];

  const states = [
    "Abia",
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const [selectedState, setSelectedState] = useState<string>("");

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    console.log(`Selected State: ${event.target.value}`);
  };

  const canAddGDP: boolean = isLoggedIn && (user?.role === "admin" || user?.role === "moderator");

  return (
    <div className="flex items-center w-full border-[#D9D9D9] border-b-4 justify-between py-3 px-4 sm:px-6 lg:px-8">
      <div className="flex-shrink-0">
        <select
          value={selectedState}
          onChange={handleStateChange}
          className="py-2 px-4 border rounded-lg bg-white text-black font-medium"
        >
          <option value="" disabled>
            Select chapter
          </option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex items-center gap-5">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`border border-[#017F35] py-2 px-7 rounded-full text-[#000000] font-semibold ${
              pathname === item.href ? "bg-[#A7D3B980]" : "bg-white"
            }`}
          >
            {item.label}
          </Link>
        ))}

      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          canAddGDP && (
            <Button className="hidden sm:flex">
              Add GDP <PlusIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        ) : (
          <Button onClick={login} className="hidden sm:flex">
            Login With Google
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-8 w-8" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-medium py-2 px-3 rounded-md transition-colors ${
                    pathname === item.href ? "bg-[#A7D3B980]" : "bg-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                canAddGDP && (
                  <Button size="sm" className="justify-start">
                    Add GDP <PlusIcon className="ml-2 h-4 w-4" />
                  </Button>
                )
              ) : (
                <Button onClick={login} className="justify-start">
                  Login With Google
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AppBar;
