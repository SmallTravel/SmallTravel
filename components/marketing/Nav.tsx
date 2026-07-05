import { getDestinationNavData } from "@/lib/sanity/get-destination-nav";
import { getDestinations } from "@/lib/sanity/get-destinations";
import NavClient from "./NavClient";

export default async function Nav() {
  const [destinationNav, states] = await Promise.all([
    getDestinationNavData(),
    getDestinations(),
  ]);

  return <NavClient destinationNav={destinationNav} states={states} />;
}
