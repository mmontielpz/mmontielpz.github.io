import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localNetworkHosts = Object.values(networkInterfaces())
  .flatMap((addresses) => addresses ?? [])
  .filter((address) => address.family === "IPv4" && !address.internal)
  .map((address) => address.address);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Next dev blocks hydration resources on alternate preview hosts unless listed.
  // Local interface addresses let a LAN preview hydrate without a custom launch command.
  allowedDevOrigins: [
    "127.0.0.1",
    ...localNetworkHosts,
    ...(process.env.AICA005_DEV_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? []),
  ],
};

export default nextConfig;
