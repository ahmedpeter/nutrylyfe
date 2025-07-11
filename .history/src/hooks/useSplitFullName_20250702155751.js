import { useMemo } from "react";

export const useSplitFullName = (fullName = "") => {
  return useMemo(() => {
    const parts = fullName.trim().split(" ").filter(Boolean);

    let fname = "", mname = "", lname = "";

    if (parts.length === 1) {
      fname = parts[0];
    } else if (parts.length === 2) {
      [fname, lname] = parts;
    } else if (parts.length >= 3) {
      fname = parts[0];
      lname = parts[parts.length - 1];
      mname = parts.slice(1, -1).join(" ");
    }

    return { fname, mname, lname };
  }, [fullName]);
};
