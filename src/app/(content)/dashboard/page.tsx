"use client"
import Dashboard from "@/components/pages/Dashboard";
import { clearToken } from "@/helpers/Cookies";
import { obtainUserData } from "@/helpers/Users";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";

export default function DashboardPage() {

  return (
    <Dashboard/>
  );
}
