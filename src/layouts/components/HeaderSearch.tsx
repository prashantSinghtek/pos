import { HiOutlineSearch } from "react-icons/hi";
export default function HeaderSearch() {
  return (
    <div className="h-full w-full flex items-center space-x-0 focus-within:outline-none rounded-lg outline-primary pl-4">
      <HiOutlineSearch className="text-primary text-xl font-bold" />
      <input
        className="bg-transparent flex-1 h-full py-3 pl-4 outline-none focus-within:outline-none font-light text-sm"
        placeholder="Search Dashboard..."
      />
    </div>
  );
}
